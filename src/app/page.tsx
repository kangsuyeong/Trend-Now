import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-12 border-r border-gray-200 bg-white pr-8">
      <div className="relative flex h-fit w-full flex-col items-center gap-y-3 px-8 pb-6 pt-8">
        <Image
          src="/images/banner.gif"
          alt="배너 이미지"
          fill
          objectFit="cover"
          className="rounded-[1.25rem]"
        />
        <span className="z-10 w-fit select-none text-base font-semiBold text-white">
          🔥 지금 떠오른 이슈들, 사라지기 전에 확인하세요.
        </span>
        <span className="z-10 w-fit select-none font-himpun text-[3.5rem]/[120%] font-regular text-brand-500">
          04 : 11 : 42
        </span>
      </div>
    </div>
  );
}
