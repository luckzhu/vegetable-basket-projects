<template>
  <div class="navbar">
    <div class="left-info">
      <p class="title">农业数据统一平台</p>
    </div>
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item v-for="item in headerMenu" :key="item.path" :index="resolvePath(item.path)">{{ item.meta.title }}</el-menu-item>
    </el-menu>
    <div class="right-menu">
      <span style="display:block;" @click="logout">退出登录</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'

export default {
  data() {
    return {
      headerMenu: []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'permission_routes'])
  },
  mounted() {
    this.filterHeaderMenu(this.permission_routes)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    filterHeaderMenu(routes) {
      routes.forEach(route => {
        if (route.headerMenu && !this.headerMenu.includes(route)) {
          this.headerMenu.push(route)
        }
        if (route.children) {
          this.filterHeaderMenu(route.children)
        }
      })
    },
    resolvePath(routePath) {
      return path.resolve('/', routePath)
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
