import React from 'react';

export default function Footer() {
  const tabs = ['고객센터', '1:1문의', '이용역관', '개인정보취급방침', '위치서비스이용약관'];

  return (
    <footer className="h-[18.75rem] bg-[#333333] px-[24.75rem] py-12">
      <div className="flex justify-between">
        <span className="flex flex-col gap-y-10">
          <span className="flex gap-x-4 *:text-sm *:font-bold *:text-white">
            {tabs.map((item, idx) =>
              idx === tabs.length - 1 ? (
                <span key={idx}>{item}</span>
              ) : (
                <span
                  key={idx}
                  className="after:ml-4 after:font-medium after:text-[#999999] after:content-['|']"
                >
                  {item}
                </span>
              )
            )}
          </span>
          <div className="flex flex-col gap-y-2">
            <span className="flex gap-x-2 *:text-sm *:font-regular *:text-white">
              <span className="after:ml-4 after:font-medium after:text-[#999999] after:content-['|']">
                상호 : 트렌드나우
              </span>
              <span className="after:ml-4 after:font-medium after:text-[#999999] after:content-['|']">
                대표이사 : 이동규
              </span>
              <span>사업자등록번호 : 1234567890</span>
            </span>
            <span className="flex gap-x-2 *:text-sm *:font-regular *:text-white">
              <span>주소 : 경기도 이천시 중리동</span>
            </span>
            <span className="flex gap-x-2 *:text-sm *:font-regular *:text-white">
              <span className="after:ml-4 after:font-medium after:text-[#999999] after:content-['|']">
                고객센터 : 1234-1234
              </span>
              <span>개인정보관리책임자 : 이동규</span>
            </span>
          </div>
          <div className="text-sm font-regular text-[#999999]">
            COPYRIGHTⓒ2025 Trendnow. ALL RIGHTS RESERVED.
          </div>
        </span>
        <span className="flex flex-col items-end gap-y-6">
          <span className="text-base font-medium text-white">Customer Center</span>
          <span className="flex flex-col items-end gap-y-2">
            <span className="text-3xl font-bold text-white">070-1234-1234</span>
            <span className="flex flex-col items-end">
              <span className="text-sm font-regular text-white">평일 09:00 - 18:00 상담가능</span>
              <span className="text-sm font-regular text-white">주말, 공휴일 휴무</span>
            </span>
          </span>
        </span>
      </div>
    </footer>
  );
}
