const getters = {
  app_token: state => state.app.token,
  layout_sidebar_fold: state => state.layout.sidebar.fold,
  layout_sidebar_layoutSkin: state => state.layout.sidebar.layoutSkin,
  layout_navbar_layoutType: state => state.layout.navbar.layoutType,
  layout_menuStore: state => state.layout.menuStore,
  layout_menuActive: state => state.layout.menuActive,
  layout_tabActive: state => state.layout.tabActive,
  layout_tabs: state => state.layout.tabs,
  page_refresh: state => state.page.refresh,
  page_dynamicRoutes: state => state.page.dynamicRoutes,
  user_userInfo: state => state.user.userInfoStore
}
export default getters
