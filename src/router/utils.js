import { Layout, staticRouterMap } from '@/router'
import router from '@/router'
import { getMenuStore } from '@/utils/localStorage'

// 生成路由
export function generateDynamicRoutes(menus) {
  const dynamicRoutes = []
  menus.map((item, index) => {
    if (item.children.length !== 0 && index === 0) {
      item.children.map((ite, idx) => {
        if (idx !== 0) {
          return false
        }
        const isIframeURL = /{{([^}}]+)?}}/g.test(ite.url)
        const iframeURL = (ite.url || '').replace(
          /{{([^}}]+)?}}/g,
          process.env.VUE_APP_API_URL
        )
        const route = {
          path: !isIframeURL ? `/${ite.url}` : `/i-${ite.id}`,
          name: !isIframeURL ? ite.url.replace(/\//g, '-') : `i-${ite.id}`,
          meta: {
            name: ite.name,
            title: ite.name,
            params: {},
            query: {},
            isTab: true,
            iframeURL: !isIframeURL ? '' : iframeURL,
            menuId: ite.id,
            menuIndex: index
          }
        }

        if (!isIframeURL) {
          console.log(`@/views/modules/${ite.url}`)
          route.component = () => import(`@/views/modules/${ite.url}`)
        }

        dynamicRoutes.push(route)
      })
    }
  })
  return dynamicRoutes
}

// 添加动态路由
export function addRoutes(dynamicRoutes) {
  router.addRoutes([
    {
      path: '/dynamic_routes',
      name: 'dynamic_routes',
      component: Layout,
      children: dynamicRoutes
    }
  ])
  console.log('添加动态路由成功')
}

// 用于刷新的时候添加所有路由
export function addAllRoutes() {
  const menus = getMenuStore()
  if (menus) {
    const dynamicRoutes = generateDynamicRoutes(menus)
    const allRouters = [
      ...staticRouterMap,
      {
        path: '/dynamic_routes',
        name: 'dynamic_routes',
        component: Layout,
        children: dynamicRoutes
      }
    ]
    router.addRoutes(allRouters)
    console.log('添加所有动态路由成功')
  } else {
    console.log('storage中没有菜单数据')
  }
}
