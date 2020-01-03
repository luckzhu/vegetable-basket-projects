import Layout from '@/layout2'

const adminRouter = [
  {
    path: '/storage',
    component: Layout,
    redirect: '/storage/test1',
    name: 'Storage',
    headerMenu: true,
    meta: { title: '管理项目' },
    children: [
      {
        path: '/storage/test1',
        component: () => import('@/views/test/test1'),
        name: 'StorageTest1',
        meta: { title: '基地管理' }
      },
      {
        path: '/storage/test2',
        component: () => import('@/views/test/test2'),
        name: 'StorageTest2',
        meta: { title: '大事记管理' }
      },
      {
        path: '/storage/test3',
        redirect: 'storage/test3/test3-1',
        name: 'StorageTest3',
        meta: { title: '消息平台' },
        children: [
          {
            path: 'test3-1',
            component: () => import('@/views/test/test3'),
            name: 'StorageTest3-1',
            meta: { title: '新建消息' }
          },
          {
            path: 'test3-2',
            component: () => import('@/views/test/test3'),
            name: 'StorageTest3-2',
            meta: { title: '收到消息' }
          }
        ]
      }
    ]
  },
  {
    path: '/analyze',
    component: Layout,
    redirect: '/analyze/test1',
    name: 'Analyze',
    headerMenu: true,
    meta: { title: '数据分析' },
    children: [
      {
        path: '/analyze/test1',
        component: () => import('@/views/test/test1'),
        name: 'StorageTest1',
        meta: { title: '分析文字材料管理' }
      },
      {
        path: '/analyze/test2',
        component: () => import('@/views/test/test2'),
        name: 'StorageTest2',
        meta: { title: '数据分析' }
      },
      {
        path: '/analyze/test3',
        redirect: 'storage/test3/test3-1',
        name: 'StorageTest3',
        meta: { title: '监测点管理' },
        children: [
          {
            path: 'test3-1',
            component: () => import('@/views/test/test3'),
            name: 'StorageTest3-1',
            meta: { title: '生产基地' }
          },
          {
            path: 'test3-2',
            component: () => import('@/views/test/test3'),
            name: 'StorageTest3-2',
            meta: { title: '批发市场' }
          },
          {
            path: 'test3-3',
            component: () => import('@/views/test/test3'),
            name: 'StorageTest3-3',
            meta: { title: '冷链仓储基地' }
          },
          {
            path: 'test3-4',
            component: () => import('@/views/test/test3'),
            name: 'StorageTest3-4',
            meta: { title: '调查县' }
          }
        ]
      }
    ]
  }
]

export default adminRouter
