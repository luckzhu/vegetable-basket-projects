<template>
  <div class="navbar">
    <div class="left-info">
      <p class="title">农业数据统一平台</p>
    </div>
    <div class="right-menu">
      <span style="display:block;" @click="logout">退出登录</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  .left-info {
    .title {
      text-align: center;
      font-weight: 600;
      font-size: 18px;
      line-height: 18px;
      color: #198f9a;
      width: 210px;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
    &:focus {
      outline: none;
    }
  }
}
</style>
