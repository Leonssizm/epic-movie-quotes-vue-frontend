<template>
  <div class="pt-6">
    <div class="text-[#FFFFFF] flex justify-center mr-56">
      <div
        :class="{ 'w-1/5': isExpanded, 'w-1/2': !isExpanded }"
        class="flex w-1/3 h-12 bg-[#24222F] flex items-center rounded-md"
      >
        <IconPencil class="ml-2" /> <span class="ml-4">Write new quote</span>
      </div>
      <div class="flex ml-2" :class="{ 'w-1/3': isExpanded, 'w-1/5': !isExpanded }">
        <IconQuestionMark class="mt-3" />
        <input
          @click="isExpanded = !isExpanded"
          :placeholder="placeholder"
          class="h-12 bg-[#181624] ml-2"
          type="search"
          :class="{ 'w-full': isExpanded, 'w-1/2': !isExpanded }"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import IconPencil from '@/components/icons/IconPencil.vue'
import IconQuestionMark from '@/components/icons/IconQuestionMark.vue'
import { ref, computed } from 'vue'

let isExpanded = ref(false)
let placeholder = computed(() => {
  if (isExpanded.value) {
    return 'Enter @ to search movies, Enter # to search quotes'
  } else {
    return 'Search by'
  }
})
</script>
