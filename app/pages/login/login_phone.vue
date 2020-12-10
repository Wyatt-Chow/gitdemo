<template>
	<view class="login">
		<view class="loginBg">
			<image src="/static/loginBg.png"></image>
		</view>
		<view class="login-back">
			<view class="login-back-status"></view>
			<view class="login-back-nav">
				<image src="/static/img/common/whiteBack.png" mode="" class="login-back-nav-img" @click="navigateBack"></image>
			</view>
		</view>
		<view class="login-header-img"><image src="/static/loginLogo.png"></image></view>
		<view class="login-head">欢迎加入抖车e族</view>
		<view class="login-explain">新用户登录将自动创建账号</view>
		<view class="login-card">
			<view class="login-input-phone">
				<input type="number"  placeholder-style="color:#BDC4CE" v-model.string="phoneNubmer"  @input="handleInput" maxlength="11" placeholder="请输入手机号"/>
			</view>
		</view>
		<view class="login-card">
			<view class="login-input-code">
				<view class="verify-left">
					<input type="number" placeholder-style="color:#BDC4CE" v-model="checkCode"  @input="handleInput"  maxlength="4" placeholder="请输入验证码"/>
				</view>
				<view class="verify-right">
					<view class="verify-btn" @click="getCheckCode">{{ codeTextShow == 0? codeText.getCode : (codeTextShow == 1 ? count + codeText.countDown : codeText.getAgain)}}</view>
				</view>
			</view>
		</view>
		<view class="login-btn">
			<button class="logining" type="primary" @click="userLogin">登录</button>
		</view>
		<view class="login-quick-way"><text @click="codeLogin">账号密码登录</text></view>
		<view class="login-privacy">
			<block>
				<view class="login-privacy-noagree" v-if="!isprivacy"></view>
				<!-- <image src="/static/img/common/btn_friend_choice.png" mode="" class="login-privacy-agree" v-else></image> -->
			</block>
			<view class="login-privacy-text">点击登录即同意我们的<text @click="useClause">「用户协议」</text>和<text @click="privacyClause">「隐私政策」</text></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				phoneNubmer: '',
				checkCode:'',
				userToken:'',
				expires_time:'',
				codeText :{
					getCode: '获取验证码',
					countDown: 's重新获取',
					getAgain: '重新获取'
				},
				disabled: false, //禁止按钮点击
				codeTextShow: 0,
				count: 59,
				isprivacy:true, // 隐私同意状态
			}
		},
		computed: {
			...mapState(['hasLogin', 'currentPage']),
		},
		methods: {
			...mapMutations(['login','logout']),
			// 用户协议
			useClause(){
				uni.navigateTo({
					url:'/pages/login/clause/clause?type=0'
				})
			},
			
			// 隐私条款
			privacyClause(){
				uni.navigateTo({
					url:'/pages/login/clause/clause?type=1'
				})
			},
			
			/*检查用户输入*/
			handleInput(e){
				let a = e.target.value.replace(/[^\d]/g,'')
			    if (!a) {
				    e.preventDefault();
				}else{
					this.phoneNubmer = a;
				}
				//console.log(this.phoneNubmer)
			},
			
			checkPhoneInput(){
				if (this.phoneNubmer == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不能为空'
				    });
				    return;
				}else{
					const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/ // 增加19开头的手机号码检测
					if(!reg.test(this.phoneNubmer)){
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '请输入正确的手机号'
						});
						return false;
					}
				}
				return true;
			},
			
			/*验证码校验*/
			codeCheck(){
				if (this.checkCode == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请输入验证码'
				    });
				    return;
				}
				return true;
			},
			
			//展示获取结果
			showgetCodeResult(res){
				console.log(res);
				if(res.data.code == 200){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '获取验证码成功'
					});
					console.log('返回的验证码为:',res.data.msg);
				}else if(res.data.msg){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: res.data.msg
					});
					return;
				}
			},
			
			/*获取验证码*/
			getCheckCode(){
				console.log('获取验证码手机号为:',this.phoneNubmer);
				if(!this.checkPhoneInput() || this.disabled){
					return;
				}
				this.codeTextShow = 1;
				this.disabled = true;
				this.$quickLogin.sendCode(showgetCodeResult);
				let interval = setInterval(() =>{
					--this.count
				},1000)
				setTimeout(() => {
					clearInterval(interval)
					this.count = 59
					this.codeTextShow = 2
					this.disabled = false
				},60000)
			},
			
			//保存用户信息
			saveUserInfo(res){
				let self = this;
				console.log('saveUserInfo res=',res)
				let status = res.data.code;
				let msg = res.data.msg;
				if(status !== 200 || !res.data.data){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: msg
					});
					return;
				}
				let token = res.data.token;
				if(!token){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '登录失败，请稍后重试'
					});
					return;
				}
				try{
					let userInfo = res.data.data.userInfo
					uni.setStorageSync('userInfo', userInfo);
					uni.setStorageSync('token',token);
					self.login(self.phoneNubmer);
					
					console.log('save token successself.userAccount:',self.phoneNubmer)
					//跳转首页
					uni.showToast({
						icon: 'success',
						position: 'bottom',
						title: '登录成功'
					});
					//跳转到当前页面
					if(this.currentPage == '/pages/index/index' || 'pages/chat/chat' || 'pages/server/server' || 'pages/userCenter/user_center')
					{
						uni.switchTab({
							url:this.currentPage
						})
					}
					else{
						uni.redirectTo({
							url:this.currentPage
						})
					}
				}catch(e){
					console.log('save token error:',e)
				}
			},
			
			/*用户登录*/
			userLogin(){
				console.log('登录手机号为:',this.phoneNubmer);
				console.log('hasLogin==',this.hasLogin)
				if(!this.checkPhoneInput() || !this.codeCheck()){
					return;
				}
				uni.setStorageSync('userPhone',this.phoneNubmer);  //保存用户号码，暂时先放这里
				let self = this;
				this.$quickLogin.loginCommon(this.phoneNubmer,this.passWord,self.saveUserInfo,1,1)
			},
			
			//账号密码登录
			codeLogin(){
				uni.navigateTo({
					url:"/pages/login/login_code",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			
			//打开授权页面
			navigateBack(){
				console.log('currentPage==',this.currentPage);
				// uni.switchTab({
				// 	url:"/pages/index/index",
				// 	animationType: 'pop-in',
				// 	animationDuration: 200
				// })
				//跳转到当前页面
				if(this.currentPage == '/pages/index/index' || 'pages/chat/chat' || 'pages/server/server' || 'pages/userCenter/user_center')
				{
					uni.switchTab({
						url:this.currentPage
					})
				}
				else{
					uni.redirectTo({
						url:this.currentPage
					})
				}
				this.$quickLogin.LoginAuth(this.saveUserInfo)
			}
		}
	}
</script>

<style scoped>
	.login{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.login-head{
		font-weight: bold;
		font-size: 68rpx;
		text-align: center;
		/* padding: 0rpx 171rpx 0rpx 171rpx; */
		color: #FFFFFF;
		margin-bottom: 12rpx;
	}
	
	.login-explain{
		font-weight:lighter;
		font-size: 22rpx;
		text-align: center;
		color: #FFFFFF;
		margin-bottom: 68rpx;
	}
	
	.login-header-img{
		display: flex;
		/* text-align:center; */
		/* align-items: center; */
		justify-content: center;
		margin-top: 180rpx;
		margin-bottom: 20rpx;
	}
	
	.login-header-img image{
		width: 160rpx;
		height: 160rpx;
		justify-content: center;
	}
	
	.login-back{
		width: 100%;
		position: fixed;
		top: 20rpx;
		left: 0;
	}
	
	.login-back-status{
		width: 100%;
		height: var(--status-bar-height);
	}
	
	.login-back-nav{
		width: 100%;
		padding: 25rpx 40rpx;
		box-sizing: border-box;
	}
	
	.login-back-nav-img{
		width: 28upx;
		height: 46upx;
	}
	
	.loginBg{
		width: 100%;
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: flex-end;
		box-sizing: border-box;
		background-size: cover; */
	}
	
	.loginBg image{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}
	
	.myMangerLogo-img{
		width: 264upx;
		height: 288upx;
		margin-bottom: 138upx;
	}
	
	.verify-btn{
		width: 160rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 28rpx;
		color: #BDC4CE;
		text-align: center;
		/* padding: 0 0 0 40rpx; */
		/* font-weight: 100; */
	}
	
	.verify-btn::after{
		border:none !important;
	}
	.verify-left{
		float: left;
		width: calc(100% - 184upx);
	}
	.verify-right{
		float: left;
		/* margin-right: 20rpx; */
	}
	.logining{
		font-size: 36rpx;
		width:654rpx;
		height:94upx;
		background:#FF9732;
		border-radius:10upx;
		text-align: center;
		line-height:88upx;
	}
	
	.login-btn{
		display: flex;
		justify-content: center;
		color: #fff;
		margin-top: 27rpx;
	}

	.login-input-phone{
		/* padding: 10upx 20upx; */
		overflow: auto;
		font-size: 28upx;
		height: 94rpx;
		line-height: 94upx;
		color: #fff;
		padding-left: 32rpx;
	}
	
	.login-input-phone input{
		font-size: 28upx;
		height: 90upx;
		line-height: 90upx;
		color: #000000;
		padding-left:32px;
		background-size: 36rpx 36rpx;
		background-image: url("/static/img/login/user_img.png");
		background-repeat: no-repeat;
		background-position:left;
		vertical-align:middle;
	}
	
	.login-input-code{
		overflow: auto;
		font-size: 28upx;
		height: 94rpx;
		line-height: 94upx;
		color: #fff;
		padding-left: 32rpx;
	}
	
	.login-input-code input{
		font-size: 28upx;
		height: 90upx;
		line-height: 90upx;
		color: #000000;
		padding-left:32px;
		background-size: 36rpx 36rpx;
		background-image: url("/static/img/login/password_img.png");
		background-repeat: no-repeat;
		background-position:left;
		vertical-align:middle;
	}
	
	
	.login-user-img{
		width: 36rpx;
		height: 36rpx;
		/* display: flex; */
	}
	
	.login-card{
		width: 654rpx;
		box-sizing: border-box;
		/* padding: 0 30upx 0 48rpx; */
		position: relative;
		background:#F9F9F9;
		border:1px solid rgba(255,255,255,0.3);
		border-radius:10upx;
		margin-bottom: 24upx;
		margin-left: 48upx;
	}
	.login-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(#FF978D, #FFBB69);
	}
	
	/* -----------新增--------------- */
	.login-privacy{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20upx;
		
	}
	.login-privacy-noagree{
		width: 32upx;
		height: 32upx;
		border: 1px solid #000000;
		border-radius: 50%;
	}
	.login-privacy-agree{
		width: 32upx;
		height: 32upx;
	}
	.login-privacy-text{
		font-size:22rpx;
		font-weight:400;
		color:rgba(192,193,195,1);
		margin-left: 10upx;
		margin-top: 454rpx;
		margin-bottom: 132rpx;
	}
	.login-privacy-text text{
		color: #FFB062;
	}
	.login-quick-way {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	
</style>
