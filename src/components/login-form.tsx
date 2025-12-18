"use client";

import { useState, type FormEvent } from "react";
import { useLogin } from "@/hooks/use-login";
import {
  PageLayout,
  FormHeader,
  Card,
  Input,
  PasswordInput,
  Button,
  Alert,
  LockIcon,
  MailIcon,
} from "./ui";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);

  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
        onError: () => {
          setShake(true);
          setTimeout(() => setShake(false), 500);
        },
      }
    );
  };

  return (
    <PageLayout>
      <FormHeader
        icon={<LockIcon className="w-8 h-8 text-accent" />}
        title="Welcome back"
        subtitle="Sign in to continue to your account"
      />

      <Card
        className={`animate-fade-in-up animate-delay-100 ${
          shake ? "shake" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="animate-fade-in-up animate-delay-200">
            <Input
              id="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              icon={<MailIcon className="w-5 h-5" />}
              required
            />
          </div>

          <div className="animate-fade-in-up animate-delay-300">
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </div>

          {error && <Alert variant="error">{error.message}</Alert>}

          <Button
            type="submit"
            isLoading={isPending}
            loadingText="Signing in..."
          >
            Sign In
          </Button>
        </form>

        <DemoCredentials />
      </Card>

      <p className="text-center text-muted text-sm mt-6 animate-fade-in-up animate-delay-300">
        Secure authentication powered by Next.js
      </p>
    </PageLayout>
  );
}

function DemoCredentials() {
  return (
    <div className="mt-6 pt-6 border-t border-border">
      <p className="text-xs text-muted text-center mb-3">Demo credentials</p>
      <div className="bg-background rounded-lg p-3 font-mono text-xs space-y-1">
        <p>
          <span className="text-muted">email:</span>{" "}
          <span className="text-accent">test@example.com</span>
        </p>
        <p>
          <span className="text-muted">password:</span>{" "}
          <span className="text-accent">123456</span>
        </p>
      </div>
    </div>
  );
}
