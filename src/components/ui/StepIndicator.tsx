interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-3">
        {labels.map((label, index) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium mb-1
              ${index + 1 < currentStep ? "bg-brand-green text-white" : ""}
              ${index + 1 === currentStep ? "bg-brand-green text-white ring-4 ring-brand-mint/30" : ""}
              ${index + 1 > currentStep ? "bg-brand-mint/20 text-brand-charcoal/40" : ""}
            `}>
              {index + 1 < currentStep ? "✓" : index + 1}
            </div>
            <span className={`text-xs font-body ${index + 1 === currentStep ? "text-brand-green font-medium" : "text-brand-charcoal/40"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-brand-mint/20 rounded-full h-1.5">
        <div
          className="bg-brand-green h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}