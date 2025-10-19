'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

interface AdvCarouselProps {
  images: string[];
}

export default function AdvCarousel({ images }: AdvCarouselProps) {
  return (
    <Swiper
      className="h-40 w-full rounded-[1.25rem]"
      autoplay={{ delay: 4000 }}
      loop
      pagination={{
        type: 'fraction',
      }}
      navigation={true}
      modules={[Pagination, Autoplay]}
    >
      {images.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={item}
            alt="배너 이미지"
            fill
            sizes="100%"
            priority
            unoptimized
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
