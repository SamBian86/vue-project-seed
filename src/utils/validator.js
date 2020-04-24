import { validateEmptyList } from './validate'

export function validateEmpty(rule, value, callback) {
  if (value && !validateEmptyList(value)) {
    callback(new Error('请填写必填项'))
  } else {
    callback()
  }
}
