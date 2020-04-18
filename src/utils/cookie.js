import Cookies from 'js-cookie'

const TokenKey = 'token'
const languageKey = 'language'

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
