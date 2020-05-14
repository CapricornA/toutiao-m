<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div slot="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
      >编辑</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
    <!-- /频道推荐 -->

  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding-top: 54px;
}
</style>
