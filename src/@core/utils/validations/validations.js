import { extend, localize } from 'vee-validate'
import {
  required as rule_required,
  email as rule_email,
  min as rule_min,
  confirmed as rule_confirmed,
  regex as rule_regex,
  between as rule_between,
  alpha as rule_alpha,
  integer as rule_integer,
  digits as rule_digits,
  alpha_dash as rule_alpha_dash,
  alpha_num as rule_alpha_num,
  length as rule_length,
  ext as rule_ext,
} from 'vee-validate/dist/rules'
import pt_BR from 'vee-validate/dist/locale/pt_BR.json'

// eslint-disable-next-line object-curly-newline
import { validatorPositive, validatorUrlValidator, validatorPassword, validatorCreditCard, validatorCNPJ, multipleOf1000, validatorCPF, validatorCnpjIsNotIncluded } from './validators'

// ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

export const required = extend('required', rule_required)

export const email = extend('email', rule_email)

export const min = extend('min', rule_min)

export const confirmed = extend('confirmed', rule_confirmed)

export const regex = extend('regex', rule_regex)

export const between = extend('between', rule_between)

export const alpha = extend('alpha', rule_alpha)

export const integer = extend('integer', rule_integer)

export const digits = extend('digits', rule_digits)

export const alphaDash = extend('alpha-dash', rule_alpha_dash)

export const alphaNum = extend('alpha-num', rule_alpha_num)

export const length = extend('length', rule_length)

export const  ext = extend('ext', rule_ext)

export const positive = extend('positive', {
  validate: validatorPositive,
  message: 'Please enter positive number!',
})

export const credit = extend('credit-card', {
  validate: validatorCreditCard,
  message: 'It is not valid credit card!',
})

export const password = extend('password', {
  validate: validatorPassword,
  message: 'Your {_field_} must contain at least one uppercase, one lowercase, one special character and one digit',
})

export const url = extend('url', {
  validate: validatorUrlValidator,
  message: 'URL is invalid',
})

export const cnpj = extend('cnpj', {
  validate: validatorCNPJ,
  message: 'CNPJ inválido',
})

export const cpf = extend('cpf', {
  validate: validatorCPF,
  message: 'CPF inválido',
})

export const multiple1000 = extend('multipleOf1000', {
  validate: multipleOf1000,
  message: 'Deve ser multiplo de 1000',
})

export const cnpjIsNotIncluded = extend('cnpjIsNotIncluded', {
    validate: validatorCnpjIsNotIncluded,
    message: 'CNPJ já cadastrado!',
})

localize({'pt_BR': pt_BR})
