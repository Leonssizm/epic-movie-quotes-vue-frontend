<template>
  <div
    class="relative bg-transparent border rounded border-gray-500 lg:w-[56rem] h-[3rem] w-[22rem] mt-8 lg:ml-8 ml-1"
  >
    <div v-for="choice in genres" :key="choice.id" class="flex ml-2 mt-2 float-left relative z-10">
      <span v-if="locale === 'en'" class="p-1 bg-gray-600 text-white">
        {{ choice.name.en }}
      </span>
      <span v-if="locale === 'ka'" class="px-2 py-1 bg-gray-600 text-white">
        {{ choice.name.ka }}
      </span>
      <button class="bg-gray-600 text-white pr-1" @click="removeChoice(choice)">X</button>
    </div>

    <div class="relative">
      <p
        class="text-white ml-1"
        :class="{
          hidden: genres.length !== 0
        }"
      >
        Genres
      </p>
      <Field
        as="select"
        v-model="selectedGenre"
        class="h-7 w-full h-full bg-transparent text-black"
        @change="selectGenre(selectedGenre)"
        v-if="locale === 'en'"
        name="select"
        rules="required"
      >
        <option v-for="genre in genresStore.genres" :value="genre" :key="genre.id">
          {{ genre.name.en }}
        </option>
      </Field>

      <Field
        as="select"
        v-model="selectedGenre"
        @change="selectGenre(selectedGenre)"
        class="h-7 w-full h-full bg-transparent text-black"
        v-else
        name="select"
        rules="required"
      >
        <option v-for="genre in genresStore.genres" :value="genre" :key="genre.id">
          {{ genre.name.ka }}
        </option>
      </Field>
      <ErrorMessage name="select" class="text-red-500" />
    </div>
  </div>
</template>
<script setup>
import { useGenresStore } from '@/stores/useGenresStore'
import { onMounted, ref, provide, watchEffect, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { Field, ErrorMessage } from 'vee-validate'

const genresStore = useGenresStore()
const locale = useI18n().locale
const emit = defineEmits(['update:genres'])

let selectedGenre = ref([])
let genres = ref([])

provide('genres', genres)

onMounted(() => {
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})
function selectGenre(genre) {
  if (!genres.value.some((item) => item.id === genre.id)) {
    genres.value.push(genre)
  }
}

function removeChoice(choice) {
  console.log(choice)
  genres.value = genres.value.filter((genre) => genre.id !== choice.id)
}

watchEffect(() => {
  if (genres.value.length > 0) {
    const updatedGenres = genres.value.map((genre) => ({ ...genre }))
    emit('update:genres', updatedGenres)
  }
})
</script>
