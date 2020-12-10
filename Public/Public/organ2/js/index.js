function data_tab(tab){
    try{clearInterval(interval_status);}catch(e){}
	$(".data_tab a").removeClass("hover");
	$(".data_tab a").eq(tab).addClass("hover");
    index_ajax_load(tab);
    interval_status=setInterval(function(){index_ajax_load(tab)},2000);
}
$(function(){
	try {
        data_tab(0);
    }catch(err){

	}
})

function index_ajax_load(tab){
    var str_trade_amount='';
    var str_income_num='';
    var str_discount_amount='';
    var str_refund_amount='';
    var str_refund_num='';
    $.ajax({
        type: 'post',
        url: '/index/datareport?dtype='+tab,
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            layer.closeAll();
            if(data==null){return false;}
            $.each(data['income'],function(name,value) {
                str_trade_amount+='<p class="rmb">'+value['currency_sign']+(value['trade_amount']/100)+'</p>';
                str_discount_amount+='<p class="rmb">'+value['currency_sign']+(value['discount_amount']/100)+'</p>';
                str_income_num+='<p class="rmb">'+value['trans_count']+'</p>';
            });
            $.each(data['refund'],function(name,value) {
                str_refund_amount+='<p class="rmb">'+value['currency_sign']+(value['trade_amount']/100)+'</p>';
                str_refund_num+='<p class="rmb">'+value['trans_count']+'</p>';
            });
            if(str_trade_amount==''){str_trade_amount='<p class="rmb">0</p>';}
            if(str_discount_amount==''){str_discount_amount='<p class="rmb">0</p>';}
            if(str_income_num==''){str_income_num='<p class="rmb">0</p>';}
            if(str_refund_num==''){str_refund_num='<p class="rmb">0</p>';}
            if(str_refund_amount==''){str_refund_amount='<p class="rmb">0</p>';}
            $("#trade_amount").html(str_trade_amount);
            $("#discount_amount").html(str_discount_amount);
            $("#income_num").html(str_income_num);
            $("#refund_num").html(str_refund_num);
            $("#refund_amount").html(str_refund_amount);
        }
    })
}