<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      list: [], // 数据列表
      loading: false, // 控制加载中的 loading 状态
      finished: false // 控制加载结束的状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      console.log(data)
      // 2. 把数据放到 list 数组中
      // 3. 设置本次加载状态结束, 它才可以判断是否需要加载下一次
      // 4. 数据全部加载完成
    }
  }
}
</script>

<style lang='less' scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
