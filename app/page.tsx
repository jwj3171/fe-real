
export default function Home() {
  
  return (
    <div className="mx-auto max-w-[1920px]">
      
      {/* --------- Landing Banner --------- */}
      
      <div className="grid place-items-center h-[315px] md:h-[405px] lg:h-[405px]">
      <img src="/assets/landing-banner.svg" alt="배경 이미지"
          className="overlay-text col-start-1 row-start-1 h-full object-cover"/>
          <div className="flex-shrink-0 col-start-1 row-start-1 flex flex-col items-center justify-center text-center
          gap-[8px] md:gap-[16px] w-[265px] md:w-[431px] ">
         <h1 className="text-[20px] md:text-[32px] md:leading-[46px] leading-[32px] font-bold md:mt-[100px] mt-[50px] min-w-0 text-[#FFFFFF] ">
          이사 업체 어떻게 고르세요?</h1>
        <p className=" text-[16px] md:text-[18px]  leading-[26px] text-[#D9D9D9] mt-2 min-w-0 ">
          무빙은 여러 견적을 한눈에 비교해<br />
          이사업체 선정 과정을 간편하게 바꿔드려요
        </p>
          </div>
      </div>

      {/* --------- Landing Card --------- */}
      <div  className="flex max-w-[1400px] md:px-[5px] mx-auto justify-center md:items-center md:mt-[150px] mt-[60px] md:gap-[170px] gap-[40px] md:flex-row flex-col ">
        <p className=" sm:text-[20px] md:text-[32px] font-bold text-[#262524] shrink-0 ml-[20px]
          " >번거로운 선정과정,<br />이사 유형부터 선택해요</p>
        <div className=" mx-auto ">
          <img src="/assets/landing-card.svg" className="hidden sm:block" alt="배경카드" ></img>
           <img src="/assets/landing-card-sm.png" className="block sm:hidden object-cover" alt="배경카드" ></img>
          </div>
      </div>

      
      {/* --------- Landing Hero --------- */}


      <div className="relative flex max-w-[1400px] md:px-[30px] mx-auto md:mt-[120px] mt-[80px] ">
        <p className="absolute text-[20px] md:text-[32px] font-bold text-white w-[382px] h-[92px] lg:text-left text-right
        lg:mt-[10%] md:mt-[50px] mt-[30px] lg:right-[15%] right-[10%] " >
        원하는 이사 서비스를 요청하고<br />견적을 받아보세요
      </p>
        <div className=" ">
          <img src="/assets/landing-hero_sm.png" className="block md:hidden"  />
          <img src="/assets/landing-hero_md.png" className="hidden md:block lg:hidden"  />
          <img src="/assets/landing-hero.svg" className="hidden lg:block" />
        </div>
      </div>

       
      {/* --------- Landing Preview --------- */}
       <div className="relative flex max-w-[1920px]">
        <p className=" absolute text-[20px] md:text-[32px] font-bold text-[#262524] shrink-0 lg:ml-[15%] lg:mt-[5%] mt-[100px] ml-[35px]
          " >
          여러 업체의 견적을<br />한눈에 비교하고 선택해요
        </p>
        <div className=" ">
          <img src="/assets/landing-Preview_sm.png" className="block md:hidden"  />
          <img src="/assets/landing-Preview_md.png" className="hidden md:block lg:hidden"  />
          <img src="/assets/landing-Preview.svg" className="hidden lg:block" />
        </div>
       </div>
       

      {/* --------- Footer --------- */}
      <div className="flex items-center bg-gradient-to-r from-[#F95D2E] to-[#F9502E] py-[87px]">
        <div className="flex flex-col items-center gap-8">
          <div className="flex w-[100px] h-[100px] justify-center items-center">
            <img src="/favicon.ico" alt="앱 아이콘" />
          </div>
          <div className="text-white text-center text-[28px] font-bold">
            복잡한 이사 준비, 무빙 하나면 끝!
          </div>
        </div>
      </div>

    </div>
  );
}
