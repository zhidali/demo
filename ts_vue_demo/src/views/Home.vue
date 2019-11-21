<template>
  <div class="home">
    <!-- <HelloWorld msg="vue项目"/> -->
    <tsHellow :isVisible="true" title="ssss"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import tsHellow from '@/components/hellow2.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    tsHellow
  }
}
</script>
