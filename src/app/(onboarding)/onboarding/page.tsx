"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { posthog } from "@/lib/posthog";
import StepIndicator from "@/components/ui/StepIndicator";
import StepName from "@/components/onboarding/StepName";
import StepCharity from "@/components/onboarding/StepCharity";
import StepCard from "@/components/onboarding/StepCard";

const STEP_LABELS = ["Your name", "Your cause", "Your card"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [charityId, setCharityId] = useState("");
  const [charityName, setCharityName] = useState("");
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  async function handleFinish() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          selected_charity_id: charityId,
          selected_charity_name: charityName,
          onboarding_complete: true,
        })
        .eq("id", user.id);

      posthog.capture("onboarding_completed", {
        charity_id: charityId,
        charity_name: charityName,
      });
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-lg shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl">🌱</span>
          <span className="font-display text-lg text-brand-green">cheerful</span>
        </div>

        <StepIndicator
          currentStep={step}
          totalSteps={3}
          labels={STEP_LABELS}
        />

        {step === 1 && (
          <StepName
            value={fullName}
            onChange={setFullName}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepCharity
            selectedId={charityId}
            onSelect={(id, name) => {
              setCharityId(id);
              setCharityName(name);
            }}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepCard
            onNext={handleFinish}
            onBack={() => setStep(2)}
          />
        )}

        {saving && (
          <p className="font-body text-sm text-center text-brand-charcoal/50 mt-4">
            Saving your profile...
          </p>
        )}
      </div>
    </div>
  );
}