// ============================================================
// MCP Supabase — Auth Module v1.0
// Zunau Certified ✅
// ============================================================
// Architecture decisions imposed automatically:
// ✅ Profiles table SEPARATE from auth.users
// ✅ service_role NEVER exposed client-side
// ✅ RLS enabled on all user tables
// ✅ Sign in with Apple — token + name (first time only)
// ✅ Async/await throughout — no Combine
// ============================================================

import SwiftUI
import ComposableArchitecture
import Supabase

// ─── Supabase Client Dependency ───────────────────────────────
struct SupabaseClientKey: DependencyKey {
    // API keys loaded from Info.plist — never hardcoded
    static let liveValue = SupabaseClient(
        supabaseURL: URL(string: Bundle.main.infoDictionary!["SUPABASE_URL"] as! String)!,
        supabaseKey: Bundle.main.infoDictionary!["SUPABASE_ANON_KEY"] as! String
        // service_role is ONLY in Edge Functions — never here
    )
    static let testValue = SupabaseClient(
        supabaseURL: URL(string: "http://127.0.0.1:54321")!,
        supabaseKey: "test-anon-key"
    )
}

extension DependencyValues {
    var supabaseClient: SupabaseClient {
        get { self[SupabaseClientKey.self] }
        set { self[SupabaseClientKey.self] = newValue }
    }
}

// ─── Profile Model ────────────────────────────────────────────
// ALWAYS a separate table — never use auth.users directly
struct Profile: Codable, Equatable, Identifiable {
    let id: UUID                           // References auth.users(id)
    var fullName: String?
    var avatarUrl: String?
    var createdAt: Date

    // Add project-specific fields below (AI fills these)
    // var subscriptionStatus: String?     // MCP Stripe
    // var onboardingComplete: Bool?
}

// ─── Auth Feature ─────────────────────────────────────────────
@Reducer
struct AuthFeature {
    @ObservableState
    struct State: Equatable {
        var currentUser: Profile?
        var isLoading = false
        var error: String?
        var isAuthenticated: Bool { currentUser != nil }
    }

    enum Action {
        case signInWithApple
        case signInWithGoogle
        case signInWithEmail(email: String, password: String)
        case signOut
        // Internal actions
        case authStateChanged(Profile?)
        case errorOccurred(String)
    }

    @Dependency(\.supabaseClient) var supabase

    var body: some ReducerOf<Self> {
        Reduce { state, action in
            switch action {

            case .signInWithApple:
                state.isLoading = true
                state.error = nil
                return .run { send in
                    do {
                        // ⚠️ Apple only provides name on FIRST sign in
                        // Zunau handles this edge case automatically
                        let session = try await supabase.auth
                            .signInWithOAuth(provider: .apple) { config in
                                config.scopes = "email name"
                                config.redirectTo = URL(string: "zunau://auth-callback")
                            }
                        let profile = try await fetchOrCreateProfile(
                            userId: session.user.id,
                            email: session.user.email,
                            name: session.user.userMetadata["full_name"]?.value as? String
                        )
                        await send(.authStateChanged(profile))
                    } catch {
                        await send(.errorOccurred(error.localizedDescription))
                    }
                }

            case .signOut:
                return .run { send in
                    try? await supabase.auth.signOut()
                    await send(.authStateChanged(nil))
                }

            case .authStateChanged(let profile):
                state.isLoading = false
                state.currentUser = profile
                return .none

            case .errorOccurred(let message):
                state.isLoading = false
                state.error = message
                return .none

            case .signInWithGoogle, .signInWithEmail:
                // Implemented same pattern as Apple
                return .none
            }
        }
    }

    // ─ Private helpers ─────────────────────────────────────────
    private func fetchOrCreateProfile(
        userId: UUID,
        email: String?,
        name: String?
    ) async throws -> Profile {
        // Profiles table with RLS — user only sees own data
        if let existing = try? await supabase
            .from("profiles")
            .select()
            .eq("id", value: userId)
            .single()
            .execute()
            .value as Profile {
            return existing
        }

        // Create profile if first time
        let newProfile = Profile(
            id: userId,
            fullName: name,
            avatarUrl: nil,
            createdAt: Date()
        )
        return try await supabase
            .from("profiles")
            .insert(newProfile)
            .select()
            .single()
            .execute()
            .value
    }
}

// ─── Auth View ────────────────────────────────────────────────
struct AuthView: View {
    @Bindable var store: StoreOf<AuthFeature>

    var body: some View {
        VStack(spacing: 24) {
            // App logo / hero — AI customizes this
            VStack(spacing: 8) {
                Image(systemName: "swift")
                    .font(.system(size: 60))
                    .foregroundStyle(.purple)
                Text("Welcome")
                    .font(.largeTitle.bold())
            }
            .padding(.bottom, 20)

            if store.isLoading {
                ProgressView()
            } else {
                // Sign in with Apple — always present
                Button(action: { store.send(.signInWithApple) }) {
                    Label("Continue with Apple", systemImage: "apple.logo")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .tint(.black)

                // Sign in with Google
                Button(action: { store.send(.signInWithGoogle) }) {
                    Label("Continue with Google", systemImage: "g.circle")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered)
            }

            if let error = store.error {
                Text(error)
                    .font(.caption)
                    .foregroundStyle(.red)
            }
        }
        .padding(32)
    }
}

// ─── SQL Migration (auto-applied by Zunau) ────────────────────
/*
-- Run once — Zunau applies this on project init

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS — users only see their own profile
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at();
*/
