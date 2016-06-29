var n= 1,total= 0,
   $bindPlan = $.Callbacks();

//->绑定列表区域的数据
function bindList(data){
    var str="";
    $.each(data,function(index,curData){
        str+="<li><span>"+curData["num"]+"</span>";
        str+="<span>"+curData["name"]+"</span>";
        str+="<span>"+curData["sex"]==1?"女":"男"+"</span>";
        str+="<span>"+curData["score"]+"</span>";
        str+="</li>";

    })

    $(".listul").html(str);
}

$bindPlan.add(bindList);

//->绑定分页区域的数据

function bindPage(){
    var str="";
    for (var i=1;i<=total;i++){
        str+="<li>"+i+"</li>";
    }
    $("#pagaList").html(str);
    $bindPlan.remove(arguments.callee);
}

$bindPlan.add(bindPage);

//->让当前页码选中
function checkBg(){
    $("#pagaList").children("li").eq(n-1).addClass("bg").siblings().removeClass("bg")
}
$bindPlan.add(checkBg);

$bindPlan.add(function () {
    $("#search").val(n);
});

//->给分页区域的按钮绑定点击事件
function bindEvent(){
    $(".btnbox").delegate("span","click",function(){
        var inn=$(this).html();
        if(inn=="FIRST"){
            if(n==1){
                return;
            }
            n=1;
        }
        if(inn=="LAST"){
            if(n==total){
                return;
            }
            n=total;
        }
        if(inn=="PREV"){
            if(n==1){
                return;
            }
            n--;
        }
        if(inn=="NEXT"){
            if(n==total){
                return;
            }
            n++;
        }
        sendAjax();
    }).delegate("li","click",function(){
        var inn=parseFloat($(this).html());
        if(inn==n){
            return;
        }
        n=inn;
        sendAjax();
    });

    $bindPlan.remove(bindEvent);



}

$bindPlan.add(bindEvent);

//->给文本框的keyup事件绑定方法实现跳转到第几页

//<input type="text" value="1" class="vaule">

function bindInputEvent(data){

    $("input").keyup(function(ev){
      if (ev.which===13){
          var val=$(this).val().replace(/^ +| +$/,"");
          if(val<1){
              val=1;
          }
          if(val>total){
              val=total;
          }
          if(n==val){
              n=val;
              $(this).val=val;
              return;
          }

          n=val;
          $(this).val=val;
          bindList(data);


      }

    });
    sendAjax();

    //$bindPlan.remove(bindInputEvent);

}
$bindPlan.add(bindInputEvent);


 function sendAjax(){
     $.ajax({
         url:"/getData?n="+n,
         type:"get",
         dataType:"json",
         cache:false,
         success:function(jsondata){
             if (jsondata){
                 total=jsondata["total"];
                 $bindPlan.fire(jsondata["data"]);
             }
         }
     })
 }
sendAjax();