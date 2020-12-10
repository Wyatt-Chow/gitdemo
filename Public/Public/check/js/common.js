$(function(){
	var h =($(window).height() - 60);
	$(".content,.main").css("height",h + "px");
	$(window).resize(function(){
		var h =($(window).height() - 60);
		$(".content,.main").css("height",h + "px");

	});
//开关
	$(".close_menu").toggle(function(){
		$("#pane").hide();
		$(".content").css({"padding-left":"0px"});
		$(this).css({"left":"0px","background-position":"-13px 0px"});
	},function(){
		$("#pane").show()
		$(".content").css({"padding-left":"210px"});
		$(this).css({"left":"210px","background-position":"0px 0px"});
	});

//菜单
	$(".menu h3").click(function(){
		if($(this).next("ul").is(":hidden")){
			$(this).addClass("cur").next("ul").show();
		}else{
			$(this).removeClass("cur").next("ul").hide();
		};
	});
	$("a.ht_a").click(function(){
		if($(this).next(".show_sub_menu").is(":hidden")){
			$(this).addClass("cur").next(".show_sub_menu").show();
		}else{
			$(this).removeClass("cur").next(".show_sub_menu").hide();
		};
	});
//自定义滚动条
	$('#pane').perfectScrollbar({
		wheelSpeed: 20,
		wheelPropagation: false
	});


//IE6、7提示
	if (window.ActiveXObject) {
		var ua = navigator.userAgent.toLowerCase();
		var ie=ua.match(/msie ([\d.]+)/)[1]
		if(ie==6.0|ie==7.0){
			$("body").prepend("<div id='popDiv'>您使用的是较低版本浏览器，建议您使用IE8.0以上版本浏览器或者<a href='http://www.firefox.com.cn/download/'>firefox</a>、<a href='http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html'>chrome</a>、<a href='http://chrome.360.cn/'>360极速</a>浏览器，获得更好的操作体验。<span></span></div>");
		}
	}
	$("#popDiv span").click(function(){
		$("#popDiv").hide();
	});

//隔行变色

	$("body").on({
				mouseover: function() {
					$(this).css({"background-color":"#fafafa"});
				},
				mouseout: function() {
					$(this).css({"background-color":"#ffffff"});
				}
			}, ".tr_color tbody tr"
	);
	$(".slideToggleBtn").click(function(){
		if($(this).text()=='收起'){
			$(this).text('展开').addClass("show");
			$(".table2 tr").hide();
			$(".table2 tr:first-child,.table2 tr:last-child").show();
		}else{
			$(this).text('收起').removeClass("show");
			$(".table2 tr").show();
		}

	})
});

function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
}
function MenuFix(){
	var Top = $(".inforTabNav").offset().top+40;
	var HeadTop =  $(".top").height();
	$(".main").scroll(function() {
		var scrTop = $('.main').scrollTop();
		if(scrTop >= Top - HeadTop ) {
			$(this).find('.mao-list').addClass("fixed")
		} else if (scrTop < Top - HeadTop) {
			$(this).find('.mao-list').removeClass("fixed")
		};
		$(".mDotTit").each(function(index){
			var ofsetTop = $(this).offset().top;
			if(ofsetTop+scrTop-HeadTop<scrTop){
				$(".mao-list li").eq(index).addClass("current").siblings("li").removeClass("current");
			}
		})
	});
}

$(document).ready(function(){
	$(".mao-list li").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		var HeadTop =  $(".top").height();
		var Id = $(this).attr("ar");
		var height = $(Id).offset().top+$('.main').scrollTop()-HeadTop;
		$(".main").animate({scrollTop:height+2});
	})
})
