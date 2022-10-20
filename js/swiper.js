var swiper = new Swiper(".mySwiper",{
    direction : "horizontal", //슬라이딩 방향 
    spaceBetween : 6,  //슬라이드간 사이간격
    slidesPerView : 3, //하나의 화면당 보일 패널의 갯수
   // grabCursor : true, //스와이프시 마우스 커서모양 변경
    loop: true, //슬라이딩 순환여부를 결정한다.
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    //   //true : 자동롤링중에 스와이핑을 하면 롤링이 중지
    //   //false : 자동롤링중에 스와이핑이 되더라도 롤링은 계속유지 
    // },
    pagination: {
      //페이징 버튼
      el: ".swiper-pagination",
      clickable: true, //클릭이 가능하도록 조정
      renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
      },//페이지네이션버튼을 만들어줌
      //css에서 조절가능
    },
    navigation: {
      //좌우 버튼 옵션
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    //mousewheel: true,
    keyboard: {
      enabled: true,
    }
});

// //변수설정 
// //롤링시작, 롤링정지 버튼을 변수로 저장한다.
// const btnStart = document.querySelector(".btnStart");
// const btnStop = document.querySelector('.btnStop');

// //페이지 로딩시 자동롤리이 정지되게 코딩
// swiper.autoplay.stop();
// //롤링시작버튼 클릭에만 롤링이 시작되게
// btnStart.onclick = function(){
//   swiper.autoplay.start();
// }
// //롤링정지버튼을 클릭시에만 롤링이 정지되게
// btnStop.addEventListener("click",()=>{
//   swiper.autoplay.stop();
// })
