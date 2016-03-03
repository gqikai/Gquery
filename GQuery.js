/**
 * Created by gaoqikai on 16/3/2.
 */
function GQuery(vArg){
    this.elements = [];
    switch (typeof vArg){
        case 'string' :{
            switch (vArg.charAt(0)){
                case '#' :{
                    this.elements.push(document.getElementById(vArg.substring(1)));
                    break;
                }
                case '.' :
                {
                    var data = document.getElementsByClassName(vArg.substring(1));
                    var i = 0;
                    for(i = 0; i <data.length; i ++){
                        this.elements.push(data[i]);
                    }
                    break;
                }
                default:{
                    var data = document.getElementsByTagName(vArg);
                    var i = 0;
                    for(i = 0; i <data.length; i ++){
                        this.elements.push(data[i]);
                    }
                }
            }
        }
        case 'object':{
            break;
        }
        case 'function':{
            myAddEvent(window,"load",vArg);
            break;
        }
    }
}

GQuery.prototype.toggle = function(){

}

GQuery.prototype.show = function(){
    var i  = 0;

    for(i = 0; i < this.elements.length; i ++){
        if(this.elements[i].getAttribute("display-bak")){
            this.elements[i].style.display = this.elements[i].getAttribute("display-block");
        }else{
            this.elements[i].style.display = "none";
        }
    }
}

GQuery.prototype.hide = function(){
    var i  = 0;

    for(i = 0; i < this.elements.length; i ++){

        var display = this.elements[i].getAttribute("diaplay");
        this.elements[i].setAttribute("display-bak",display);
        this.elements[i].style.display = "none";
    }
}

GQuery.prototype.click = function(fn){
    var i  = 0;

    for(i = 0; i < this.elements.length; i ++){
        myAddEvent(this.elements[i],"click",fn);
    }
}

GQuery.prototype.css = function(vArg){
    if(arguments.length == 2){
        var i  = 0;

        for(i = 0; i < this.elements.length; i ++){
            this.elements[i].style[arguments[0]] = arguments[1];
        }
    }else{
        myGetStyle(this.elements[0],vArg);
    }
}

GQuery.prototype.attr = function(vArg){
    switch (arguments.length){
        case 0:{
            break;
        }
        case 1:{
            this.elements[0].getAttribute(vArg);
            break;
        }
        case 2:{
            var i  = 0;

            for(i = 0; i < this.elements.length; i ++){
                this.elements[i].setAttribute(arguments[0],arguments[1]);
            }
            break;
        }
        default:{

        }
    }
}

function myAddEvent(obj, event, func){
    if(obj.attachEvent){
        obj.attachEvent('on' + event, function(){
            func.call(obj);
        });
    }else{
        obj.addEventListener(event,func);
    }
}

function myGetStyle(obj, attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    }
}

function $(vArg){
    return new GQuery(vArg);
}