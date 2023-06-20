<template>
  <div class="mt-4 pb-4 lg:w-[49rem] h-full mb-36">
    <div class="flex text-[#FFFFFF] text-2xl">
      <h1 class="mt-10 hidden lg:block">My Profile</h1>
      <RouterLink to="/home" class="block lg:hidden"
        ><IconArrowBack class="ml-4 w-5 h-5"
      /></RouterLink>
    </div>
    <Form @submit="editUserInformation">
      <div
        class="flex items-center justify-center flex-col mt-6 lg:mt-36 bg-[#24222F] lg:bg-[#11101A]"
      >
        <img
          :src="
            profilePicture.includes('base64')
              ? profilePicture
              : profilePicture.includes('http')
              ? profilePicture
              : 'http://127.0.0.1:8000/storage/' + profilePicture
          "
          alt="profile-picture"
          class="rounded-full h-52 w-52 object-cover lg:absolute lg:top-1/3 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-0"
        />
        <div class="lg:bg-[#11101A] lg:w-11/12 flex flex-col lg:mb-10 mb-0">
          <label
            class="flex lg:mt-40 ml-4 mt-4 lg:ml-0 justify-center mr-[2.2rem] text-[#FFFFFF] font-helvetica-neue"
          >
            Upload new photo
            <input type="file" class="hidden" @change="handleProfilePictureChange" />
          </label>
          <div class="flex flex-col">
            <label class="pb-2 font-helvetica-neue lg:ml-44 mt-16">Username</label>
            <div class="flex justify-center">
              <UsernameInput v-model="username" />
              <button
                @click="displayNewUsernameInput = !displayNewUsernameInput"
                class="font-helvetica-neue font-normal text-base leading-6 text-gray-400 mb-4 lg:ml-4 border-b-2 bg-[#24222F] lg:border-0 lg:bg-[#11101A]"
                type="button"
              >
                Edit
              </button>
            </div>
          </div>
          <NewUsernameInput v-if="displayNewUsernameInput" v-model="newUsername" />
          <EmailInput v-model="email" />
          <div class="flex flex-col">
            <label class="pb-2 font-helvetica-neue lg:ml-44">Password</label>
            <div class="flex justify-center">
              <PasswordInput v-model="password" :disabled="isGoogleUser" />
              <button
                class="font-helvetica-neue font-normal text-base leading-6 text-gray-400 mb-4 lg:ml-4 border-b-2 bg-[#24222F] lg:border-0 lg:bg-[#11101A]"
                :disabled="isGoogleUser"
                @click="displayNewPasswordInput = !displayNewPasswordInput"
                type="button"
              >
                Edit
              </button>
            </div>
            <PasswordRulesBanner v-if="displayNewPasswordInput" />
          </div>
          <NewPasswordInput class="lg:mr-10" v-if="displayNewPasswordInput" v-model="newPassword" />
          <NewPasswordConfirmationInput
            class="mr-10"
            v-if="displayNewPasswordInput"
            v-model="newPasswordConfirmation"
          />
        </div>
      </div>
      <div class="flex items-center justify-end mt-10">
        <RouterLink to="/home" class="mr-3">Cancel</RouterLink>
        <button
          class="ml-2 w-28 h-8 lg:w-28 lg:h-10 bg-red-600 border border-red-500 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221]"
          type="submit"
        >
          Save Changes
        </button>
      </div>
    </Form>
  </div>
</template>
<script setup>
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import UsernameInput from '@/components/home/userProfile/inputs/UserProfileUsernameInput.vue'
import EmailInput from '@/components/home/userProfile/inputs/UserProfileEmailInput.vue'
import PasswordInput from '@/components/home/userProfile/inputs/UserProfilePasswordInput.vue'
import NewUsernameInput from '@/components/home/userProfile/inputs/UserProfileNewUsernameInput.vue'
import NewPasswordInput from '@/components/home/userProfile/inputs/UserProfileNewPasswordInput.vue'
import PasswordRulesBanner from '@/components/home/userProfile/inputs/UserProfilePasswordRules.vue'
import NewPasswordConfirmationInput from '@/components/home/userProfile/inputs/UserProfileNewPasswordConfirmationInput.vue'
import { ref, provide } from 'vue'
import { Form } from 'vee-validate'
import { getAuthenticatedUser } from '@/services/api.js'
import axios from '@/plugins/axios/index.js'

let username = ref('')
let profilePicture = ref('')
let email = ref('')
let password = ref('password')

let newUsername = ref('')
let newPassword = ref('')
let newPasswordConfirmation = ref('')

let isGoogleUser = ref(false)
let displayNewUsernameInput = ref(false)
let displayNewPasswordInput = ref(false)

provide('newUsername', newUsername)
provide('newPassword', newPassword)
provide('newPasswordConfirmation', newPasswordConfirmation)
provide('username', username)
provide('email', email)
provide('password', password)

getAuthenticatedUser().then((response) => {
  username.value = response.data.username
  profilePicture.value = response.data.profile_picture
  email.value = response.data.email
  if (response.data.google_id) {
    isGoogleUser.value = true
  }
})

function handleProfilePictureChange(event) {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    profilePicture.value = reader.result
  }

  if (file) {
    reader.readAsDataURL(file)
  }
}

function editUserInformation() {
  let formData = new FormData()

  if (newUsername.value) {
    formData.append('new_username', newUsername.value)
  }
  if (newPassword.value) {
    formData.append('new_password', newPassword.value)
    formData.append('password_confirmation', newPasswordConfirmation.value)
  }
  if (profilePicture.value && profilePicture.value.includes('base64')) {
    let binary = atob(profilePicture.value.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let file = new Blob([new Uint8Array(array)], {
      type: 'image/jpeg'
    })
    formData.append('profile_picture', file)
  }

  axios.post('edit/user/' + localStorage.getItem('authUserId'), formData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}
</script>
