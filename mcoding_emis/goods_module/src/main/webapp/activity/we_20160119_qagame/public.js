
var _domain = window.location.host;
var url = "";
//获得gameid
var _gameid = Number(location.search.split('gameid=')[1]);
//生产环境
/*var appid = "wxc29d38541362f295";
if(_domain == 'v.merryplus.com'){
	url = "http://v.merryplus.com/";
}*/
//测试环境
var appid = "wx07c01da2e6bcb01d";
if(_domain == 'www.coding.mobi'){
	url = "http://www.coding.mobi/EMIS/";
}
else
{
	url="http://192.168.2.70:8080/EMIS/"
}


$(function(){

	/*页脚功能栏添加*/
	var bodyTail= '<div style="z-index:9;font-size:12px;text-align:center;line-height:14px;display:-webkit-box;height:60px;width:100%;position:fixed;bottom:0;background-color:white;">'
				 +	'<div style="height:60px;-webkit-box-flex:1"><img style="height:35px;margin-top:4px" src="./images/home.png" ><p>首页</p></div>'
				 +	'<div style="height:60px;-webkit-box-flex:1"><img style="height:35px;margin-top:4px" src="./images/press.png" ><p>自测</p></div>'
				 +	'<div style="height:60px;-webkit-box-flex:1"><img style="height:35px;margin-top:4px" src="./images/normal.png" ><p>体检报告</p></div>'
				 +	'<div style="height:60px;-webkit-box-flex:1"><img style="height:35px;margin-top:4px" src="./images/hair.png" ><p>发样</p></div>'
				 +	'<div style="height:60px;-webkit-box-flex:1"><img style="height:35px;margin-top:4px" src="./images/shape.png" ><p>我的</p></div>'
				 +	'</div>'
				 +'<div style="height:16px;width:34px;position:fixed;left:50%;margin-left:-17px;z-index:3;background-color:white;border-radius:50%;bottom:49px"></div>'
	$('.foot').html(bodyTail);


	// var fullPath=window.location.href;
	// var timestamp = 0;//时间戳
	// var nonceStr = '';//随机串
	// var signature = '';//签名
	// $.ajax({
	// 	type:"post",
	// 	url: url+"api/wechatShare2",
	// 	async: false,
	// 	//global: false,
	// 	dataType: "json",
	// 	data:{'fullPath':fullPath},
	// 	success: function(rs) {
	// 		console.log(rs);
	// 		timestamp=rs.data.timestamp;
	// 		nonceStr=rs.data.nonceStr;
	// 		signature=rs.data.signature;
	// 	}
	// });

	// var title = "";
	// var desc = '';

	// $.ajax({
	// 	type:"get",
	// 	url: url + "merriplusApi/queryGameById.html?id="+_gameid,
	// 	async: false,
	// 	dataType: "json",
	// 	success: function(data) {
	// 		if(data.data!=null){
	// 			_gaintitleLevel = data.data.gaintitle;
	// 		}
	// 		title = data.data.gamename;
	// 		desc = '快来参与答题，领取丰富奖品吧！';
	// 	}
	// });

	// var link = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
	// 		"appid=" +appid+
	// 		"&redirect_uri="+url+"api/getWxUserShare.html?getWxUserShare=MRMJ," +_gameid+
	// 		"&response_type=code&scope=snsapi_userinfo" +
	// 		"&state="+url+"api/wechatShareLink.html#wechat_redirect";
	// var imgUrl = url+'activity/we_20150807_qagame/images/merryplus_logo.png';

	//   wx.config({
	//       debug: false,
	//       appId: appid,
	//       timestamp: timestamp,
	//       nonceStr: nonceStr,
	//       signature: signature,
	//       jsApiList: ['onMenuShareTimeline',
	//                   //'hideMenuItems',
	//                   //'hideAllNonBaseMenuItem',
	//                   'onMenuShareAppMessage']
	//   });

	//   wx.error(function (res) {
	// 	  //alert(res.errMsg);
	// 	  js_msg({
	// 			'msg':res.errMsg
	// 			//'href':'index.html'
	// 		});
	// 	});

	//   wx.ready(function () {
	// 	  wx.onMenuShareTimeline({
	// 		  	title: title, // 分享标题
	// 			desc: desc, // 分享描述
	// 			link: link, // 分享链接
	// 			imgUrl: imgUrl, // 分享图标
	// 		    success: function () {
	// 		        // 用户确认分享后执行的回调函数
	// 		    },
	// 		    cancel: function () {
	// 		        // 用户取消分享后执行的回调函数
	// 		    }
	// 		});

	// 	  wx.onMenuShareAppMessage({
	// 		  title: title, // 分享标题
	// 			desc: desc, // 分享描述
	// 			link: link, // 分享链接
	// 			imgUrl: imgUrl, // 分享图标
	// 			type: '', // 分享类型,music、video或link，不填默认为link
	// 			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	// 			success: function() {
	// 				// 用户确认分享后执行的回调函数
	// 			},
	// 			cancel: function() {
	// 				// 用户取消分享后执行的回调函数
	// 				js_msg({
	// 					'msg':'已取消分享！'
	// 				});

	// 			}
	// 		});
//		  wx.hideAllNonBaseMenuItem();
//		  wx.hideMenuItems({
//		      menuList: [
//		        'menuItem:readMode', // 阅读模式
//		        'menuItem:share:appMessage',//发送给朋友
//		        'menuItem:share:timeline', // 分享到朋友圈
//		        'menuItem:share:qq', //分享到手机QQ
//		        'menuItem:copyUrl' // 复制链接
//		      ],
//		      success: function (res) {
//		        //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
//		      },
//		      fail: function (res) {
//		        alert(JSON.stringify(res));
//		      }
//		    });
	  // });
});