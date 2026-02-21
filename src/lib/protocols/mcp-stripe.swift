// ============================================================
// MCP Stripe — Payments Module v1.0
// Zunau Certified ✅
// ============================================================
// Architecture decisions imposed automatically:
// ✅ StoreKit 2 for iOS native in-app purchases
// ✅ Stripe webhooks validated SERVER-SIDE only
// ✅ service_role in Edge Functions — never client
// ✅ subscription_status in profiles table
// ✅ Stripe Connect ready for marketplace split
// ============================================================

import SwiftUI
import ComposableArchitecture
import StoreKit

// ─── Payments Feature ─────────────────────────────────────────
@Reducer
struct PaymentsFeature {
    @ObservableState
    struct State: Equatable {
        var subscriptionStatus: SubscriptionStatus = .free
        var isLoading = false
        var availableProducts: [Product] = []
    }

    enum SubscriptionStatus: String, Equatable {
        case free
        case pro
        case team
        case enterprise
    }

    enum Action {
        case loadProducts
        case productsLoaded([Product])
        case purchaseProduct(Product)
        case restorePurchases
        case subscriptionStatusUpdated(SubscriptionStatus)
    }

    @Dependency(\.supabaseClient) var supabase

    var body: some ReducerOf<Self> {
        Reduce { state, action in
            switch action {

            case .loadProducts:
                state.isLoading = true
                return .run { send in
                    // StoreKit 2 — product IDs defined in App Store Connect
                    let products = try await Product.products(for: [
                        "io.zunau.pro.monthly",
                        "io.zunau.pro.yearly",
                        "io.zunau.team.monthly",
                    ])
                    await send(.productsLoaded(products))
                }

            case .productsLoaded(let products):
                state.isLoading = false
                state.availableProducts = products
                return .none

            case .purchaseProduct(let product):
                return .run { send in
                    let result = try await product.purchase()
                    switch result {
                    case .success(let verification):
                        // Verify transaction — ALWAYS verify server-side too
                        let transaction = try verification.payloadValue
                        await transaction.finish()
                        // Webhook will update subscription_status in Supabase
                        // via Edge Function (service_role) — never client-side
                        await send(.subscriptionStatusUpdated(.pro))
                    case .pending, .userCancelled:
                        break
                    @unknown default:
                        break
                    }
                }

            case .subscriptionStatusUpdated(let status):
                state.subscriptionStatus = status
                return .none

            case .restorePurchases:
                return .run { _ in
                    try await AppStore.sync()
                }
            }
        }
    }
}

// ─── Edge Function (Supabase) — Stripe Webhook ────────────────
// This runs SERVER-SIDE with service_role — NEVER in Swift client
/*
// supabase/functions/stripe-webhook/index.ts
import { stripe } from "../_shared/stripe.ts"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // ← only here
)

export default async function handler(req: Request) {
  const sig = req.headers.get("stripe-signature")!
  const body = await req.text()

  const event = stripe.webhooks.constructEvent(
    body, sig,
    Deno.env.get("STRIPE_WEBHOOK_SECRET")!
  )

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object
      const status = sub.status === "active" ? "pro" : "free"

      await supabaseAdmin
        .from("profiles")
        .update({
          subscription_status: status,
          stripe_customer_id: sub.customer,
          stripe_subscription_id: sub.id,
        })
        .eq("stripe_customer_id", sub.customer)

      break
    }
    case "customer.subscription.deleted": {
      await supabaseAdmin
        .from("profiles")
        .update({ subscription_status: "free" })
        .eq("stripe_customer_id", event.data.object.customer)
      break
    }
  }

  return new Response("ok")
}
*/

// ─── SQL Migration Extension (profiles) ───────────────────────
/*
-- Add payment fields to profiles (MCP Stripe)
alter table public.profiles add column if not exists
  subscription_status text default 'free'
  check (subscription_status in ('free', 'pro', 'team', 'enterprise'));

alter table public.profiles add column if not exists
  stripe_customer_id text unique;

alter table public.profiles add column if not exists
  stripe_subscription_id text;

-- Users can read their own subscription status
create policy "Users can view own subscription"
  on public.profiles for select
  using (auth.uid() = id);

-- Only service_role (webhook) can update subscription_status
-- Client cannot self-promote to 'pro'
create policy "Service role manages subscriptions"
  on public.profiles for update
  using (auth.role() = 'service_role');
*/
