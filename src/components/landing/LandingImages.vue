<template>
  <div class="relative">
    <div class="fade-overlay"></div>
    <div class="relative">
      <img src="/images/interstellar-banner.png" alt="Interstellar Banner" />
      <p
        class="absolute flex font-montserrat mt-6 ml-8 top-10 lg:top-80 lg:left-60 text-[#FFFFFF] lg:text-5xl font-bold lg:leading-10"
      >
        <IconDash class="hidden lg:block lg:mt-3 lg:mr-2" /> “You have to leave something <br />
        behind to go forward”
      </p>
      <p
        class="absolute font-helvetica-neue font-bold mt-20 ml-8 top-10 text-[#D9D9D9] lg:text-3xl lg:top-80 lg:mt-28 lg:ml-24 lg:left-60"
      >
        interstellar, 2014
      </p>
    </div>
    <div class="relative">
      <img src="/images/royal-tenebaums-banner.png" alt="Royal Tenenbaums Banner" />
      <p
        class="absolute flex font-montserrat mt-6 ml-8 top-10 lg:top-80 lg:left-60 text-[#FFFFFF] lg:text-5xl font-bold lg:leading-10"
      >
        <IconDash class="hidden lg:block lg:mt-3 lg:mr-2" /> “I think we're just gonna
        <br />
        have to be secretly in love <br />
        with earch other and <br />
        leave it that”
      </p>
      <p
        class="absolute font-helvetica-neue font-bold mt-32 ml-8 top-10 text-[#D9D9D9] lg:text-3xl lg:top-80 lg:mt-48 lg:ml-24 lg:left-60"
      >
        The Royal Tenenbaums,2001
      </p>
    </div>
    <div class="relative">
      <img src="/images/lord-of-the-rings-banner.png" alt="Lord of the Rings Banner" />
      <p
        class="absolute flex font-montserrat mt-6 ml-8 top-10 lg:top-80 lg:left-60 text-[#FFFFFF] lg:text-5xl font-bold lg:leading-10"
      >
        <IconDash class="hidden lg:block lg:mt-3 lg:mr-2" /> “I see in your eyes the same <br />
        fear that would take the <br />
        heart of me....”
      </p>
      <p
        class="absolute font-helvetica-neue font-bold mt-24 ml-8 top-10 text-[#D9D9D9] lg:text-3xl lg:top-80 lg:mt-36 lg:ml-24 lg:left-60"
      >
        The Lord of the Rings, 2003
      </p>
    </div>
  </div>
</template>
<script setup>
import IconDash from '@/components/icons/IconQuoteDash.vue'
</script>
<style scoped>
.fade-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.5;
  background-image: url('/images/highlights/landing-fade.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
