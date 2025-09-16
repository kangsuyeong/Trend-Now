import Lottie from 'lottie-react';
import React, { useState } from 'react';
import aiStar from './lottie/aistar.json';
import CloseButton from './CloseButton';
import { cn } from '@/shared/lib';
import AISummarySkeleton from './AISummarySkeleton';

interface AISummaryProps {
  /**@param {string} summaryText AI 요약 내용*/
  summaryText: string;
}

export default function AISummary({ summaryText }: AISummaryProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleSummaryToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!summaryText) return <AISummarySkeleton />;

  return (
    <div className="flex flex-col rounded-[20px] bg-gray-200 px-5 py-4">
      <div className="flex items-center justify-between">
        <span className="flex gap-x-1.5">
          <Lottie animationData={aiStar} className="h-6 w-6" />
          <span className="text-md font-semiBold text-gray-900">
            지금 이 이슈, AI 요약으로 이해하기
          </span>
        </span>
        <CloseButton open={isOpen} onClick={handleSummaryToggle} />
      </div>
      <div
        className={cn(
          'overflow-hidden text-xs font-medium text-gray-900 transition-all duration-200 ease-in-out',
          isOpen ? 'max-h-[500px] pt-3 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {summaryText}
      </div>
    </div>
  );
}
