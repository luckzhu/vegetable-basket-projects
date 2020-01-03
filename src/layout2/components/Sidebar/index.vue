<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in currentRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      currentRoutes: []
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),

    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    //检测路由变化切换侧边栏内容
    '$route.matched': {
      handler(matched) {
        let matchedPath
        if (matched.length > 0) {
          if (matched[0].path !== '') {
            matchedPath = matched[0].path
          } else {
            matchedPath = matched[1].path
          }
          console.log({matchedPath})
          const _routes = this.permission_routes.filter(route => route.path === matchedPath)
          this.currentRoutes = _routes.length > 0 ? _routes[0].children : []
          console.log( this.currentRoutes)
          console.log(matched)
        }
      },
      immediate: true
    }
  }
}
</script>
