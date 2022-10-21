//  746d1ba358d61d53531d522b92160f84

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];
const branch_btns = document.querySelectorAll('.branch li');

let zoom = true; 
//줌뺄때 false로 바꾸면됌

var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.4241326, 126.8828773), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

var markerOptions = [
    {
        title:"이케아광명점",
        latlag: new kakao.maps.LatLng(37.4241326, 126.8828773),
        imgSrc: '../img2/img/marker.png',
        imgSize: new kakao.maps.Size(100 ,100),
        imgPos: {offset: new kakao.maps.Point(50, 120)},
        button : branch_btns[0]
    },
    {
        title:"이케아고양점",
        latlag: new kakao.maps.LatLng(37.6299601, 126.8629739),
        imgSrc: '../img2/img/marker.png',
        imgSize: new kakao.maps.Size(100 ,100),
        imgPos: {offset: new kakao.maps.Point(40, 80)},
        button : branch_btns[1]
    },
    {
        title:"이케아기흥점",
        latlag:new kakao.maps.LatLng(37.2226337,127.116102),
        imgSrc: '../img2/img/marker.png',
        imgSize: new kakao.maps.Size(100 ,100),
        imgPos: {offset: new kakao.maps.Point(70, 80)},
        button : branch_btns[2]
    }
    
]

for(let i=0; i<markerOptions.length; i++){
    new kakao.maps.Marker({ //마커라는 생성자 함수
        map : map,
        position : markerOptions[i].latlag,
        title : markerOptions[i].title,
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc,markerOptions[i].imgSize,markerOptions[i].imgPos),
    })

    markerOptions[i].button.addEventListener("click",e=>{
        e.preventDefault();

        //모든 버튼을 반복을 돌면서 모두 제거하고
        for(let k=0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove('on');
        }
        //내가 선택한 곳에 on을 붙여주는것
        markerOptions[i].button.classList.add('on');
        moveTo(markerOptions[i].latlag);
    })


}

t_on.addEventListener("click",e=>{
    e.preventDefault();
    if(t_on.classList.contains('on')) return;
    //t_on은 교통정보를 보여주는 버튼인데 현재 교통정보 버튼에 on일 경우 또다시 이벤트가 발생하지 않도록 on을 contain으로 물어보고 현재상태가 on이 있는 경우 아무일도 발생하지 않게 return으로 반화하고, 없으면 해당조건문은 무시.
    // if(t_on.classList.contains('on')) contains -> 블린값반환
    // on이 부터잇으면 true,아니면false반환

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.add('on');
    t_off.classList.remove('on');
})

t_off.addEventListener("click",e=>{
    e.preventDefault();
    if(t_off.classList.contains('on')) return;
    
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);   
    t_off.classList.add('on');
    t_on.classList.remove('on');
})

//브라우저 리사이즈시 현재 활성화 되어있는 버튼의 data-index를 구해서 setCenter의 매개변수로 사용한다. data-index를 사용하는 이유는 카카오맵의 함수를 사용하는데 nth-of-type등의 순서는 인수로 보낼수 없기 때문이다.

// window.addEventListener('resize',()=>{}) 같은함수
window.onresize =()=>{
    let active_btn = document.querySelector('.branch li.on');
    let active_index = active_btn.getAttribute('data-index');

    map.setCenter(markerOptions[active_index].latlag);
}


//정가운데 위치할수 있게 하는 함수
function moveTo(target){
    //var moveLatlon = target;
    map.setCenter(target);
}

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl);

setZoomable(z);
function setZoomable(z){
    map.setZoomable(z)
}

