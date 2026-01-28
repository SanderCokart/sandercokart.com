"use client";

import { cn } from '@repo/ui/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { ComponentProps, FC, useState } from 'react';
import { Checkbox } from '@repo/ui/components/shadcn/checkbox';
import { Label } from '@repo/ui/components/shadcn/label'; 

export const ConsumersPricingSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  
  const t = useTranslations('BespokePricingSection');
 	const locale = useLocale();

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

 	const formatCurrency = (value: number) => {
 		return new Intl.NumberFormat(locale, {
 			style: 'currency',
 			currency: 'EUR', // Or use a dynamic currency code based on locale
 		}).format(value);
 	};

  return (
    <section className={cn('container scroll-mt-16 sm:scroll-mt-16', className)} id="pricing" {...props}>
      <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-5xl">
        {t('calculator_title')}
      </h2>
      <div className="grid gap-8 md:grid-cols-1">
        {/* Interactive Pricing Calculator */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-4 text-2xl font-bold text-center">{t('calculator_title')}</h3>
          <p className="text-center text-muted-foreground mb-6">{t('calculator_description')}</p>

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
                  {t(`calculator_features_${feature}` as any)} ({formatCurrency(featureCosts[feature] || 0)})
                </Label>
              </div>
            ))}
          </div>

          <div className="text-center text-3xl font-bold mb-4">
            {t('calculator_total', { total: formatCurrency(totalPrice) })}
          </div>

          {totalPrice > maxPrice && (
            <p className="text-center text-destructive-foreground bg-destructive p-2 rounded-md">
              {t(`calculator_maxPriceReached`)}
            </p>
          )}

          <p className="text-center text-muted-foreground text-sm mt-4">
            {t('calculator_note', { maxPrice: formatCurrency(maxPrice) })}
          </p>

          <button className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-6">
            {t('calculator_contactCta')}
          </button>
        </div>
      </div>
    </section>
  );
};