// v 1.0.1
var v={win:null,doc:null,utilsPointer:null,handlers:[],beTrigger:!1,options:[],items:[],ajaxCount:0,form:null,init:function(a,b){var d,c=this;return c.win=a,c.doc=b,c.utilsPointer=d=c.utils(c),function(a){if("undefined"==typeof a)return this;var b=d.$(a.form);if(b)return c.form=b,c.items=[],c.options=[],c.ajaxCount=0,d.addEvent(b,"submit",function(e){var i,f=c.items.length,g=0,h=!1;for(d.preventDefault(e),d.validateAll.call(c,c.options,!1),c.ajaxCount>0&&alert("由于您的网速问题，请等待异步验证返回结果！");f>g;g++)if(d.hasClass(d.$(c.items[g]),c.classObj["inputError"])){h=!0;break}return a.beforeSubmit&&d.isFunction(a.beforeSubmit)&&(i=a.beforeSubmit()),i===!1||h?!1:(a.ajaxSubmit?d.ajaxForm(b,a.afterSubmit):b.submit(),void 0)}),c.method.call(c,b)}},method:function(){var c=(this.doc,this),d=c.utilsPointer;return{v:"1.0.1",add:function(a){if(!a)return this;var b=0,e=Array.prototype.slice.call(arguments),g=(c.options,e.length);for(b=0;g>b;b++)c.items.push(e[b].target),c.options.push(e[b]),d.bindHandlers.call(this,e[b]);return this},remove:function(a){for(var e,g,h,i,j,b=0,f=c.options.length;f>b;b++)if(a===c.options[b].target){e=b;break}return void 0==e?this:(c.items.splice(e,1),j=c.options.splice(e,1),h=c.handlers.splice(e,1)[0],g=d.$(a),j.action&&c.ajaxCount--,i=d.$$(c.classObj["tip"],g.parentNode,"div")[0],d.removeClass(g,c.classObj["inputError"]+" "+c.classObj["inputPass"]),i&&i.parentNode.removeChild(i),d.removeEvent(g,"focus",h["focusFn"]),d.removeEvent(g,"blur",h["blurFn"]),d.removeEvent(g,"change",h["changeFn"]),d.removeEvent(g,"keyup",h["keyupFn"]),this)},reset:function(){for(var e,a=0,b=c.items.length;b>a;a++)e=d.$(c.items[a]),d.removeClass(e,c.classObj["inputError"]+" "+c.classObj["inputPass"]),e.value="";return d.hideAllTip(c.form),c.ajaxCount=0,this},trigger:function(a,b){for(var f,e=0,g=c.options.length;g>e;e++)if(a===c.options[e].target){f=e;break}return void 0==f?this:(c.beTrigger=!0,d.blurHandler(c.options[f])(),c.beTrigger=!1,b&&b.call(this),this)},config:function(a){var d,b=c.config;if("object"==typeof a)for(d in a)b[d]=a[d];return this}}},utils:function(obj){var that=obj,doc=that.doc,utils=that.utilsPointer,item=that.config;return{$:function(a){return"string"==typeof a?doc.getElementById(a):a},trim:function(a){return a.replace(/^\s+|\s+$/,"").replace(/\s+/," ")},escaping:function(a){return a.replace(/^\s+|\s+$/g,"").replace(/(['"])/g,function(a,b){return"\\"+b}).replace(/[\r\n]/g,"")},isFunction:function(a){return"function"==typeof a?!0:!1},hasClass:function(a,b){return b=" "+b+" ",(" "+a.className+" ").indexOf(b)>-1?!0:!1},isNumber:function(a){var b=/^[-+]?(0|[1-9]\d*)(\.\d+)?$/;return b.test(a)},check:function(a,b){return a.test(b)},extend:function(a,b){for(var c in b)a[c]=b[c];return a},confirms:function(a){var e,b=that.utilsPointer,c=b.$(a.target),d=b.$(a.confirms);d&&(e=b.hasClass(d,that.classObj["inputPass"]),e&&(c.value===d.value?b.successTips(a):b.errorTips(a)))},$$:function(a,b,c){var g,d=0,e=0,f=[];for(c=c||"*",b=b||that.doc,g=b.getElementsByTagName(c),e=g.length;e>d;d++)this.hasClass(g[d],a)&&f.push(g[d]);return f},encodeNameAndValue:function(a,b){return encodeURIComponent(a)+"="+encodeURIComponent(b)},serializeForm:function(a){for(var f,h,i,j,k,b=that.utilsPointer.$(a),c=b.elements,d=c.length,e=0,g=[];d>e;e++)switch(f=c[e],f.type){case"select-one":case"select-multipe":for(h=0,i=f.options.length;i>h;h++)j=f.options[h],j.selected&&(k="",k=j.hasAttribute?j.hasAttribute("value")?j.value:j.text:j.attributes["value"].specified?j.value:j.text,g.push(that.utilsPointer.encodeNameAndValue(f.name,k)));break;case void 0:case"fieldset":case"button":case"submit":case"reset":case"file":break;case"checkbox":case"radio":if(!f.checked)break;default:g.push(that.utilsPointer.encodeNameAndValue(f.name,f.value))}return g.join("&")},addEvent:function(a,b,c){"undefined"!=typeof a.addEventListener?a.addEventListener(b,c,!1):"undefined"!=typeof a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c},removeEvent:function(a,b,c){"undefined"!=typeof a.removeEventListener?a.removeEventListener(b,c,!1):"undefined"!=typeof a.detachEvent?a.detachEvent("on"+b,c):a["on"+b]=null},fireEvent:function(a,b){if("object"==typeof document.createEventObject)return a.fireEvent("on"+b);var c=document.createEvent("HTMLEvents");return c.initEvent(b,!0,!0),!a.dispatchEvent(c)},preventDefault:function(a){a=a||window.event,a.preventDefault?a.preventDefault():a.returnValue=!1},show:function(a){a&&(a.style.cssText="inline-block;*display:inline;*zoom:1;")},hide:function(a){a&&(a.style.display="none")},removeClass:function(a,b){for(var c=this.trim(b).split(" "),d=a.className,e=0,f=c.length;f>e;e++)this.hasClass(a,c[e])&&(d=d.replace(c[e],""));a.className=this.trim(d)},addClass:function(a,b){for(var c=this.trim(b).split(" "),d=a.className,e=0,f=c.length;f>e;e++)this.hasClass(a,c[e])||(d+=" "+c[e]);a.className=this.trim(d)},bindHandlers:function(a){var d,b=that.utilsPointer,c=b.$(a.target);a.confirms&&(d=b.$(a.confirms)),focusFn=b.focusHandler.call(this,a),blurFn=b.blurHandler.call(this,a),changeFn=b.changeHandler.call(this,a),keyupFn=b.keyupHandler.call(this,a),b.addEvent(c,"focus",focusFn),b.addEvent(c,"blur",blurFn),b.addEvent(c,"keyup",keyupFn),d&&b.addEvent(d,"blur",function(){b.fireEvent(c,"blur")}),("select"==c.type||"file"==c.type)&&b.addEvent(c,"change",changeFn),that.handlers.push({target:a.target,focusFn:focusFn,blurFn:blurFn,changeFn:changeFn,keyupFn:keyupFn})},focusHandler:function(a){var b=that.utilsPointer;return function(){var c=b.$(a.target),d=c.value,e=c.getAttribute("placeholder")||"";a.beforeFocus&&b.isFunction(a.beforeFocus)&&a.beforeFocus(a),(!b.hasClass(c,that.classObj["inputError"])&&!b.hasClass(c,that.classObj["inputPass"])||""===d||d===e)&&(a.focusTips?b.resetItem(a):b.tips(a))}},blurHandler:function(a){var b=this,c=that.utilsPointer;return function(){var d=c.$(a.target),e=d.value,f=d.getAttribute("placeholder"),g=!0;return that.beTrigger||a.empty||""!==e&&e!==f?(a.beforeBlur&&c.isFunction(a.beforeBlur)&&(g=a.beforeBlur(a)),g===!1?(c.errorTips(a),void 0):(c.validateItem.call(b,a),a.afterBlur&&c.isFunction(a.afterBlur)&&a.afterBlur.call(b,a),void 0)):(c.resetItem(a),void 0)}},changeHandler:function(a){var b=that.utilsPointer;return function(){b.validate(a)?b.errorTips(a):successTips(a),a.afterChange&&b.isFunction(a.afterChange)&&a.afterChange.call(b.$(a.target),a)}},keyupHandler:function(a){var b=that.utilsPointer;return function(){a.onkeypress&&b.isFunction(a.onkeypress)&&a.onkeypress.call(b.$(a.target),a)}},createTip:function(){var a=document.createElement("div");return a.className=that.classObj["tip"],a},tip:function(a,b){var c=a.ruleType&&a.ruleType.match(/\w+/g)[0],d=a[b]||item[c]&&item[c][b]||"",e=this.$(a.target),f=this.$$(that.classObj["tip"],e.parentNode,"div")[0];switch(f||(f=this.createTip(),e.parentNode.appendChild(f,e.nextSibling)),f.innerHTML="<span>"+d+"</span>",this.show(f),b){case"tips":this.removeClass(e,that.classObj["inputError"]+" "+that.classObj["inputPass"]),this.removeClass(f,that.classObj["error"]+" "+that.classObj["pass"]);break;case"error":this.removeClass(e,that.classObj["inputPass"]),this.addClass(e,that.classObj["inputError"]),this.removeClass(f,that.classObj["pass"]),this.addClass(f,that.classObj["error"]);break;case"pass":this.removeClass(e,that.classObj["inputError"]),this.addClass(e,that.classObj["inputPass"]),this.removeClass(f,that.classObj["error"]),this.addClass(f,that.classObj["pass"]);break;case"warning":this.removeClass(e,that.classObj["inputPass"]),this.addClass(e,that.classObj["inputError"]),this.removeClass(f,that.classObj["pass"]),this.addClass(f,that.classObj["error"])}a.noTips&&this.hide(f)},tips:function(a){this.tip(a,"tips")},errorTips:function(a){this.tip(a,"error")},successTips:function(a){var b=this.$(a.target);this.tip(a,"pass"),""===b.value&&this.resetItem(a)},warnTips:function(a){this.tip(a,"warning")},hideAllTip:function(a){for(var e,b=0,c=this.$$(that.classObj["tip"],a,"div"),d=c.length;d>b;b++)e=c[b],e.parentNode.removeChild(e)},resetItem:function(a){var b=this.$(a.target),c=this.$$(that.classObj["tip"],b.parentNode,"div")[0];this.removeClass(b,that.classObj["inputError"]+" "+that.classObj["inputPass"]),b.value="",this.hide(c)},validate:function(a){var g,h,i,j,b=this.$(a.target),c="",d=a.fnRule,e=that.utilsPointer,f=b.getAttribute("placeholder");if(b.value===f&&(b.value=""),a.ruleType){for(g=a.ruleType,h=g.match(/\(?(\w+)[<>!=]*\w+\)?/g),i=0,j=h.length;j>i;i++)g="("==h[i][0]?b.value?e.isNumber(b.value)?g.replace("value",b.value>>0):g.replace("value",b.value.length>>0):g.replace("value",0):g.replace(h[i],"utils.check("+item[h[i]].rules+",'"+e.escaping(b.value)+"')");c=g}else{if(!a.rule)return;c="utils.check("+a.rule+",'"+e.escaping(b.value)+"');"}return!(d?new Function("utils,elem","return "+c)(e,b)&&d.call(b,a)!==!1:new Function("utils,elem","return "+c)(e,b))},validateAll:function(a,b){var e,d,c=that.utilsPointer;for(d=0;e=a[d++];)c.validateItem.call(this,e,b)},validateItem:function(a,b){var c=that.utilsPointer,e=(c.$(a.target),that),b=b||!0,f=c.validate(a);f?c.errorTips(a):a.action&&b?(e.ajaxCount+=1,c.ajaxValidate(a,function(b){if(e.ajaxCount-=1,b){if(a.success&&"function"==typeof a.success&&!a.success.call(c,a,b))return;c.successTips(a),a.confirms&&c.confirms(a)}else c.warnTips(a)})):(c.successTips(a),a.confirms&&c.confirms(a))},ajaxValidate:function(opts,callback){var el=that.utilsPointer.$(opts.target),val=el.value,name=el.name||el.id;that.utilsPointer.ajax({type:"GET",url:opts.action,noCache:!0,data:name+"="+encodeURIComponent(val),onsuccess:function(){var data;data=this.responseText?eval("("+this.responseText+")"):"",callback(data)}})},createXhr:function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;var a=null;try{return a=new ActiveXObject("MSXML2.XmlHttp.6.0")}catch(b){try{return a=new ActiveXObject("MSXML2.XmlHttp.3.0")}catch(b){throw Error("cannot create XMLHttp object!")}}},ajax:function(a){var b=that.utilsPointer.extend({url:"",data:"",type:"POST",timeout:5e3,onbeforerequest:function(){},onsuccess:function(){},onnotmodified:function(){},onfailure:function(){}},a||{}),c=that.utilsPointer.createXhr();"GET"==b.type.toUpperCase()&&(b.data&&(b.url+=(b.url.indexOf("?")>=0?"&":"?")+b.data,b.data=null),b.noCache&&(b.url+=(b.url.indexOf("?")>=0?"&":"?")+"t="+ +new Date)),c.onreadystatechange=function(){4==c.readyState&&(c.status>=200&&c.status<300?b.onsuccess.call(c,c.responseText):304==c.status?b.onnotmodified.call(c,c.responseText):b.onfailure.call(c,c.responseText))},c.open(b.type,b.url),"POST"==b.type.toUpperCase()&&(c.setRequestHeader("content-Type","application/x-www-form-urlencoded"),c.setRequestHeader("X-Requested-With","XMLHttpRequest")),b.onbeforerequest(),b.timeout&&setTimeout(function(){c.onreadystatechange=function(){},c.abort(),b.onfailure()},b.timeout),c.send(b.data)},ajaxForm:function(a,b){that.utilsPointer.ajax({type:a.method,url:a.action,data:that.utilsPointer.serializeForm(a),onsuccess:b})}}},classObj:{tip:"tip",pass:"tip-pass",error:"tip-error",inputPass:"item-pass",inputError:"item-error"},config:{required:{rules:/.+/,tips:"该信息为必填项，请填写！",error:"对不起，必填信息不能为空，请填写！"},username:{rules:/^[\u4E00-\u9FA5A-Za-z0-9_\ ]{2,20}$/i,tips:"5~20个字符，由中文、英文字母和下划线组成。",error:"对不起，用户名格式不正确。",warning:"对不起，该用户名已经被注册。"},password:{rules:/^[a-zA-Z0-9\_\-\~\!\%\*\@\#\$\&\.\(\)\[\]\{\}\<\>\?\\\/\'\"]{3,20}$/,tips:"3~20个字符，由英文字母，数字和特殊符号组成。",error:"对不起，您填写的密码有误。"},number:{rules:/^[-+]?(0|[1-9]\d*)(\.\d+)?$/,tips:"请输入数字！",error:"对不起，您填写的不是数字。"},date:{rules:/^\d{4}(\-|\.)\d{2}(\-|\.)\d{2}$/,tips:"请填写日期！格式为：2014-01-01或者2014.01.01",error:"对不起，您填写的日期格式不正确."},money:{rules:/^[-+]?(0|[1-9]\d*)(\.\d+)?$/,tips:"请输入金额！",error:"金额格式不正确。正确格式如：“60” 或 “60.5”。"},per:{rules:/^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$/,tips:"请输入百分比！",error:"对不起，您填写的百分比格式不正确！"},email:{rules:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,tips:"请输入您常用的E-mail邮箱号，以便我们联系您，为您提供更好的服务！",error:"对不起，您填写的E-mail格式不正确！正确的格式：yourname@gmail.com。",warning:"对不起，该E-mail帐号已经被注册。请更换一个。"},phone:{rules:/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,tips:"请输入可以联系到您常用的电话号码！",error:"对不起，您填写的电话号码格式不正确！"},mobile:{rules:/^[1-9]\d{10}$/,tips:"请输入可以联系到您的手机号码！",error:"对不起，您填写的手机号码格式不正确！"},url:{rules:/^(http|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/,tips:"请输入网站地址！",error:"对不起，您填写的网站地址格式不正确！正确的网站地址如：http://www.abc.com/。"},ip:{rules:/^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/,tips:"请输入IP地址！",error:"对不起，您填写的IP地址格式不正确！正确的IP地址如：192.168.1.1。"},postal:{rules:/^[1-9]\d{5}$/,tips:"请输入邮政编码！",error:"对不起，您填写的邮政编码格式不正确！正确的邮政编码如：410000。"},qq:{rules:/^[1-9]\d{4,}$/,tips:"请输入您的QQ号！",error:"对不起，您填写的QQ号格式不正确！正确的QQ号如：12345678。"},english:{rules:/^[A-Za-z]+$/,tips:"请输入英文字母！",error:"对不起，您填写的内容含有英文字母（A-Z,a-z）以外的字符！"},chinese:{rules:/^[\u0391-\uFFE5]+$/,tips:"请输入中文字符！",error:"对不起，您填写的内容含非中文字符！"},ce:{rules:/^[-\w\u0391-\uFFE5]+$/,tips:"请输入中文或英文或数字字符！",error:"对不起，您填写的内容不正确！"},select:{rules:/^[-\+]?[1-9]+$/,tips:"请选择！",error:"对不起，您选择的内容不正确！"},integer:{rules:/^[-\+]?\d+$/,tips:"请输入整数！",error:"对不起，您填写的内容不是整数！"},uint:{rules:/^\d+$/,tips:"请输入整数！",error:"对不起，您填写的内容不是整数！"},idcard:{rules:/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}[x]))$/,tips:"请输入身份证号码！",error:"对不起，您填写的身份证号码格式不正确！"},empty:{rules:/^\s*$/},anything:{rules:/^[\s\S]*$/}}}.init(window,document);