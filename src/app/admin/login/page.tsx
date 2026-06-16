"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/layout/Logo";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = await res.json().catch(() => null);
      if (res.ok && payload?.ok) {
        router.replace(next);
        router.refresh();
      } else {
        setError(payload?.error ?? "Login failed.");
      }
    } catch {
      setError("Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm border border-sand bg-bone p-8"
    >
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <h1 className="text-center font-serif text-2xl font-light text-ink">
        Admin sign in
      </h1>

      <label
        htmlFor="password"
        className="mt-8 block font-sans text-xs uppercase tracking-luxe text-ink"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 block w-full border border-sand bg-transparent px-4 py-3 font-sans text-base text-ink outline-none transition-colors focus:border-brass"
      />

      {error && (
        <p role="alert" className="mt-4 font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || password.length === 0}
        className="mt-8 w-full bg-ink py-4 font-sans text-xs uppercase tracking-luxe text-bone transition-colors hover:bg-brass disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand/30 px-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
