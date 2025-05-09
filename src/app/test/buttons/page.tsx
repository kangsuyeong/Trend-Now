import BadgeButton from '@/shared/ui/buttons/BadgeButton';
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton';
import SecondaryButton from '@/shared/ui/buttons/SecondaryButton';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[800px] p-[16px]">
        {/* Primary Button */}
        <div className="text-1xl font-regular py-[8px]">PRIMARY BUTTON</div>
        <div className="flex flex-row py-[8px] justify-around">
          <span>PRIMARY</span>
          <span>BLACK</span>
          <span>GRAY</span>
          <span>ERROR</span>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <PrimaryButton variant="primary" size="xl">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="black" size="xl">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="gray" size="xl">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="error" size="xl">
            Button Sample
          </PrimaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <PrimaryButton variant="primary" size="l">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="black" size="l">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="gray" size="l">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="error" size="l">
            Button Sample
          </PrimaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <PrimaryButton variant="primary" size="m">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="black" size="m">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="gray" size="m">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="error" size="m">
            Button Sample
          </PrimaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <PrimaryButton variant="primary" size="s">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="black" size="s">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="gray" size="s">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="error" size="s">
            Button Sample
          </PrimaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <PrimaryButton variant="primary" size="xs">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="black" size="xs">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="gray" size="xs">
            Button Sample
          </PrimaryButton>
          <PrimaryButton variant="error" size="xs">
            Button Sample
          </PrimaryButton>
        </div>
        {/* Secondary Button */}
        <div className="text-1xl font-regular py-[8px]">SECONDARY BUTTON</div>
        <div className="flex flex-row py-[8px] justify-around">
          <span>PRIMARY</span>
          <span>BLACK</span>
          <span>GRAY</span>
          <span>ERROR</span>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <SecondaryButton variant="primary" size="xl">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="black" size="xl">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="gray" size="xl">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="error" size="xl">
            Button Sample
          </SecondaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <SecondaryButton variant="primary" size="l">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="black" size="l">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="gray" size="l">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="error" size="l">
            Button Sample
          </SecondaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <SecondaryButton variant="primary" size="m">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="black" size="m">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="gray" size="m">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="error" size="m">
            Button Sample
          </SecondaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <SecondaryButton variant="primary" size="s">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="black" size="s">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="gray" size="s">
            Button Sample
          </SecondaryButton>
          <SecondaryButton variant="error" size="s">
            Button Sample
          </SecondaryButton>
        </div>
        <div className="flex flex-row items-center py-[8px] justify-around">
          <BadgeButton variant="white">키워드</BadgeButton>
          <BadgeButton variant="blue">키워드</BadgeButton>
          <BadgeButton variant="green">키워드</BadgeButton>
          <BadgeButton variant="yellow">키워드</BadgeButton>
        </div>
      </div>
    </div>
  );
};

export default page;
