(function() {
    'use strict';
    //选择
    const q = function (selector) {
        let nodes = [];
        if (typeof selector === 'string') {
            Object.assign(nodes, document.querySelectorAll(selector));
            nodes.selectorStr = selector;
        } else if (selector instanceof NodeList) {
            Object.assign(nodes, selector);
        } else if (selector instanceof Node) {
            nodes = [selector];
        }
        nodes.click = function (index = 0) {
            nodes.length > index && nodes[index].click();
            return this;
        }
        nodes.addClass = function (classes, index = 0) {
            nodes.length > index && nodes[index].classList.add(classes);
            return this;
        }
        nodes.removeClass = function (classes, index = 0) {
            nodes.length > index && nodes[index].classList.remove(classes);
            return this;
        }
        nodes.css = function (name, value, index = 0) {
            nodes.length > index && nodes[index].style.setProperty(name, value);
            return this;
        }
        nodes.getCss = function (name, index = 0) {
            return nodes.length > index && nodes[index].ownerDocument.defaultView.getComputedStyle(nodes[index], null).getPropertyValue(name);
        }
        return nodes;
    }

    // 判断是否是全屏
    let isFullScreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
    console.log("是否全屏状态："+isFullScreen);
    if(isFullScreen){
        //如果是全屏状态的话，就进行回车键弹出发送弹幕的效果
        let isSendBarExist=false;
        function fun(){
            console.log("提示：在全屏状态下按了回车键！");
           if(isSendBarExist){
               isSendBarExist=false;
               console.log("提示：已隐藏发送弹幕按钮！");
                q('.bilibili-player-video-sendbar').css('opacity', 0).css('display', 'none')[0];
           }else{
                isSendBarExist=true;
                console.log("提示：已显示发送弹幕按钮！");
                q('.bilibili-player-video-sendbar').css('opacity', 1).css('display', 'flex');
                //使输入框自动获得焦点
                $('input').focus();
           }

        };
        document.onkeydown = function (e) {
            if (!e) e = window.event;
            if ((e.keyCode || e.which) == 13) {
                fun();//全屏状态下按了回车键触发的方法
            }
        }
    }
})();
