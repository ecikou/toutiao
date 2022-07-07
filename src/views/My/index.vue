<template>
  <div>
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button" @click="$router.push('/user')">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>

    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>

    <van-grid column-num="2">
      <van-grid-item class="toutiao" icon="star-o" text="收藏" />
      <van-grid-item class="toutiao" icon="underway-o" text="历史" />
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link url="" />
      <van-cell title="小智同学" is-link url="" />
    </van-cell-group>
    <van-button
      class="logout"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出登录吗？' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  height: 401px;
  background: url("~@/assets/banner.png") no-repeat;
  background-size: cover;

  justify-content: center;
  align-items: center;
}

.header-notlogin {
  display: flex;
  img {
    width: 132px;
    height: 132px;

    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    color: #fff;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
}
.header-login {
  padding-top: 116px;
  justify-content: space-between;

  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 115px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #fff;
      border-radius: 16px;
      font-size: 20px;
      color: #666666;
      font-weight: 400;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        color: #fff;
        font-weight: 400;
      }
    }
  }
}
.list {
  display: flex;
  li {
    flex: 1;
    text-align: center;
    p {
      color: #fff;
      text-align: center;
      &:nth-child(1) {
        font-size: 36px;
        color: #fff;
        font-weight: 400;
      }
      &:nth-child(2) {
        font-size: 23px;
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 0px 0;
}
.logout {
  color: #d86262;
}
</style>
