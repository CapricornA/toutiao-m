<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="登录 / 注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      :validate-first="true"
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        label="手机号"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        cneter
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        label="验证码"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 30"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
          v-else
            class="send-btn"
            size="small"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info"
          block
        >登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->

  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false, // 控制倒计时和发送按钮显示状态
      isSendSmsLoading: false // 发送验证码按钮的 loading 状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长, 为 0 时 Toast 不会消失
      })
      // 1. 找到数据接口
      // 2. 封装请求方法
      // 3. 请求调用登录
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态 (token等数据) 放到 Vuex 容器中
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败, 请校验手机号和验证码')
      }
    },

    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },

    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过, 请求发送验证码
        await sendSms(this.user.mobile)
        this.isSendSmsLoading = true // 展示按钮的 loading 状态
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.statue === 429) {
          message = '发送太频繁了, 请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败, 请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }

      // 关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  .send-btn {
    width: 80px;
    height: 25px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
