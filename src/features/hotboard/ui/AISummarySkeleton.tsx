import Lottie from 'lottie-react';
import React from 'react';
import aiStar from './lottie/aistar.json';

export default function AISummarySkeleton() {
  return (
    <div className="flex flex-col items-center gap-y-3 p-5">
      <Lottie animationData={aiStar} className="h-8 w-8" />
      <span className="z-10 text-center text-sm font-medium text-white">
        AI가 뉴스를 분석하고 있어요.
        <br /> 중요한 포인트만 골라 요약해드릴게요.
      </span>
    </div>
  );
}
