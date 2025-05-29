import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/components/shadcn/tooltip';

import { FC } from 'react';

interface Props {
  feature: {
    icon: React.ReactNode;
    label: string;
    tooltip: string;
  };
}

const WITH_TOOLTIP = false;

export const ServiceFeature: FC<Props> = ({ feature, withTooltip = WITH_TOOLTIP }) => {
  if (withTooltip) {
    return (
      <div className="group flex flex-col items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FeatureIcon icon={feature.icon} />
            </TooltipTrigger>
            <TooltipContent className="group-hover:bg-red-500">
              <p className="max-w-[20ch] text-balance text-center text-base">{feature.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-center text-sm font-semibold">{feature.label}</p>
      </div>
    );
  }

  return (
    <div className="group flex flex-col items-center gap-2">
      <FeatureIcon icon={feature.icon} />
      <p className="text-center text-sm font-semibold">{feature.label}</p>
    </div>
  );
};

interface FeatureIconProps {
  icon: React.ReactNode;
}

const FeatureIcon: FC<FeatureIconProps> = ({ icon }) => {
  return (
    <div className="group-odd:bg-accent/25 group-even:bg-primary/25 flex flex-col items-center justify-center gap-2 rounded-full p-2">
      <div className="rounded-full p-2">{icon}</div>
    </div>
  );
};

export default FeatureIcon;
