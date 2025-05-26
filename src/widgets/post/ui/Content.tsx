'use client';

import Image from 'next/image';
import React from 'react';

export default function Content() {
  const [bottomPad, setBottomPad] = React.useState(0);
  return (
    <div className="flex flex-col gap-y-5">
      <div className="relative w-full" style={{ paddingBottom: `${bottomPad}%` }}>
        <Image
          src="https://placehold.co/600x400.png"
          alt="게시글 이미지"
          fill
          // className="object-cover"
          onLoad={(img) =>
            setBottomPad((img.currentTarget.naturalHeight / img.currentTarget.naturalWidth) * 100)
          }
          priority
        />
      </div>
      <div className="text-base font-medium text-gray-800">
        상대가 계엄때 국회군인이 진입한게 잘못을했다 이걸로만 밀어붙이는데 뭐라말해야함?
      </div>
    </div>
  );
}
