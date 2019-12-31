import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取 token

NProgress.configure({ showSpinner: false }) //关闭加载旋转器，默认为 true { easing: 'ease', speed: 500 }

const whiteList = ['/login', '/auth-redirect'] // 不需要重定向的白名单路由

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()

  // set page title
  document.title = '后台管理系统'

  // 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否通过 getInfo 获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 注意: roles 必须是一个数组!例如:['admin']或，['developer'，'editor']
          console.log(11)
          const { roles } = await store.dispatch('user/getInfo')
          console.log(22)
          // 根据角色生成可访问的路由表（routes map）
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // 确保 addRoutes 已完成
          // 设置 replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除 token，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有 token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在登录白名单，直接跳转
      next()
    } else {
      // 没有访问权限的其他页面，则被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
