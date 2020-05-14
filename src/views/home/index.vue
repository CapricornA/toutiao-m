<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="samll"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
      <div
        slot="nav-right"
        class="wap-nav-palceholder"
      ></div>
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- /文章频道列表 -->

    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%"
    >
      <channel-edit />
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/aritcle-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'HomeIndex',
  props: {},
  components: {
    ArticleList,
    ChannelEdit

  },
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [],
      isChannelEditShow: false // 控制弹出层的默认状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      // 请求获取标签数据
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }

  /deep/ .van-tabs__nav {
    margin-right: 33px;
  }

  .wap-nav-palceholder {
    width: 33px;
    flex-shrink: 0;
  }

  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background-color: #fff;
    opacity: .9;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon {
      font-size: 20x;
    }
    &::before {
      content: '';
      width: 1px;
      height: 43px;
      background: url("./line.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
