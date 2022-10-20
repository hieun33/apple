class Anim {
    constructor(selector, option){
        this.selector = selector;
        this.option = option;
        this.startTime = performance.now();  
        (option.duration==undefined) ? this.speed = 500 : this.speed = option.duration;    
        this.currentValue;
        this.timer;
      
        if(this.option.prop === "scroll"){
            this.currentValue = parseInt(window.scrollY || window.pageYOffset);
        }else if(this.selector.style[this.option.prop]){           
            if(this.option.prop === "opacity"){
                this.currentValue = parseFloat(this.selector.style[this.option.prop]);  
            } else {
                this.currentValue = parseInt(this.selector.style[this.option.prop]);  
            } 
        }else{ 
            if(this.option.prop === "opacity"){
                this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]);            
            } else {
                this.currentValue = parseInt(getComputedStyle(this.selector)[this.option.prop]);
            }
        }
        
        this.isString = typeof this.option.value;
        if(this.isString == "string") this.option.value = parseFloat(this.option.value);
        if(this.option.value !== this.currentValue) requestAnimationFrame(time =>{this.run(time)});    
    }

    run(time){  
        let timeLast = time - this.startTime;
        let progress = timeLast/this.speed;  

        if(progress < 0) progress = 0;
        if(progress > 1) progress = 1; 

        if(progress < 1) {
            this.timer = requestAnimationFrame(time => {this.run(time)});
        }else {
            cancelAnimationFrame(this.timer);
            if(this.option.callback) {
                setTimeout(()=>{
                    this.option.callback();
                },0);
            } 
        }

        let result = this.currentValue + ((this.option.value- this.currentValue)*progress);
        
        if(this.option.prop === "opacity"){
            this.selector.style[this.option.prop] = result; 
        } else if(this.option.prop === "scroll"){
            window.scroll(0, result);
        } else if(this.isString == "string"){
            this.selector.style[this.option.prop] = result+"%"; 
        }else{
            this.selector.style[this.option.prop] = result+"px"; 
        }
    }    
}
