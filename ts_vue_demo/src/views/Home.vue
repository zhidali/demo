<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="aa">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    console.log(1111)
  },
  methods: {
    aa(){
      console.log('1')
    }
  }
}
</script>
