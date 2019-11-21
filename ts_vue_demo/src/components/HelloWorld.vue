<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-show="show">
       通过show控制显示隐藏
    </p>
    <button @click="setShow(true)">
      显示show
    </button>
    <button @click="setShow(false)">
      隐藏show
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    setShow(state: boolean):void{
      this.show = state;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
