<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '请输入正确的手机号',
          },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        type="current-password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的6位验证码' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            @click="onSendSms"
            v-else
            native-type="button"
            size="small"
            class="yzm"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '15990163150', // 手机号
      code: '246810', // 短信验证码
      time: 10 * 1000, // 倒计时时间
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.from.validate('mobile')
        console.log('发送成功')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log('校验失败')
        this.$toast.fail('手机格式错误')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 60px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #ffffff;
  font-size: 30px;
}
// .van-count-down {
//   position:fixed;
//   right:18px;
// }
// .yzm {
//   position:fixed;
//   right:10px;
// }
</style>
