const jv = uni.requireNativePlugin('JG-JVerification')
export default {
	//一键登录授权
	LoginAuth(callback){
		this.setCustomUIWithConfig();
		jv.loginAuth({
			autoFinish: true,
			timeout: 5000
		}, result => {
			console.log(JSON.stringify(result))
			if(result.code === 6000){
				let options = {};
				options.data = {'loginToken':result.content};
				options.url = 'common/appUserLogin/oneKeyLogin';
				Vue.prototype.$http.request(options).then(function(res){
					// console.log('testres==',res);
					callback(res)
				})
			}else if(result.code === 6002){
				console.log('授权取消')
			}
		}, event => {
			console.log("loginAuthevent:" + JSON.stringify(event));
		})
	},
	
	// 自定义授权页面 UI 样式
	setCustomUIWithConfig() {
		let self = this;
		jv.addCustomViewsClickCallback(id => {
			console.log('customViewclick1', "id:" + id)
		});
	
		if (uni.getSystemInfoSync().platform == "ios") {
			jv.setCustomUIWithConfigiOS({
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
			jv.addCustomViewsClickCallback(id => {
				// self.showModal('customViewclick', "id2:" + id);  //点击自定义控件出发事件
				console.log("zidingyiClick2222id==",id)
				console.log("zidingyiClick2222idtype==",typeof id)
				if(id == 2){
					uni.navigateTo({
						url:"/pages/login/login_phone",
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
			});
			jv.setCustomUIWithConfigAndroid({
				setNavHidden:true, //是否取消导航栏
				setNumberColor: 0xffFFFFFF,//设置手机号码字体颜色
				setNumberSize: 24,//设置手机号码字体大小
				// setNumFieldOffsetX: 24,//设置号码栏相对于屏幕左边x轴偏移
				setNumberFieldOffsetBottomY:430,//设置号码栏相对于屏幕底部y轴偏移
				
				setSloganTextColor:0xffFFFFFF, //设置移动 slogan 文字颜色
				setSloganBottomOffsetY:410,			//设置 slogan 相对于屏幕底部下边缘y轴偏移
				
				setLogBtnText:"",		 //设置登录按钮文字
				setLogBtnWidth:350,      //设置登录按钮宽
				setLogBtnHeight:50,     // 设置登录按钮高A
				// setLogBtnOffsetX:20,    //设置登录按钮相对于屏幕左边x轴偏移
				setLogBtnBottomOffsetY:320 ,//设置登录按钮相对屏幕底部y轴偏移
				setLogBtnImgPathFromJs:"static/quickLoginBtn.png",//设置授权登录按钮图片
				
				setPrivacyState: true,
				setAppPrivacyColor: [0xffBDC4CE,0xff8C9198],
				setLogoImgPathFromJs: "static/loginLogo.png", //设置Logo图片
				
				setAuthBGImgPathFromJs: "static/loginBg.png",  //设置背景图片
				setLogoOffsetBottomY: 530,			//设置logo相对于屏幕底部y轴偏移
				setLoadingViewEnable: true,         //设置是否在屏幕中间显示LoadingView
				setStatusBarTransparent: true,      //设置状态栏是否透明
				
				setAppPrivacyColor:[0xffFFFFFF,0xffFFB062],  //设置隐私条款名称颜色(基础文字颜色，协议文字颜色)
				setPrivacyNavTitleTextSize:22,		//设置协议展示 web 页面导航栏标题文字大小
				setPrivacyOffsetY: 20,             //设置隐私条款相对于授权页面底部下边缘y偏移
				setPrivacyTextWidth:260,			//设置隐私条款文字栏宽度
				setPrivacyCheckboxHidden:true,		//设置隐私条款checkbox是否隐藏
				setPrivacyState:true,				//设置隐私条款默认选中状态，默认不选中
				setPrivacyTextCenterGravity:true,    //设置隐私条款文字是否居中对齐（默认左对齐）
				setAppPrivacyOne:['用户协议','http:www.baidu.com'],
				setAppPrivacyTwo:['隐私政策','http:www.baidu.com'],
				// setPrivacyText:['登录即同意','和用户协议','、隐私政策','并使用本机号码登录'],
				
				addCustomViews: [
					{
						//在授权页面添加自定义文字控件
						type:"text",
						finishFlag:false,
						id: 1,
						text:"欢迎来到抖车e族",
						textSize:34,
						width: 420,
						height: 60,
						textColor:0xffFFFFFF,
						margins:[100,150,0,0],
						align:14,
					},
					{
						type: "image",
						finishFlag: true,
						id: 2,
						width: 400,
						height: 50,
						align: 14,
						margins: [0, 360, 0, 100],
						bgImgPath: "static/quickOtherBtn.png"
					},
					{
						type: "image",
						finishFlag: true,
						id: 3,
						width: 22,
						height: 22,
						align: 9,
						margins: [20, 20, 0, 0],
						bgImgPath: "static/backBtn.png"
					},
					
				],
			})
		}
	},
	//获取验证码(type短信类型 1用户-注册/登录 2用户-找回密码(重置登陆密码))
	sendCode(phone,type,callback){
		let options = {};
		options.data = {'phone':phone, "type ":type };
		options.url = '/common/sms/verificationCode';
		options.method = 'POST';
		Vue.prototype.$http.request(options).then(function(res){
			callback(res)
		})
	},
	
	//账号密码登录(默认短信登录1，用户1,密码登录2，平台2)
	loginCommon(account,password,callback,loginType=1,personType=1){
		let loginMethod = "mobileAndCode"
		let userType = "user"
		if(loginType === 2){
			loginMethod = "accountAndPassword"
		}
		if(personType === 2){
			userType = "sys"
		}
		let options = {};
		options.data = {
			'loginMethod':loginMethod,
			'userType':userType,
			'loginInfo':loginInfo,
			'loginSecret': password
		};
		options.url = '/common/appUserLogin/login';
		options.method = 'POST';
		Vue.prototype.$http.request(options).then(function(res){
			callback(res)
		})
	}
}