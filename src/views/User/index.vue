<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" @click="inputShow" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="profile.photo"
        width="0.9rem"
        height="0.9rem"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="profile.name"
      @click="isNameShow = true"
      is-link
    />
    <van-cell
      title="性别"
      :value="profile.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isBirthdayShow = true"
      :value="profile.birthday"
      is-link
    />
    <van-popup position="bottom" style="height: 100%" v-model="isNameShow">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameShow"
      />
      <van-field
        :value="profile.name"
        @input="name = $event"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- 生日切换 -->
    <van-popup position="bottom" v-model="isBirthdayShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </van-popup>
    <input
      type="file"
      id="file"
      style="display: none"
      accept="image/jepg,image/png,image/gif,image/bmp,image/jpeg"
      ref="file"
      @change="onChange"
    />
    <van-popup position="bottom" v-model="isAvatarShow" style="height: 100%">
      <UpdateAvatar :img-src.sync="imgSrc" @close="isAvatarShow = false"></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfile, updateUserProfile } from '@/api/user'
export default {
  created () {
    this.getUserProfile()
  },
  data () {
    return {
      profile: {},
      isNameShow: false,
      name: '',
      isBirthdayShow: false,
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2025, 10, 1),
      brithday1: '',
      isAvatarShow: false,
      imgSrc: ''
    }
  },
  methods: {
    async getUserProfile () {
      try {
        const res = await getUserProfile()
        console.log(res)
        this.profile = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    onNameCancel () {
      this.isNameShow = false
    },
    async onNameShow () {
      await this.save()
      this.profile.name = this.name
      this.isNameShow = false
    },
    async save () {
      try {
        const res = await updateUserProfile(this.profile)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm () {
      this.profile.birthday = this.brithday1
      this.save()
      this.isBirthdayShow = false
    },
    inputShow () {
      this.$refs.file.click()
    },
    onChange () {
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(url)
      this.imgSrc = url
      this.isAvatarShow = true
    }
  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.profile.birthday)
      },
      set (newVal) {
        this.brithday1 = newVal.getFullYear() + '-' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    UpdateAvatar
  }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__text {
  color: #fff;
}
</style>
