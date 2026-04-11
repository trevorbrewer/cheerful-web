"use client";
import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "@/components/ui/Button";

interface PlaidLinkButtonProps {
  onSuccess: () => void;
}

export default function PlaidLinkButton({ onSuccess }: PlaidLinkButtonProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinkToken() {
      try {
        const res = await fetch("/api/plaid/create-link-token", {
          method: "POST",
        });
        const data = await res.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error("Failed to fetch link token:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLinkToken();
  }, []);

  const handleSuccess = useCallback(
    async (public_token: string, metadata: any) => {
      try {
        const institution_name = metadata?.institution?.name ?? null;
        const last_four = metadata?.accounts?.[0]?.mask ?? null;

        await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_token, institution_name, last_four }),
        });

        onSuccess();
      } catch (error) {
        console.error("Failed to exchange token:", error);
      }
    },
    [onSuccess]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken ?? "",
    onSuccess: handleSuccess,
  });

  if (loading) {
    return (
      <Button variant="primary" className="w-full justify-center">
        Loading...
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      onClick={() => open()}
      className="w-full justify-center"
    >
      {ready ? "Connect your bank" : "Preparing..."}
    </Button>
  );
}