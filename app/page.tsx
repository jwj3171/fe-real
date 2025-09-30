
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
       <div className=" w-full flex flex-col h-[374px] md:h-[530px] md:flex-col lg:h-[509px] 
       lg:flex-row justify-center lg:items-center gap-[40px] ">
         <div className="lg:mt-[196px] lg:mb-[221px] lg:mr-[175px] mt-[10px] ml-[32px] flex-shrink-0 ">
          <p className="text-[20px] md:text-[32px] md:leading-[46px] leading-[32px] font-bold text-[#262524] 
          " >번거로운 선정과정,<br />이사 유형부터 선택해요</p>
          </div>
          <div className="flex md:min-w-[677px] min-w-[350px] justify-center max-h-[261px] ">
        <img src="/assets/landing-card.svg" alt="배경카드" 
        className=" overflow-hidden object-cover md:object-contain md:w-[690px] md:h-[261px] flex-shrink-0
         min-w-[375px] aspect-[125/54]"  />
        </div>
      </div>

      
      {/* --------- Landing Hero --------- */}

<div className="flex justify-center w-full lg:mt-[60px] ">
  <div className="grid grid-cols-1 grid-rows-1 w-max-[1920px] min-w-[375px] ">

    <div className="col-start-1 row-start-1 flex justify-end lg:w-max-[1402px] lg:mt-[150px] lg:mr-[15%] z-10">
      <p className="text-[20px] md:text-[32px] md:leading-[46px] leading-[30px] 
        font-bold text-white w-[382px] h-[92px] lg:text-left md:text-right text-right">
        원하는 이사 서비스를 요청하고<br />견적을 받아보세요
      </p>
    </div>

    <div className="overlay-text col-start-1 row-start-1 text-center place-self-center flex 
        lg:h-[787px] lg:w-[1402px] 
        md:h-[835px] h-[495px] ">
      <picture className=" flex items-center justify-center flex-shrink ">
  <source srcSet="/assets/landing-hero_sm.png" media="(max-width: 375px)"  />
  <source srcSet="/assets/landing-hero_md.png" media="(max-width: 744px)" />
  <img src="/assets/landing-hero.svg" alt="Landing Hero" />
</picture>

    </div>

  </div>
</div> 


 {/* <div className="flex justify-center w-full mt-[60px]">
  <div className="grid grid-cols-1 grid-rows-1 w-max-[1920px] min-w-[375px] ">

    <div className="col-start-1 row-start-1 flex justify-end lg:w-max-[1402px] lg:mt-[150px] lg:mr-[15%] z-10">
      <p className="text-[20px] md:text-[32px] md:leading-[46px] leading-[30px] 
        font-bold text-white w-[382px] h-[92px] lg:text-left md:text-right text-right">
        원하는 이사 서비스를 요청하고<br />견적을 받아보세요
      </p>
    </div>

    <div className="overlay-text col-start-1 row-start-1 text-center place-self-center flex 
        lg:h-[787px] lg:w-[1402px] 
        md:h-[835px] h-[495px]">
      <img src="/assets/landing-hero.svg" alt="배경카드"
           className="w-full h-full md:object-contain " />
    </div>

  </div>
</div>  */}


   
       
      {/* --------- Landing Preview --------- */}
       {/* <div
        className="relative w-full aspect-[1920/1081] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: "url('/assets/landing-preview.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-[32px] leading-[46px] font-bold text-[#262524]">
          여러 업체의 견적을<br />한눈에 비교하고 선택해요
        </p>
      </div> */}

      {/* --------- Footer --------- */}
      {/* <div className="flex justify-center items-center bg-gradient-to-r from-[#F95D2E] to-[#F9502E] py-[87px]">
        <div className="flex flex-col items-center gap-8">
          <div className="flex w-[100px] h-[103px] justify-center items-center">
            <img src="/favicon.ico" alt="앱 아이콘" />
          </div>
          <div className="text-white text-center text-[28px] leading-[46px] font-bold">
            복잡한 이사 준비, 무빙 하나면 끝!
          </div>
        </div>
      </div> */}

    </div>
  );
}
