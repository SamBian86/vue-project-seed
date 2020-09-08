import { stringify, parse } from '@/utils/index'
import { getProjectName } from '@/utils'
const ProjectName = getProjectName()

const dictStoreKey = `${ProjectName}app.dictStore`
const permissionStoreKey = `${ProjectName}app.permissionStore`
const userInfoStoreKey = `${ProjectName}user.userInfoStore`
const menuStoreKey = `${ProjectName}layout.menuStore`
// const dynamicRoutesKey = 'page.menuStore'

// 获取字典storage数据
export function getDictStore() {
  return localStorage.getItem(dictStoreKey) === '' || localStorage.getItem(dictStoreKey) === null
    ? false
    : parse(localStorage.getItem(dictStoreKey))
}

// 保存字典storage数据
export function setDictStore(dictStore) {
  return localStorage.setItem(dictStoreKey, stringify(dictStore) || '')
}

// 获取授权storage数据
export function getPermissionStore() {
  return localStorage.getItem(permissionStoreKey) === '' || localStorage.getItem(permissionStoreKey) === null
    ? false
    : parse(localStorage.getItem(permissionStoreKey))
}

// 保存授权storage数据
export function setPermissionStore(permissionStore) {
  return localStorage.setItem(permissionStoreKey, stringify(permissionStore) || '')
}

// 获取用户信息storage数据
export function getUserInfoStore() {
  return localStorage.getItem(userInfoStoreKey) === '' || localStorage.getItem(userInfoStoreKey) === null
    ? false
    : parse(localStorage.getItem(userInfoStoreKey))
}

// 保存用户信息storage数据
export function setUserInfoStore(userInfoStore) {
  return localStorage.setItem(userInfoStoreKey, stringify(userInfoStore) || '')
}

// 获取菜单storage数据
export function getMenuStore() {
  return localStorage.getItem(menuStoreKey) === '' || localStorage.getItem(menuStoreKey) === null
    ? false
    : parse(localStorage.getItem(menuStoreKey))
}

// 保存菜单storage数据
export function setMenuStore(menuStore) {
  return localStorage.setItem(menuStoreKey, stringify(menuStore) || '')
}
