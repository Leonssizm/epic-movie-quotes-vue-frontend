import { defineRule } from 'vee-validate'
import { email, max, min, required, confirmed } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('engLetters', (value) => {
  return /^[a-zA-Z0-9?!-_.,;'"() ]+$/.test(value)
})
defineRule('geoLetters', (value) => {
  return /^[ა-ჰ0-9?!-_.,;'"() ]+$/.test(value)
})
defineRule('password', (value) => {
  return /^[a-z]+[0-9]+$/.test(value) && value.length >= 8
})
defineRule('confirmed', confirmed)
