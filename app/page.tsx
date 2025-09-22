
import styles from '@/app/landing.module.css';


export default function Home() {
  
  return (
    <div className="max-w-[1920px] mx-auto">

      <p className=" font-normal">Regular</p>
<p className=" font-medium">Medium</p>
<p className=" font-semibold">SemiBold</p>
<p className=" font-bold">Bold</p>

      {/* --------- Landing Banner --------- */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/405] mx-auto">
        <img
          src="/assets/landing-banner.svg"
          alt="배경 이미지"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-[30%] inset-0 flex flex-col items-center justify-center gap-4 max-w-[90%] mx-auto text-center text-[#FFFFFF]">
          <div className="lg:text-[32px] lg:leading-[46px] font-bold 
          md:text-[28px] md:leading-[38px] ">
            이사 업체 어떻게 고르세요?
          </div>
          <div className="lg:text-[18px] lg:leading-[26px] font-normal text-[#D9D9D9]">
            무빙은 여러 견적을 한눈에 비교해<br />
            이사업체 선정 과정을 간편하게 바꿔드려요
          </div>
        </div>
      </div>

      {/* --------- Landing Card --------- */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/509] mx-auto">
        <img
          src="/assets/landing-card.svg"
          alt="배경카드"
          className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[36%] aspect-[693/269.5] z-0"
        />
        <div className="absolute top-[40%] left-[22%] -translate-x-0 -translate-y-0 z-10 text-[32px] leading-[46px] font-bold text-[#262524]">
          번거로운 선정과정,<br />이사 유형부터 선택해요
        </div>
      </div>

      {/* --------- Landing Hero --------- */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/786.5] mx-auto">
        <img
          src="/assets/landing-hero.svg"
          alt="배경히로"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[73%] aspect-[1402/786.5] z-0"
        />
        <div className="absolute top-[25%] left-[65%] -translate-x-1/2 -translate-y-1/2 z-10 text-[32px] leading-[46px] font-bold text-white">
          원하는 이사 서비스를 요청하고<br />견적을 받아보세요
        </div>
      </div>

      {/* --------- Landing Preview --------- */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/1081] mx-auto">
        <img
          src="/assets/landing-preview.svg"
          alt="배경프리뷰"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-[14%] left-[22%] -translate-x-0 -translate-y-0 z-10 text-[32px] leading-[46px] font-bold text-[#262524]">
          여러 업체의 견적을<br />한눈에 비교하고 선택해요
        </div>
      </div>

      {/* --------- Footer --------- */}
      <div className="flex justify-center items-center bg-gradient-to-r from-[#F95D2E] to-[#F9502E] py-[87px]">
        <div className="flex flex-col items-center gap-8">
          <div className="flex w-[100px] h-[103px] justify-center items-center gap-[5px]">
            <img src="/favicon.ico" alt="앱 아이콘" />
          </div>
          <div className="text-white text-center text-[28px] leading-[46px] font-bold">
            복잡한 이사 준비, 무빙 하나면 끝!
          </div>
        </div>
      </div>

    </div>
  );
} 

