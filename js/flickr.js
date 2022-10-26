//0709871c8e7882cb0e92828719763266

const key = "89aae050d1d8c006bdb5bf866029199d";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const base = "https://www.flickr.com/services/rest?";
const per_page = 30;
const format = "json";

//
const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=이케아&privacy_filter=1`;

const body = document.querySelector("body");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btn = document.querySelector(".btnSearch");

callData(url2);

btn.addEventListener("click",()=>{
    let tag = input.value;

    tag = tag.trim(); //공백을 없애는 메서드

    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
    

    //input value값이 있을때만 적용되는 코드를 쓰면되겠죠?
    if(tag !=""){
        callData(url);
    }else{
        frame.innerHTML = '';
        frame.classList.remove("on");
        frame.getElementsByClassName.height = "auto";

        const errMsgs = frame.parentElement.querySelectorAll("p");
        if(errMsgs.length >0) frame.parentElement.querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append("검색어를 입력하세요");
        frame.parentElement.append(errMsg); //frame은 가상돔으로 만들었고 위에서 없애는 코드를 적었기 때문에 frame이 아닌 부모에 에러메세지를 만들어야한다.
    }
})

input.addEventListener("keypress",(e)=>{
    if(e.keyCode == 13){
        let tag = input.value;
    
        tag = tag.trim(); //공백을 없애는 메서드
    
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
        callData(url);
    
        if(tag !=""){
            callData(url);
        }else{
            frame.innerHTML = '';
        frame.classList.remove("on");
        frame.getElementsByClassName.height = "auto";

        const errMsgs = frame.parentElement.querySelectorAll("p");
        if(errMsgs.length >0) frame.parentElement.querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append("검색어를 입력하세요");
        frame.parentElement.append(errMsg); //frame은 가상돔으로 만들었고 위에서 없애는 코드를 적었기 때문에 frame이 아닌 부모에 에러메세지를 만들어야한다.
        }
    
        }
})

frame.addEventListener("click",(e)=>{
    e.preventDefault();

    //만약 내가 클릭이벤트를 발생시킨 대상이 frame임이라면(list전체) 멈춰(return);
    if(e.target == frame) return;

    //바로 썸네일 그림을 특정시켜 접근한다.
    let target = e.target.closest(".item").querySelector(".thumb");

    if(e.target == target){ //내가 클릭한 그 대상이 썸네일 일때만
    let imgSrc = target.parentElement.getAttribute("href");
    let pop = document.createElement("aside");
    pop.classList.add("pop");
    let pops = `
        <img src="${imgSrc}">
        <span class="close">close</span>
    `;
    pop.innerHTML = pops;

    body.append(pop);
    }else{
        return;
    }
})

body.addEventListener("click",(e)=>{
    let pop = body.querySelector(".pop");

    if(pop !=null){ //팝이 존재한다는 것은 동적으로 pop을 생성한 이후의 선후관계를 명확히 물어보는 논리
        let close = pop.querySelector(".close");
        if(e.target == close) pop.remove();
    }
})



function callData(url){

    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

    fetch(url)
        .then(data=>{
            return data.json();
        })
        .then(json=>{
            let items = json.photos.photo;
            if(items.length > 0){
                createList(items);
                delayLoading();
            }else{
                loading.classList.add("off");

                const errMsgs = frame.parentElement.querySelectorAll("p");
        if(errMsgs.length <0) frame.parentElement.querySelector("p").remove();  
                
                const errMsg = document.createElement("p");
                errMsg.append("검색하신 검색어의 이미지가 없습니다.");
                frame.parentElement.append(errMsg);

                frame.classList.remove("on");
                frame.style.height = "auto";

            }
        })
}

function createList(items){
    let htmls = '';
    items.map(el=>{
        let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
        let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

        htmls += `
                <li class="item">
                    <div>
                        <a href=${imgSrcBig}>
                            <img class="thumb" src=${imgSrc}>
                        </a>
                        <p>${el.title}</p>
                        <span>
                            <img class="profile" src="http://farm${el.farm}.staticflickr.com/${el.server}/buddyicons/${el.owner}.jpg">
                            <strong>${el.owner}</strong>
                        </span>
                    </div>
                </li>
            `;
    });
    frame.innerHTML = htmls;
}

function delayLoading(){
    const imgs = frame.querySelectorAll("div a img");
    const len = imgs.length;
    let count = 0;
    for(let el of imgs){
        el.onload =()=>{
            count++;
            if(count == len) isoLayout();
        }

        let thumb = el.closest(".item").querySelector(".thumb");
        thumb.onerror =e=>{          
            e.currentTarget.closest(".item").querySelector("div a img").setAttribute("src","img/k1.jpg");  
        }
        let profile = el.closest(".item").querySelector(".profile");
        profile.onerror =e=>{          
            e.currentTarget.closest(".item").querySelector("div span img").setAttribute("src","https://www.flickr.com/images/buddyicon.gif");  
        }
    }
}
function isoLayout(){
    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list",{
        itemSeletor : '.item',
        columnWidth : ".item",
        transitionDuration : "0.5s"
    });
}