<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	const jv = uni.requireNativePlugin('JG-JVerification')
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.debug();
		this.initQuickLogin();
		this.setCustomUIWithConfig();
		this.preLogin();
	},
	onShow: function() {
		console.log('App Show');
		this.isInitSuccess();
	},
	onHide: function() {
		console.log('App Hide');
	},
	data:{
		jv
	},
	...mapState(['quickLoginInitStatus']),
	methods:{
		//--------------------------------------------------
		...mapMutations(['setQuickLoginInitStatus']),
		// 设置 debug 模式
		debug() {
			this.jv.setDebugMode(true);
		},
		// 初始化
		initQuickLogin() {
			let self = this;
			self.jv.init({
				timeout: 7000,
				isProduction: false,
			}, result => {
				console.log('init',JSON.stringify(result))
				self.setCustomUIWithConfig();
				if(result.code === 8000){}
			});
		},
		// 是否初始化成功
		isInitSuccess() {
			let self = this;
			self.jv.isInitSuccess(result => {
				if(result.enable){
					self.setQuickLoginInitStatus(result.enable);
				}
			})
		},
		
		// 一键登录预取号
		preLogin(){
			let self = this;
			self.jv.preLogin(5000,result=>{
				console.log('preLogin',JSON.stringify(result))
			})
		},
		
		// 自定义授权页面 UI 样式
		setCustomUIWithConfig() {
			let self = this;
			this.jv.addCustomViewsClickCallback(id => {
				console.log('customViewclick1', "id:" + id)
			});
		
			if (uni.getSystemInfoSync().platform == "ios") {
				this.jv.setCustomUIWithConfigiOS({
					navColor: 0xff000000,
					logBtnText: "其他手机号登陆",
					privacyState: true,
					appPrivacyColor: [0xff000200, 0xff000000],
					addCustomViews: [{
							type: "label",
							width: 654,
							height: 104,
							top: 320,
							left: 200,
							backgroundColor: 0xffF5F6F9,
							text: "自定义label",
							textFont: 20,
							textAlignment: 15,
							numberOfLines: 2,
							cornerRadius: 10,
							textColor: 0xff000000
						},
						{
							type: "button",
							id: "buttonTest",
							width: 180,
							height: 44,
							textColor: 0xff000000,
							cornerRadius: 22,
							left: 50,
							bottom: -100,
							title: "点击测试",
							isFinish: true, // 是否在授权页面通过自定义控件button的点击关闭授权页面
							backgroundImagePath: "static/big.jpg", // button正常情况下背景图片路径
							// normalImagePath:"static/bg.jpeg"  // 设置button图片路径
						},
						{
							type: "imageView",
							width: 50,
							height: 50,
							cornerRadius: 25,
							right: -100,
							bottom: -100,
							imagePath: "static/qq.png"
						}
					]
				})
			} else {
				this.jv.addCustomViewsClickCallback(id => {
					// self.showModal('customViewclick', "id2:" + id);  //点击自定义控件出发事件
					console.log("zidingyiClick2222id==",id)
					uni.navigateTo({
						url:"/pages/login/login_code"
					})
				});
				this.jv.setCustomUIWithConfigAndroid({
					setNavHidden:true, //是否取消导航栏
					setNumberColor: 0xff06121E,//设置手机号码字体颜色
					setNumberSize: 24,//设置手机号码字体大小
					// setNumFieldOffsetX: 24,//设置号码栏相对于屏幕左边x轴偏移
					
					setSloganTextColor:0xff8C9198, //设置移动 slogan 文字颜色
					// setSloganOffsetX:24,			//设置 slogan 相对于标题栏下边缘y偏移
					
					setLogBtnText: "本机号码一键登录",  //设置登录按钮文字
					setLogBtnTextColor:0xffFFFFFF,  //设置登录按钮文字颜色
					setLogBtnTextSize: 18,      //设置登录按钮文字大小
					setLogBtnWidth:327,      //设置登录按钮宽
					setLogBtnHeight:47,     // 设置登录按钮高
					// setLogBtnOffsetX:24,    //设置登录按钮相对于屏幕左边x轴偏移
					setLogBtnBottomOffsetY:380 ,//设置登录按钮相对屏幕底部y轴偏移
					
					setPrivacyState: true,
					setAppPrivacyColor: [0xffBDC4CE,0xff8C9198],
					setLogoImgPathFromJs: "static/loginLogo.png", //设置Logo图片
					setLogBtnImgPathFromJs: "static/login_btn.png", //设置授权登录按钮图片
					setAuthBGImgPathFromJs: "static/quickLoginBg.png",  //设置背景图片
					setLoadingViewEnable: true,         //设置是否在屏幕中间显示LoadingView
					setStatusBarTransparent: true,      //设置状态栏是否透明
					addCustomViews: [
						{
							//在授权页面添加自定义文字控件
							type:"text",
							finishFlag:false,
							id: "1",
							text:"欢迎来到抖车e族",
							textSize:25,
							bgColor:0xff06121E,
							margins:[0,200,0,0],
							align:14,
						},
						{   //在授权页面添加自定义控件
							type: "button", //可填 text 或 button 或 image
							finishFlag: true,  //是否在授权页面通过自定义控件的点击finish授权页面
							id: "2",
							width: 327,
							height: 47,
							text: "其他号码登陆",
							textSize: 18,
							align: 14,
							margins: [0, 300, 0, 0],
							bgColor: 0xffF5F6F9
						},
						// {
						// 	type: "image",
						// 	finishFlag: true,
						// 	id: "id2",
						// 	width: 50,
						// 	height: 50,
						// 	align: 13,
						// 	margins: [0, 0, 0, 0],
						// 	bgImgPath: "static/qq.png"
						// }
					],
				})
			}
		}
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
