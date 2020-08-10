import { validateEmptyList, validateMobileNumber, validateEmailAddress, validatePrice, validateIDCardNumber } from './validate'
import i18n from '../i18n'

export function validateEmpty(rule, value, callback) {
  if (value && !validateEmptyList(value)) {
    callback(new Error(i18n.t('validate.required')))
  } else {
    callback()
  }
}

export function validateMobile(rule, value, callback) {
  if (value && !validateMobileNumber(value)) {
    callback(new Error(i18n.t('validate.format', { attr: i18n.t('validate.format_mobile') })))
  } else {
    callback()
  }
}

export function validateEmail(rule, value, callback) {
  if (value && !validateEmailAddress(value)) {
    callback(new Error(i18n.t('validate.format', { attr: i18n.t('user.email') })))
  } else {
    callback()
  }
}

export function validateContractUnivalence(rule, value, callback) {
  if (value && !validatePrice(value)) {
    callback(new Error(i18n.t('validate.format', { attr: i18n.t('contract.contractUnivalence') })))
  } else {
    callback()
  }
}

export function validateIDCard(rule, value, callback) {
  if (value && !validateIDCardNumber(value)) {
    callback(new Error(i18n.t('validate.format', { attr: i18n.t('communityResident.idCard') })))
  } else {
    callback()
  }
}
