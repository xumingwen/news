//先定义loadnews()函数，并执行一次，默认加载"推荐"标签下的新闻

var tagname = $(".underline").text();
function loadnews(){
	$.post("php/select.php",{newstag:tagname},function(data){
		//首先清空news-container中的内容；
		$(".news-container").empty();
		//如果该类新闻列表无新闻或被删除完了，显示列表为空，否则将内容添加在html中
		if(data == "blank"){
			$("<div>").addClass("news-box").attr("style","text-align:center").text($(".type-text-active").text()+"新闻列表为空").appendTo(".news-container");
		}else{
			//遍历每一条新闻
			$.each(data,function(index,value){
				//为每个新闻盒子绑定点击事件，若点击跳转到内容页并显示相应内容
				var	newsBox = $("<div>").addClass("news-box").appendTo(".news-container").on("click",function(){
					$(".container").hide();
					$(".content-page").show();
					// $(".cp-head-title").text($(".type-text-active").text());
					$(".cp-title").text(value.newstitle);
					$(".cp-date").text(value.addtime);
					$(".cp-img").attr("src",value.newsimg);
					$(".cp-content").text(value.newscontent);
				});
				//插入div.box-img，并插入图片
				var boxImg = $("<div>").addClass("box-img").appendTo(newsBox);
				$("<img>").attr("src",value.newsimg).addClass("news-img").appendTo(boxImg);
				//插入div.box-text
				var boxText = $("<div>").addClass("box-text").appendTo(newsBox);
				//插入div.box-title和div.box-time
				$("<div>").addClass("news-title").text(value.newstitle).appendTo(boxText);
				$("<div>").addClass("box-time").text(value.addtime).appendTo(boxText);
			});
		};
	});
};

loadnews();

//切换标签的时，向select.php文问发送标签名，返回对应类别的新闻，并执行loadnews()函数，加载到页面里
$("#menu li a").click(function(){
	$(".underline").removeClass("underline");
	$(this).addClass("underline")
	tagname = $(".underline").text();
	$.post("php/select.php",{"newstag":tagname},loadnews());
});

//content-page里面，点击左上角返回刚才的界面
$(".content-page .cp-nav span").on("click",function(){
	$(".content-page").hide();
	$(".container").show();
})




