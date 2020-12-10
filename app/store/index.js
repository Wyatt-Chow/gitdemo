import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		userAccount:"",
		userPhone:"",
		hasLogin: false,
		quickLoginInitStatus:false, //一键登录初始化状态
		loginProvider: "", // 用户名或其他唯一值
		nickname: "", // 昵称
		signature: "", // 签名
		avatar: "/static/img/common/face.jpg", // 头像
		gender: "", // 性别，0未知，1男，2女
		loginStateChanged: {}, // 登录状态变更
		// 个人中心信息
		userCenterInfo:{},
		//当前页面地址
		currentPage:'pages/index/index'
	},
	mutations: {
		login(state, userAccount) {
			state.userAccount = userAccount || '新用户';
			state.hasLogin = true;
		},

		logout(state) {
			uni.removeStorageSync('token');
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('userPhone');
			state.hasLogin = false;
			state.avatar = "/static/img/common/face.jpg"
		},
		// 赋值登录名或唯一登录值
		setLoginProvider(state, val) {
			state.loginProvider = val
		},
		
		//赋值一键登录初始化状态
		setQuickLoginInitStatus(state, val){
			state.quickLoginInitStatus = val
		},
		// 赋值昵称
		setNickname(state, val) {
			// console.log("setNickname：" + val);
			state.nickname = val
		},
		// 赋值性别
		setGender(state, val) {
			state.gender = val
		},
		// 赋值个人签名
		setSignature(state, val) {
			state.signature = val
		},
		// 赋值头像
		setAvatar(state, val) {
			state.avatar = val
		},
		// 用户登录状态
		setLoginStateChanged(state, param) {
			state.loginStateChanged = param;
		},
		//赋值当前页面地址
		setcurrentPage(state,param){
			state.currentPage = param;
		}
	},
	actions: {},
})

export default store
