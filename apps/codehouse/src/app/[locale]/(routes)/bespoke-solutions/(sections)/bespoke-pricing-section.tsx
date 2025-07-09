"use client";

import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { ComponentProps, FC, useState } from 'react';
import { Checkbox } from '@repo/ui/components/shadcn/checkbox'; // Assuming Checkbox component exists in ui package
import { Label } from '@repo/ui/components/shadcn/label'; // Assuming Label component exists in ui package

export const BespokePricingSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('bespoke-solutions-page');

  const basePrice = 499; // Base price for a simple website
  const featureCosts: { [key: string]: number } = {
    performant: 100,
    hosting: 50,
    internationalization: 200,
    mobileFriendly: 50,
    uniqueDesign: 300,
    iterativeDevelopment: 400, // This should likely be per month, clarify with user if this needs to be part of the one-time calculation or separate.
    customizable: 250,
    accessible: 150,
  };

  const [selectedFeatures, setSelectedFeatures] = useState<{[key: string]: boolean}>({
    performant: false,
    hosting: false,
    internationalization: false,
    mobileFriendly: false,
    uniqueDesign: false,
    iterativeDevelopment: false,
    customizable: false,
    accessible: false,
  });

  const calculateTotalPrice = () => {
    let total = basePrice;
    for (const feature in selectedFeatures) {
      if (selectedFeatures[feature]) {
        total += featureCosts[feature] || 0; // Add nullish coalescing to prevent undefined access
      }
    }
    return total;
  };

  const totalPrice = calculateTotalPrice();
  const maxPrice = 3000;

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [feature]: checked,
    }));
  };

  return (
    <section className={cn('container scroll-mt-16 sm:scroll-mt-16', className)} id="pricing" {...props}>
      <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-5xl">
        {t('pricing.title')}
      </h2>
      <div className="grid gap-8 md:grid-cols-1">
        {/* Interactive Pricing Calculator */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-4 text-2xl font-bold text-center">{t('pricing.calculator.title')}</h3>
          <p className="text-center text-muted-foreground mb-6">{t('pricing.calculator.description')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {Object.keys(featureCosts).map(feature => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={selectedFeatures[feature]}
                  onCheckedChange={(checked: boolean) => handleFeatureChange(feature, checked)}
                  disabled={totalPrice + (featureCosts[feature] || 0) > maxPrice && !selectedFeatures[feature]} // Add nullish coalescing
                />
                <Label htmlFor={feature}>
                  {t(`pricing.calculator.features.${feature}.label`)} ({t(`pricing.calculator.features.${feature}.cost`, {cost: featureCosts[feature] || 0})})
                </Label>
              </div>
            ))}
          </div>

          <div className="text-center text-3xl font-bold mb-4">
            {t('pricing.calculator.total', {total: totalPrice})}
          </div>

          {totalPrice > maxPrice && (
            <p className="text-center text-destructive-foreground bg-destructive p-2 rounded-md">
              {t('pricing.calculator.max-price-reached')}
            </p>
          )}

          <p className="text-center text-muted-foreground text-sm mt-4">
            {t('pricing.calculator.note', {maxPrice})}
          </p>

          <button className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-6">
            {t('pricing.contact-button')}
          </button>
        </div>
      </div>
    </section>
  );
}; 