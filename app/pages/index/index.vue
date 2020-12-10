<template>
  <view class="content">
    <!-- <view v-if="hasLogin" class="hello">
			<view class="title">
				您好 {{userName}}，您已成功登录。
			</view>
			<view class="ul">
				<button @click="mapClick">搜索</button>
			</view>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</view>
		</view> -->

    <view class="header-box">
      <view class="nav-item">
        <view class="shoot">
          <image src="/static/img/personCenter/xj.png" mode=""></image>
        </view>
        <view class="cut">
          <view
            v-for="(item, index) in navList"
            :key="index"
            class="nav-items"
            :class="{ current: tabCurrentIndex === index }"
            @click="tabClick(index)"
          >
            {{ item.text }}
          </view>
        </view>
        <view class="add">
          <image src="/static/img/personCenter/fb.png" mode=""></image>
        </view>
      </view>
      <view class="search-box">
        <input class="ipt" type="text" value="" placeholder="自驾游" />
      </view>
    </view>

    <view class="up-box">
      <view class="info">
        <text class="title">猜你感兴趣Ta</text>
        <text class="all">查看全部 ></text>
      </view>
      <view class="slideshow">
        <scroll-view class="scroll-view_H" scroll-x="true">
          <view
            class="scroll-view-item_H"
            v-for="(huadong, index) in huadongs"
            :key="index"
          >
            <view>
              <image :src="huadong.offImg" mode=""></image>
            </view>
            <view>
              <image :src="huadong.img" mode=""></image>
            </view>
            <view>{{ huadong.name }}</view>
            <view>{{ huadong.info }}</view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: mapState(["forcedLogin", "hasLogin", "userName"]),

  data() {
    return {
      tabCurrentIndex: 0,
      navList: [
        {
          state: 0,
          text: "关注",
        },
        {
          state: 1,
          text: "发现",
        },
        {
          state: 2,
          text: "基地",
        },
      ],
      huadongs: [
        {
          img: "/static/img/personCenter/testHead.jpg",
          name: "玩车刚哥",
          info: "xxxxxxxx",
          offImg: "x",
        },
        {
          img: "/static/img/personCenter/testHead.jpg",
          name: "丹丹",
          info: "xxxxxxxx",
        },
        {
          img: "/static/img/personCenter/testHead.jpg",
          name: "舟舟",
          info: "xxxxxxxx",
        },
        {
          img: "/static/img/personCenter/testHead.jpg",
          name: "亮亮",
          info: "xxxxxxxx",
        },
        {
          img: "/static/img/personCenter/testHead.jpg",
          name: "舟舟",
          info: "xxxxxxxx",
        },
        {
          img: "/static/img/personCenter/testHead.jpg",
          name: "舟舟",
          info: "xxxxxxxx",
        },
      ],
    };
  },

  onLoad() {
    // this.login(18814308186)
    // if (!this.hasLogin) {
    // 	uni.showModal({
    // 		title: '未登录',
    // 		content: '您未登录，需要登录后才能继续',
    // 		/**
    // 		 * 如果需要强制登录，不显示取消按钮
    // 		 */
    // 		showCancel: !this.forcedLogin,
    // 		success: (res) => {
    // 			if (res.confirm) {
    // 				/**
    // 				 * 如果需要强制登录，使用reLaunch方式
    // 				 */
    // 				if (this.forcedLogin) {
    // 					uni.reLaunch({
    // 						url: '../login/login_phone'
    // 					});
    // 				} else {
    // 					uni.navigateTo({
    // 						url: '../login/login_quick'
    // 					});
    // 				}
    // 			}
    // 		}
    // 	});
    // }
  },
  computed: {
    ...mapState(["quickLoginInitStatus", "currentPage"]),
  },

  onLoad() {},

  methods: {
    ...mapMutations(["setQuickLoginInitStatus", "setcurrentPage"]),
    //去登录
    gotoLogin() {
      if (this.quickLoginInitStatus) {
        this.setcurrentPage("/pages/index/index");
        Vue.prototype.$quickLogin.LoginAuth(this.saveUserInfo);
      } else {
        uni.navigateTo({
          url: "../login/login_phone",
        });
      }
    },
    //保存用户信息
    saveUserInfo(res) {
      console.log("save userInfo===", res);
      //跳转到当前页面
      if (
        this.currentPage == "/pages/index/index" ||
        "pages/chat/chat" ||
        "pages/server/server" ||
        "pages/userCenter/user_center"
      ) {
        uni.switchTab({
          url: this.currentPage,
        });
      } else {
        uni.redirectTo({
          url: this.currentPage,
        });
      }
    },
    tabClick(index) {
      this.tabCurrentIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #efeef3;

  .header-box {
    width: 100%;
    height: 219upx;
    background-color: #ffffff;

    .nav-item {
      display: flex;
      height: 96upx;
      align-items: center;
      justify-content: space-around;

      .shoot {
        width: 36upx;
        height: 32upx;
        margin-bottom: 20upx;

        image {
          width: 36upx;
          height: 32upx;
        }
      }

      .cut {
        width: 456upx;
        height: 96upx;
        display: flex;
        padding: 0 5upx;
        background: #fff;
        position: relative;
        z-index: 10;
        margin-bottom: 0upx;

        .nav-items {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 36upx;
          position: relative;
          color: #8c9198;

          &.current {
            color: #06121e;
            font-weight: bold;
            font-size: 44upx;

            &:after {
              content: "";
              position: absolute;
              left: 50%;
              bottom: 5upx;
              transform: translateX(-50%);
              width: 32upx;
              height: 0upx;
              border-bottom: 6.27px solid #ff9732;
              -webkit-border-bottom-right-radius: 2upx;
            }
          }
        }
      }

      .add {
        width: 44upx;
        height: 46.02upx;

        image {
          width: 44upx;
          height: 46.02upx;
        }
      }
    }

    .search-box {
      width: 100%;
      height: 71upx;
      padding: 24upx 32upx;
      box-sizing: border-box;

      .ipt {
        width: 100%;
        height: 71upx;
        background: #f3f2f7 url(/static/img/personCenter/query.png) 32upx center
          no-repeat;
        background-size: 30upx 32upx;
        text-indent: 82upx;
        border-radius: 4upx;
      }
    }
  }

  .up-box {
    position: relative;
    top: 16upx;
    width: 100%;
    height: 582upx;
    background-color: #ffffff;

    .info {
      height: 95upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32upx;

      .title {
        color: #06121e;
        margin-top: 0;
        font-size: 32upx;
        font-weight: 600;
      }

      .all {
        color: #8c9198;
        font-size: 30upx;
      }
    }

    .slideshow {
      width: 100%;
      height: 487upx;

      .scroll-view_H {
        white-space: nowrap;
        width: 100%;
      }

      .scroll-view-item_H {
        display: inline-block;
        width: 280upx;
        height: 430upx;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.16);
        text-align: center;
        font-size: 36upx;
        margin: 25upx 1upx 25upx 32upx;
      }

      .scroll-view-item_H view {
        box-sizing: border-box;
      }

      .scroll-view-item_H view:nth-child(1) {
        width: 100%;
        height: 24px;
        margin-top: 22upx;
        //background-color: red;
      }

      .scroll-view-item_H view:nth-child(2) {
        width: 160upx;
        height: 160.75upx;
        margin: -12upx 60upx;
      }

      .scroll-view-item_H view:nth-child(2) image {
        width: 160upx;
        height: 160.75upx;
        border-radius: 80upx;
      }

      .scroll-view-item_H view:nth-child(3) {
        width: 100%;
        height: 50upx;
      }

      .scroll-view-item_H view:nth-child(4) {
        width: 100%;
        height: 50upx;
      }
    }
  }
}
</style>
