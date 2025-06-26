import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';

import { FC } from 'react';

export type FeatureProps = {
  icon: React.ElementType;
  label: string;
  description: React.ReactNode;
};

export type ServiceFeatureProps = React.ComponentProps<typeof Card> & {
  feature: FeatureProps;
};

export const ServiceFeature: FC<ServiceFeatureProps> = ({ feature, ...restOfProps }) => {
  return (
    <Card {...restOfProps}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base font-semibold 2xl:text-xl">{feature.label}</CardTitle>
          <feature.icon className="size-4 2xl:size-8" />
        </div>
      </CardHeader>
      <CardContent>{feature.description}</CardContent>
    </Card>
  );
};
