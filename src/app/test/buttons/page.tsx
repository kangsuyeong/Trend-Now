import { BadgeButton, PrimaryButton, SecondaryButton } from '@/shared/ui/';
import React from 'react';

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-[800px] flex-col p-[16px]">
        {/* Primary Button */}
        <div className="py-[8px] text-1xl font-medium">PRIMARY BUTTON</div>
        <div className="flex flex-row justify-around py-[8px]">
          <span>PRIMARY</span>
          <span>BLACK</span>
          <span>GRAY</span>
          <span>ERROR</span>
        </div>
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="py-[8px] text-1xl font-medium">SECONDARY BUTTON</div>
        <div className="flex flex-row justify-around py-[8px]">
          <span>PRIMARY</span>
          <span>BLACK</span>
          <span>GRAY</span>
          <span>ERROR</span>
        </div>
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
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
        <div className="flex flex-row items-center justify-around py-[8px]">
          <BadgeButton variant="white">키워드</BadgeButton>
          <BadgeButton variant="blue">키워드</BadgeButton>
          <BadgeButton variant="green">키워드</BadgeButton>
          <BadgeButton variant="yellow">키워드</BadgeButton>
        </div>
      </div>
    </div>
  );
};

export default Page;
