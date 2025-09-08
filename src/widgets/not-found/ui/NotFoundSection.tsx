import Image from 'next/image';
import ErrorImage1 from '../icon/error1.png';
import ErrorImage2 from '../icon/error2.png';
import ErrorImage3 from '../icon/error3.png';
import ErrorImage4 from '../icon/error4.png';

const NotFoundSection = () => {
  return (
    <div className="relative flex flex-col gap-5 text-gray-500">
      <div className="flex flex-col items-center gap-1">
        <div className="text-[5rem] font-bold leading-none">404</div>
        <div className="text-lg font-semibold">Not Found</div>
      </div>
      <div className="text-lg font-medium">찾으시는 페이지가 존재하지 않습니다.</div>

      {/* 절대값 이미지 */}
      <Image src={ErrorImage1} alt="에러이미지1" className="absolute bottom-[62px] left-[-171px]" />
      <Image src={ErrorImage2} alt="에러이미지2" className="absolute bottom-[30px] left-[-56px]" />
      <Image src={ErrorImage3} alt="에러이미지3" className="absolute bottom-[28px] right-[-75px]" />
      <Image src={ErrorImage4} alt="에러이미지4" className="absolute right-[-144px] top-[-10px]" />
    </div>
  );
};

export default NotFoundSection;
