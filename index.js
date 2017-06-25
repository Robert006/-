function getElementByClassName(element,names) {
    if (element.getElementsByClassName) {
          return element.getElementsByClassName(names);
         }               //方法存在直接用方法
    else{
      var aEle=element.getElementsByTagName('*');   //获取所有子节点
      var aResult=[];
      var flag=null;
      var aName=names.split(' ');
    for (var i=0;i<aEle.length;i++) {
      var classNameStr=''+aEle[i].className+'';
          flag=true;
    for(var j=0;j<aName.length;j++){
      if(classNameStr.indexOf(''+aName[j]+'')==-1){
        flag=false;
        break;
      }
    }
      if (flag) {
        aResult.push(aEle[i]);    //选择包含class的元素
      }
    }
      return aResult;
    }
}                // 通过class获取元素;
function starMove(obj,attr,target) {
  clearInterval(obj.timer);
  obj.timer=setInterval(function(){
    var cur=0;
    if (attr=='opacity') {
      cur=Math.round(parseFloat(getStyle(obj,attr))*100);
    }
    else{
      cur=Math.round(parseInt(getStyle(obj,attr)));
    }
    var speed=target-cur>0?Math.ceil((target-cur)/6):Math.floor((target-cur)/6);
    if(target==cur){
      clearInterval(obj.timer);
     
    }
    else{
      if (attr=='opacity') {
        obj.style.opacity=(cur+speed)/100;
        obj.style.filter='alpha('+(cur+speed)+')';
      }
      else{
        obj.style[attr]=cur+speed+'px';
      }
    }
  },200);
}               // 运动框架
function getStyle(obj,attr){
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  }
  else{
    return getComputedStyle(obj,false)[attr];
  }
}                // 获取样式值

function tab(obj){
  for (var j = 0; j < aPointer.length; j++) {
      aPointer[j].className='';
    };
    obj.className='current';
    aList[obj.index].style.opacity=0;
    aList[obj.index].style.zIndex=zIdx++;
    starMove(aList[obj.index],"opacity",100);
}    //图片图标切换

function get(url,options,callback) {
  var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
  xhr.onreadystatechange=function () {
    if (xhr.readyState==4) {
       if(xhr.status>=200&&xhr.status<300||xhr.status==304){
          callback(xhr.responseText);
       }
       else{
          console.log('Request was unsuccessful:' + xhr.status);
       }
    }
  };
  xhr.open("GET",url+"?"+serialize(options),true);
  xhr.send(null);
}         //Ajax请求GET方法的封装

function serialize(data) {
    if (!data) {return '';};
    var pairs=[];
    for(var name in data){
      if (!data.hasOwnProperty(name)) continue;
      if (typeof data[name] === 'function') continue;
      var value=data[name].toString();
      name = encodeURIComponent(name);
      value = encodeURIComponent(value);
      pairs.push(name + '=' + value);
    }
    return pairs.join("&");
}           //参数序列化

function randomNum(num) {
   var aNum=[];
  if (num<=10) {
    for (var j = 0; j < num; j++) {
      aNum.push(j);
    };
    return aNum;
  }
    else{
      for (var i = 0; i < num; i++) {
         var random=Math.round(Math.random()*num); 
           if (aNum.indexOf(random)==-1) {
              aNum.push(random);
              if (aNum.length==10) {
                return aNum;
              };
           }
      }  
    }
}       //从数组中随机获得10个不同的数


var oBanner=getElementByClassName(document,'m-banner')[0];
var aImg=oBanner.getElementsByTagName('img');
var oList=getElementByClassName(oBanner,'list')[0];
var aList=oList.getElementsByTagName('li');
var oPointer=getElementByClassName(oBanner,'pointer')[0];
var aPointer=oPointer.getElementsByTagName('i');
var timer=null;
for (var i = 0; i < aPointer.length; i++) {
     var zIdx=2;
     aPointer[i].index=i;
  aPointer[i].onclick=function(){
    tab(this);
};
}

window.onload=function(){ 
      var k=0;
    timer=setInterval(function(){
      tab(aPointer[k]);
      k++;
      if (k>aPointer.length-1) {
        k=0;
      }
    },5000);  //页面加载时轮播
    for (var j = 0; j < aList.length; j++) {
          aList[j].onmouseover=function(){
             clearInterval(timer);
          };     //鼠标滑过停止
          aList[j].onmouseout=function(){
              timer=setInterval(function(){
              tab(aPointer[k]);
              k++;
              if (k>aPointer.length-1) {
                k=0;
              }
            },5000); 
          };     //鼠标划出继续
      }

  var oPro=getElementByClassName(document,"m-list2")[0];
  var oRank=getElementByClassName(document,"m-list3")[0];
  var demo=document.getElementById('demo');
      get('http://study.163.com/webDev/couresByCategory.htm',{pageNo:1,psize:15,type:10},function (data){
        var obj=JSON.parse(data);
        var aList=obj.list;
        for (var i = 0; i < aList.length; i++) {
          var oLi=document.createElement("li");
          oLi.className="pull-left";
          oLi.innerHTML="<a href='' class='u-thumb'><img src="+aList[i].middlePhotoUrl+"></a><div class='info'><h3 class='overflow c3 mb-10'>"+aList[i].name+"</h3><p class='c9 mb-10'>"+aList[i].provider+"</p><span class='u-view c9 mb-10'>"+aList[i].learnerCount+"</span><span class='red block'>&yen; "+aList[i].price+"</b></span></div>";
          oPro.appendChild(oLi);
        };
      });
      get('http://study.163.com/webDev/hotcouresByCategory.htm',{},function (data){
        var arr=JSON.parse(data);
        var aNum=randomNum(arr.length);
        for (var i = 0; i < 10; i++) {
          var oLi=document.createElement("li");
           oLi.className="pd-20 clearfix";
           oLi.innerHTML="<img class='avatar-50 pull-left' src="+arr[aNum[i]].smallPhotoUrl+"><div><h3 class='overflow c3 mb-10'>"+arr[aNum[i]].name+"</h3><p class='c9'>"+arr[aNum[i]].learnerCount+"</p></div>";
           oRank.appendChild(oLi);
        };
      });
}

