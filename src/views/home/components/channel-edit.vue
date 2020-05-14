<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div
        slot="title"
        class="channel-title"
      >我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(index)"
      />
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <div
        slot="title"
        class="channel-title"
      >频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->

  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
      allChannels: [],
      isEdit: false // 控制编辑的显示状态
    }
  },
  computed: {
    // 推荐的频道列表
    recommendChannels () {
      // 所有频道 - 我的频道 = 推荐频道
      // filter 方法 过滤数组, 根据方法返回的布尔值 true 来收集数据
      // filter 查找满足元素的所有元素
      return this.allChannels.filter(channel => {
        // 判断 channel 是否属于用户频道
        // find 方法查找满足元素的单个元素
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },

    onAdd (channel) {
      this.userChannels.push(channel)
    },

    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态, 执行删除
        this.deleteChannel(index)
      } else {
        // 非编辑状态, 切换频道, 关闭弹出层
        this.switchChannel(index)
      }
    },

    deleteChannel (index) {
      // 从 index 开始, 删除一个, 包括 index 本身
      this.userChannels.splice(index, 1)
      // 数据持久化
    },

    switchChannel (index) {
      console.log('切换')
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding-top: 54px;

  .channel-title {
    font-size: 16px;
    color: #333;
  }

  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      position: relative;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
      .van-grid-item__icon {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 20px;
        color: #cccccc;
      }
    }
  }
}
</style>
