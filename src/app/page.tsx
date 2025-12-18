"use client";

import { useAuthStore } from "@/stores/auth-store";
import { LoginForm } from "@/components/login-form";
import { UserProfile } from "@/components/user-profile";

export default function Home() {
  const { user, isHydrated } = useAuthStore();

  // Prevent flash while hydrating from localStorage
  if (!isHydrated) {
    return (
      <div className="auth-bg grid-pattern min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full spinner" />
      </div>
    );
  }

  return user ? <UserProfile /> : <LoginForm />;
}
