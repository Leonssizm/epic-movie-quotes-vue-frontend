import { defineRule} from "vee-validate";
import { email, max, min, required } from "@vee-validate/rules";

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('engLetters', (value) => {
    if(!/^[a-zA-Z]+$/.test(value)) return false
    else return true
    
})

