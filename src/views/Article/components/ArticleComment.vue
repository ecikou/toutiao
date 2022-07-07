<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item,index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show',$event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    source: {
      type: [Number, String],
      required: true

    },
    commentList: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res)
        if (res.data.data.results.length === 0) {
          this.loading = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
