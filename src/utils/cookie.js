import Cookies from 'js-cookie'

const TokenKey = 'token'
const languageKey = 'language'
const projectKey = 'projectId'
const tenantCodeKey = 'tenantCode'
const systemTypeKey = 'systemType'

export function getToken() {
  return Cookies.get(TokenKey) || ''
}

export function setToken(token) {
  return Cookies.set(TokenKey, token || '')
}

export function getLanguage() {
  return Cookies.get(languageKey) || 'zh-CN'
}

export function setLanguage(language) {
  return Cookies.set(languageKey, language || 'zh-CN')
}

export function getProjectId() {
  return Cookies.get(projectKey) || ''
}

export function setProjectId(projectId) {
  return Cookies.set(projectKey, projectId || '')
}

export function getTenantCode() {
  return Cookies.get(tenantCodeKey) || ''
}

export function setTenantCode(tenantCode) {
  return Cookies.set(tenantCodeKey, tenantCode || '')
}

export function getSystemType() {
  return Cookies.get(systemTypeKey) || ''
}

export function setSystemType(type) {
  return Cookies.set(systemTypeKey, type || '')
}
