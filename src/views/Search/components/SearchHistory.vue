<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelete">
        <span @click="$store.commit('clearHistory')">全部删除</span>&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDelete = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="item in searchHistoryList"
      :key="item.index"
      @click="$emit('search', item)"
    >
      <van-icon
        v-if="isDelete"
        name="close"
        @click.stop="$store.commit('delHistory')"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  computed: {
    ...mapState([
      'searchHistoryList'
    ])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
