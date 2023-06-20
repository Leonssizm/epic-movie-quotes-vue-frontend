import { configure } from 'vee-validate'
// import { localize, setLocale } from "@vee-validate/i18n";
import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: 'This field is required',
        email: 'This input is not in email format',
        min: '{field} must have at least 0:{min} symbols',
        max: '{field} must not be longer than 0:{min} symbols',
        alpha_dash: '{field} must contain only numbers or symbols',
        engLetters: '{field} should contain only English letters',
        password: '{field} should contain lowercase letters and numbers',
        confirmed: '{field} does not match the password'
      },
      names: {
        newUsername: 'new username'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეავსოთ მოცემული ველი',
        email: 'თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს',
        min: '{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს',
        max: '{field} არ უნდა შეიცავდეს 0:{min} სიმბოლოზე მეტს',
        alpha_dash: '{field} უნდა შეიცავდეს მხოლოდ რიცხვებს ან სიმბოლოებს',
        engLetters: '{field} უნდა შეიცავდეს მხოლოდ ლათინურ ასოებს',
        password: '{field} უნდა შეიცავდეს დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს',
        confirmed: '{field} არ ემთხვევა ძირითად პაროლს'
      },
      names: {
        name: 'სახელი',
        password: 'პაროლი',
        username: 'მომხმარებლის სახელი',
        email: 'მეილი',
        confirm_password: 'განმეორებული პაროლი',
        newUsername: 'ახალი სახელი'
      }
    }
  })
})

setLocale('ka')
