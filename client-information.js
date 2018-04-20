/**
 * Created by TricknessBoy on 2017/1/10.
 */
var client = function(){
    //呈现引擎
    var engine = {
        ie : 0,
        gecko : 0,
        webkit : 0,
        khtml : 0,
        opera : 0,
        ver : null //完整的版本号
    };

    //浏览器
    var browser = {
        ie : 0,
        firefox : 0,
        safari : 0,
        konq : 0,
        opera : 0,
        chrome : 0,
        ver : null //具体的版本号
    };

    //平台、设备和操作系统
    var system = {
        win : false,
        mac : false,
        xll : false,

        //移动设备
        iphone : false,
        ipod : false,
        ipad : false,
        ios : false,
        android : false,
        nokiaN : false,
        winMobile : false,

        //游戏系统
        wii : false,
        ps : false
    };

    //检测呈现引擎及浏览器
    var ua = navigator.userAgent;
    if(window.opera){
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    }else if(/AppleWebkit\/(S+)/.test(ua)){
        engine.ver = RegExp["$1"];   //RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
        engine.webkit = parseFloat(engine.ver);

        //确定是C货rome还是Safari
        if(/Chrome\/(S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        }else if(/Version\/(S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        }else{
            //近似的确定版本号
            var safariVersion = 1;
            if(engine.webkit < 100){
                safariVersion = 1;
            }else if(engine.webkit < 312){
                safariVersion = 1.2;
            }else if(engine.webkit < 412){
                safariVersion = 1.3;
            }else{
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    }else if(/KHTML\/(S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);

        //确定是不是Firefox
        if(/Firefox\/(S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    }else if(/MSIE ([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }

    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win")==0;
    system.mac = p.indexOf("Mac")==0;
    system.xll = (p == "Xll") || (p.indexOf("Linux")==0);

    //检测Windows操作系统
    if(system.win){
        if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
            if(RegExp["$1"] == "NT"){
                switch (RegExp["$2"]){
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            }
        }else if(RegExp["$1"] == "9x"){
            system.win = "ME";
        }else{
            system.win = RegExp["$1"];
        }
    }

    //移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    //Windos mobile
    if(system.win == "CE"){
        system.winMobile = system.win;
    }else if(system.win == "Ph"){
        if(/Windows Phone OS (\d+.\d+)/.test(ua)){
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }

    //检测IOS版本
    if(system.ios && ua.indexOf("Mobile")>-1){
        if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
            system.ios = parseFloat(RegExp.$1.replace("_","."));
        }else{
            system.ios = 2; //不能真正检测出来，所以只能猜测
        }
    }

    //检测Android版本
    if(/Android (\d+.\d+)/.test(ua)){
        system.android = parseFloat(RegExp.$1);
    }

    //游戏系统
    system.wii = ua.indexOf("Wii")>-1;
    system.ps = /playstation/i.test(ua);

    return {
        engine : engine,
        browser : browser,
        system : system
    };
}();