export type OnboardingStep = "name" | "charity" | "card";

export interface OnboardingData {
  fullName: string;
  charityId: string;
  charityName: string;
}