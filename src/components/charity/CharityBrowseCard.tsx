"use client";
import Image from "next/image";
import { Charity } from "@/lib/everyorg";

interface CharityBrowseCardProps {
  charity: Charity;
  onSelect: (charity: Charity) => void;
  isSelected: boolean;
}

export default function CharityBrowseCard({ charity, onSelect, isSelected }: CharityBrowseCardProps) {
  return (
    <button
      onClick={() => onSelect(charity)}
      className={`
        text-left w-full p-5 rounded-2xl border transition-all
        ${isSelected
          ? "border-brand-green bg-brand-mint/10 ring-2 ring-brand-mint/30"
          : "border-brand-mint/20 bg-white hover:border-brand-green"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center overflow-hidden flex-shrink-0">
          {charity.logoUrl ? (
            <Image
              src={charity.logoUrl}
              alt={charity.name}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <span className="text-2xl">🌱</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-sm font-medium text-brand-charcoal truncate">
            {charity.name}
          </p>
          {charity.description && (
            <p className="font-body text-xs text-brand-charcoal/50 mt-1 line-clamp-2 leading-relaxed">
              {charity.description}
            </p>
          )}
          {charity.tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {charity.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs bg-brand-mint/20 text-brand-green px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
    </button>
  );
}