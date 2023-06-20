import { defineRule } from 'vee-validate'
import { email, max, min, required, confirmed } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('engLetters', (value) => {
  return /^[a-zA-Z]+$/.test(value)
})
defineRule('password', (value) => {
  return /^[a-z]+[0-9]+$/.test(value) && value.length >= 8
})
defineRule('confirmed', confirmed)
