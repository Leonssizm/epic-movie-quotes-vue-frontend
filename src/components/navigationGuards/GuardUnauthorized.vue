<template>
  <div
    class="h-screen bg-guards flex flex-col items-center justify-center font-helvetica-neue text-[#FFFFFF] text-center"
  >
    <img src="/public/images/Gandolf.png" />
    <h1 class="text-5xl font-bold">You shall not pass!</h1>
    <p class="mt-4 text-2xl">Sorry, but you don't have permission to access this page</p>
    <RouterLink
      :to="{ name: 'landing' }"
      class="mt-16 py-2 px-4 bg-red-500 border border-red-500 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221]"
    >
      Return home
    </RouterLink>
  </div>
</template>
