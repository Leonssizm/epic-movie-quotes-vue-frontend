<template>
  <div class="pt-6">
    <div class="text-[#FFFFFF] flex lg:justify-center ml-10 lg:ml-0">
      <div
        :class="{ 'lg:w-1/5': isExpanded, 'lg:w-2/5': !isExpanded }"
        class="flex h-12 lg:bg-[#24222F] items-center rounded-md"
      >
        <IconPencil class="ml-2" /><span class="ml-10 mr-10 lg:mr-0 lg:mr-4">Write new quote</span>
      </div>
      <div :class="{ 'w-2/5': isExpanded, 'w-1/5': !isExpanded }" class="ml-2 hidden lg:flex">
        <IconQuestionMark class="mt-3" />
        <input
          @click="isExpanded = !isExpanded"
          :placeholder="placeholder"
          class="h-12 bg-[#181624] ml-2"
          :class="{ 'w-full': isExpanded, 'w-1/2': !isExpanded }"
          type="search"
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
