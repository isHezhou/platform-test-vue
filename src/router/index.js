import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/_login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/_home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/testEntity',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '普通菜单',
        component: () => import('@/views/platofrmTest11/testEntity'),
        meta: { title: '普通菜单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/theOrder',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '订单菜单',
        component: () => import('@/views/platofrmTest11/theOrder'),
        meta: { title: '订单菜单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/logisticsEntity',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '物流菜单',
        component: () => import('@/views/platofrmTest11/logisticsEntity'),
        meta: { title: '物流菜单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/treeEntity',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '树形菜单',
        component: () => import('@/views/platofrmTest11/treeEntity'),
        meta: { title: '树形菜单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/workflowEntity1',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '普通工作流菜单',
        component: () => import('@/views/platofrmTest11/workflowEntity1'),
        meta: { title: '普通工作流菜单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/treeEntity1',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '树形工作流菜单',
        component: () => import('@/views/platofrmTest11/treeEntity1'),
        meta: { title: '树形工作流菜单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/approvalEntity',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '普通审批菜单',
        component: () => import('@/views/platofrmTest11/approvalEntity'),
        meta: { title: '普通审批菜单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/approvalEntity2',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '树形审批菜单',
        component: () => import('@/views/platofrmTest11/approvalEntity2'),
        meta: { title: '树形审批菜单管理', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
