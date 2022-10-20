

//변수설정
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

//이벤트 바인딩

//btnCall을 클릭할때

btnCall.onclick = function(e){
    //링크이동금지
    e.preventDefault();

    //btnCall에 on이 있으면 제거하고, 없으면 추가
    btnCall.classList.toggle("on");
    //menuMo에 on이 있으면 제거하고, 없으면 추가
    menuMo.classList.toggle('on');
}

//인기상품 슬라이더
const play = el.querySelector(".play"); 
const pause = el.querySelector(".pause"); 
const load = el.querySelector(".load"); 


var swiper = new Swiper(".swiper-mySwiper",{
    effect: "cube", // cube 효과 슬라이딩
    cubeEffect: {
        shadow: true, //슬라이더 밑 그림자
        slideShadows: true, //슬라이더가 돌아갈때 그림자
        shadowOffset: 20, //그림자의 위치
        shadowScale: 0.94, //그림자의 크기
    },
    direction : "horizontal", //슬라이딩 방향 
    spaceBetween : 0,  //슬라이드간 사이간격
    slidesPerView : 1, //하나의 화면당 보일 패널의 갯수
    grabCursor : true, //스와이프시 마우스 커서모양 변경
    loop: true, //슬라이딩 순환여부를 결정한다.
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      //true : 자동롤링중에 스와이핑을 하면 롤링이 중지
      //false : 자동롤링중에 스와이핑이 되더라도 롤링은 계속유지 
    },
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
    mousewheel: true,
    keyboard: {
      enabled: true,
    }
});