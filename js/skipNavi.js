const skipNavi = document.querySelectorAll("#skipNavi li a");

for(let el of skipNavi){

    el.addEventListener("focusin",()=>{
        el.classList.add('on');
    })

    el.addEventListener("focusout",()=>{
        el.classList.remove('on');
    })
}