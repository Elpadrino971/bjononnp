// ============================================================
// Zunau Protocol v1.0 — TCA Foundation
// Apple Certified Architecture Base
// ============================================================
// This file is the certified base injected into EVERY Zunau
// project. The AI NEVER modifies this file — it only works
// in the Feature modules that extend this protocol.
//
// Dependencies:
// .package(url: "https://github.com/pointfreeco/swift-composable-architecture", from: "1.10.0")
// .package(url: "https://github.com/supabase/supabase-swift", from: "2.0.0")
// ============================================================

import SwiftUI
import ComposableArchitecture

// ─── App Entry Point ─────────────────────────────────────────
@main
struct ZunauApp: App {
    let store = Store(initialState: AppFeature.State()) {
        AppFeature()
            ._printChanges() // Remove in production
    }

    var body: some Scene {
        WindowGroup {
            AppView(store: store)
        }
    }
}

// ─── Root Reducer ─────────────────────────────────────────────
// AI adds new Scopes here — never touches existing ones
@Reducer
struct AppFeature {
    @ObservableState
    struct State: Equatable {
        // ✅ MCP Supabase Auth — always injected
        var auth: AuthFeature.State = .init()
        // 🔄 App tab state
        var selectedTab: AppTab = .home
        // Conditional MCPs — injected on demand
        // var payments: PaymentsFeature.State? = nil  // MCP Stripe
        // var spline: SplineFeature.State? = nil       // MCP Spline
    }

    enum Action {
        case auth(AuthFeature.Action)
        case tabSelected(AppTab)
        // Conditional MCP actions added here by AI
    }

    enum AppTab: String, CaseIterable, Equatable {
        case home, explore, profile
    }

    var body: some ReducerOf<Self> {
        Scope(state: \.auth, action: \.auth) {
            AuthFeature()
        }
        Reduce { state, action in
            switch action {
            case .tabSelected(let tab):
                state.selectedTab = tab
                return .none
            case .auth:
                return .none
            }
        }
    }
}

// ─── Root View ────────────────────────────────────────────────
struct AppView: View {
    @Bindable var store: StoreOf<AppFeature>

    var body: some View {
        Group {
            if store.auth.isAuthenticated {
                MainTabView(store: store)
            } else {
                AuthView(store: store.scope(state: \.auth, action: \.auth))
            }
        }
    }
}

// ─── Main Tab View ────────────────────────────────────────────
struct MainTabView: View {
    @Bindable var store: StoreOf<AppFeature>

    var body: some View {
        TabView(selection: $store.selectedTab.sending(\.tabSelected)) {
            // AI fills tab content here
            Text("Home")
                .tabItem { Label("Home", systemImage: "house") }
                .tag(AppFeature.AppTab.home)

            Text("Explore")
                .tabItem { Label("Explore", systemImage: "magnifyingglass") }
                .tag(AppFeature.AppTab.explore)

            Text("Profile")
                .tabItem { Label("Profile", systemImage: "person") }
                .tag(AppFeature.AppTab.profile)
        }
        .tint(.purple)
    }
}
