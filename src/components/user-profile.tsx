"use client";

import { useAuthStore } from "@/stores/auth-store";
import { PageLayout, Card, Button, CheckIcon } from "./ui";

export function UserProfile() {
  const { user, token, logout } = useAuthStore();

  if (!user) return null;

  return (
    <PageLayout>
      <Card className="animate-fade-in-up">
        <ProfileHeader />
        <UserInfo name={user.name} email={user.email} />
        <TokenDisplay token={token} />
        <Button variant="secondary" onClick={logout}>
          Sign Out
        </Button>
      </Card>
    </PageLayout>
  );
}

function ProfileHeader() {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckIcon className="w-10 h-10 text-accent" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h1>
      <p className="text-muted">You&apos;re logged in successfully</p>
    </div>
  );
}

interface UserInfoProps {
  name: string;
  email: string;
}

function UserInfo({ name, email }: UserInfoProps) {
  return (
    <div className="bg-background rounded-xl p-5 mb-6 border border-border">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted">{email}</p>
        </div>
      </div>
    </div>
  );
}

interface TokenDisplayProps {
  token: string | null;
}

function TokenDisplay({ token }: TokenDisplayProps) {
  if (!token) return null;

  return (
    <div className="bg-background rounded-xl p-4 mb-6 border border-border">
      <p className="text-xs text-muted mb-2 font-mono">Auth Token</p>
      <code className="text-sm text-accent font-mono break-all">{token}</code>
    </div>
  );
}
