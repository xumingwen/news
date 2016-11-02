//定义加载函数，loadnews_back()，并默认执行一次！
function loadnews_back(){
	$.post("php/select_back.php",function(data){
		//首先清空news-container_back中的内容（除了第一行，表头）；
		$("#table_head").siblings().remove();
		
		// 遍历每一条新闻
		$.each(data,function(index,value){
			
			//创建newTr，并在下面插入7个td , 所取的值依次为: value.newsid .newstitle .newsimg(需要append()两次) .newscontent(需要额外加一句display:block) .addtime .newstag 两个按钮(需要append()3次)
			var	newsTr = $("<tr>").appendTo("#news_container_back")
			$("<td>").text(value.newsid).appendTo(newsTr);
			$("<td>").text(value.newstitle).appendTo(newsTr);
			var imgTd = $("<td>").appendTo(newsTr);
			$("<a>").attr("href",value.newsimg).attr("target", "_blank").text("点击查看").appendTo(imgTd);
			$("<td>").css("display","block").text(value.newscontent).appendTo(newsTr);
			$("<td>").text(value.addtime).appendTo(newsTr);
			$("<td>").text(value.newstag).appendTo(newsTr);
			var btnTd = $("<td>").appendTo(newsTr);

			//大BOSS来了！
			//插入编辑按钮，并给他绑定事件：进入编辑界面，并把当前值赋给编辑界面。
			$("<button>").addClass("btn btn-info update-btn").css("margin-right","4px").text("编辑").appendTo(btnTd).on("click",function(){
				$("#select-page").hide();
				$("#insert-page").hide();
				$("#update-page").show();
				//下面开始插入6个值
				$("#up_id").val(value.newsid);
				$("#up_title").val(value.newstitle);
				$("#up_img").val(value.newsimg);
				$("#up_content").text(value.newscontent);
				$("#up_time").val(value.addtime);
				$("#up_tag").val(value.newstag);
			});

			//插入删除按钮，删除按钮的功能在each函数外面写~~~
			$("<button>").addClass("btn btn-danger delete-btn").text("删除").appendTo(btnTd).click(function(){
					var deleteid = value.newsid;
					$.post("php/delete.php",{newsid:deleteid},function(){
						alert("删除成功");
					})//post的回调函数不执行，可能是因为跨域了！请问怎么解决？
					alert("删除成功！")
					location.reload();
				});

		});
	});
};
loadnews_back();


//点击左上角nav，切换页面
$("#sp-btn").click(function(){
	$("#insert-page").hide();
	$("#update-page").hide();
	$("#select-page").show();
});

$("#ip-btn").click(function(){
	$("#select-page").hide();
	$("#update-page").hide();
	$("#insert-page").show();
});



//编辑新闻页面中的两个按钮：
//（1）点击取消，返回。
//（2）点击提交，执行表单的sbumit，（用正则表达式验证。这个目前还没做），alert成功、返回。


$(".cancal-update-btn").click(function(){
	$("#update-page").hide();
	$("#select-page").show();
})


// $(".the-update-btn").click(function(){
// 	//点击的同时，自己就出发submit啦~~~
// 	alert("修改成功");//之后就跳到php页面了= =再往下的函数其实都没有执行;后来在网上找了不跳转的方法，这就成功啦！！！！
// 	//但是同时我还写了一个onclick="f5()"，那个复用性比较好诶~~~
// 	//而且，如果只是这样隐藏的话，本质上来说，数据不会更新！！！
// 	//所以这个写法是有毛病的！注释掉吧
// 	$("#update-page").hide();
// 	$("#select-page").show();
// })



//插入和修改，由于input的命名不同，所以需要写两遍。逻辑是一样的。
function updateCheck(){
	if($("#up_title")||$("#up_img")||$("#up_content")||$("#up_tag")||$("#up_time")){
		var RE=/[a-zA-z]+:\/\/[^\s]+/;
		if(RE.test($("#up_img").val())){
			return true;
		}else{
			alert("请输入正确的网络图片地址");
			return false;
		} 
	}else{
		return false;
	}
};

function insertCheck(){
	if($("#newstitle")||$("#newsimg")||$("#newscontent")||$("#newstag")||$("#addtime")){
		var RE=/[a-zA-z]+:\/\/[^\s]+/;
		if(RE.test($("#newsimg").val())){
			return true;
		}else{
			alert("请输入正确的网络图片地址");
			return false;
		} 
	}else{
		return false;
	}
};

//如果验证通过，刷新页面。否则什么都没发生！
//本来想直接调用上面的两个函数，但是！当img不正确的时候，会alert两次！
function updateCheck_noalert(){
	if($("#up_title")||$("#up_img")||$("#up_content")||$("#up_tag")||$("#up_time")){
		var RE=/[a-zA-z]+:\/\/[^\s]+/;
		if(RE.test($("#up_img").val())){
			return true;
		}else{
			
			return false;
		} 
	}else{
		return false;
	}
};

function insertCheck_noalert() {
    if ($("#newstitle") || $("#newsimg") || $("#newscontent") || $("#newstag") || $("#addtime")) {
        var RE = /[a-zA-z]+:\/\/[^\s]+/;
        if (RE.test($("#newsimg").val())) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

function insertF5() {
    if (Boolean(insertCheck_noalert())) {
        alert("添加成功");
        location.reload();
    }
}

function updateF5() {
    if (Boolean(updateCheck_noalert())) {
        alert("更新成功");
        location.reload();
    }
}