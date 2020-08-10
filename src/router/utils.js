import { Layout, dynamicRouterMap } from '@/router'
import { getSystemType } from '@/utils/cookie'
import router from '@/router'

// 判断调转到哪个登录页面
export function goToLogin(redirect) {
  const path = getSystemType() === 'platform' ? '/platform' : '/login'
  return redirect ? `${path}?redirect=${redirect}` : path
}

// 添加动态路由
export function addRoutes(dynamicRoutes) {
  router.addRoutes([
    {
      path: '/dynamic_routes',
      name: 'dynamic_routes',
      component: Layout,
      children: dynamicRoutes
    },
    ...dynamicRouterMap
  ])
  // console.log('添加动态路由成功')
}

// 生成路由
export function generateDynamicRoutes(menus) {
  let dynamicRoutes = []
  menus.map((item, index) => {
    if (item.children.length !== 0) {
      item.children.map((ite, idx) => {
        // if (idx !== 0) {
        //   return false
        // }
        ite.url = ite.url ? ite.url : ''
        const isIframeURL = /{{([^}}]+)?}}/g.test(ite.url)
        const iframeURL = ite.url.replace(/{{([^}}]+)?}}/g, process.env.VUE_APP_API_URL)
        if (ite.url) {
          const route = {
            path: !isIframeURL ? `/${ite.url}` : `/i-${ite.id}`,
            name: !isIframeURL ? ite.url.replace(/\//g, '_') : `i-${ite.id}`,
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
            // console.log(`@/views/modules/${ite.url}`)
            route.component = () => import(`@/views/modules/${ite.url}`)
          }
          dynamicRoutes.push(route)
        } else if (ite.children.length !== 0) {
          const routes = generateDynamicRoutes([ite])
          dynamicRoutes = dynamicRoutes.concat(routes)
        } else {
          // console.log('完成')
        }
      })
    }
  })
  return dynamicRoutes
}
