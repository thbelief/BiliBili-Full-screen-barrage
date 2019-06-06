// ==UserScript==
// @name         BiliBili全屏弹幕发送(回车)
// @namespace    https://github.com/thbelief/BiliBili-Full-screen-barrage
// @version      1.0.0
// @description  在B站看视频的时候全屏状态下默认是不能发送弹幕的，这个脚本的功能就是在全屏状态下回车键弹出发送弹幕的sendbar~
// @author       thbelief
// @match        *://www.bilibili.com/bangumi/play/ep*
// @match        *://www.bilibili.com/bangumi/play/ss*
// @match        *://www.bilibili.com/video/av*
// @match        *://www.bilibili.com/watchlater/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
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
    
    let isSendBarExist=false;
    function doIt(){
        //监控是否按下回车键
        document.onkeydown = function (eTest) {
            if (!eTest) eTest = window.event;
            if ((eTest.keyCode || eTest.which) == 13) {
                // 判断是否是全屏
                let isFullScreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
                console.log("是否全屏状态："+isFullScreen);
               
                function fun(){
                    console.log("提示：在全屏状态下按了回车键！");
                    if(isSendBarExist){
                        isSendBarExist=false;
                        console.log("提示：已隐藏发送弹幕按钮！");
                        q('.bilibili-player-video-sendbar').css('opacity', 0).css('display', 'none')[0];
                    }else{
                        isSendBarExist=true;
                        console.log("提示：已显示发送弹幕按钮！");
                        //老版
                        q('.bilibili-player-video-sendbar').css('opacity', 1).css('display', 'flex');
                        
                        //使输入框自动获得焦点
                        $('input').focus();
                    }
                };
                if(isFullScreen){
                    //如果是全屏状态的话，就进行回车键弹出发送弹幕的效果
                    fun();
                }else{
                    console.log("提示：未进入全屏状态！");
                    
                }
            }
        }
        
    }
   doIt();
    
})();
