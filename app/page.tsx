
import styles from '@/app/landing.module.css';


export default function Home() {
  
  return (
  <div className={styles.body}>

  <div className={styles.landingBanner}>
    <img src="/assets/landing-banner.svg" alt="배경 이미지" className={styles.landingBannerImg} />
  <div className={styles.landingBannerTextBox} >
    <div className={styles.landingBannerTextMain}>이사 업체 어떻게 고르세요?</div>
    <div className={styles.landingBannerTextSub}>무빙은 여러 견적을 한눈에 비교해 <br/> 
    이사업체 선정 과정을 간편하게 바꿔드려요</div> 
    </div>
  </div>
  
  <div className={styles.landingCard}>
      <img src="/assets/landing-card.svg" alt="배경카드" className={styles.landingCardImg} ></img>
      <div className={styles.landingCardText} >번거로운 선정과정,<br/>이사 유형부터 선택해요</div>
  </div>

 
    <div className={styles.landingHero}>
      <img src="/assets/landing-hero.svg" alt="배경히로" className={styles.landingHeroImg} ></img>
    <div className={styles.landingHeroText} >원하는 이사 서비스를 요청하고<br/>견적을 받아보세요</div>
  </div>

  <div className={styles.landingPreview}>
      <img src="/assets/landing-preview.svg" alt="배경프리뷰" className={styles.landingPreviewImg} ></img>
    <div className={styles.landingPreviewText} >여러 업체의 견적을<br/>한눈에 비교하고 선택해요</div>
  </div>


  <div className={styles.landingFooter}>
    <div className={styles.footercontainer}>
      <div className={styles.appIcon}>
        <img src="/favicon.ico" alt="앱 아이콘" ></img>
        </div>
      <div className={styles.footerText}>복잡한 이사 준비, 무빙 하나면 끝!</div>
    </div>
  </div>
  </div>
  ); 

}
