<template>
  <div class="flex items-center justify-center flex-col">
    <div
      class="flex pl-10 flex-col font-helvetica-neue border border-gray-700 mt-6 lg:mt-6 bg-[#24222F] lg:bg-[#11101A] w-[21rem] flex flex-col lg:mb-10 mb-0 lg:mr-10"
    >
      <h1 class="text-[#FFFFFF] font-normal pb-3 pt-3">
        {{ $t('userProfile.password_contain.header') }}
      </h1>
      <p class="text-[#9C9A9A] font-normal pb-2">
        {{ $t('userProfile.password_contain.eight_characters') }}
      </p>
      <p class="text-[#FFFFFF] font-normal pb-2">
        {{ $t('userProfile.password_contain.fifteen_characters') }}
      </p>
    </div>
  </div>
</template>
