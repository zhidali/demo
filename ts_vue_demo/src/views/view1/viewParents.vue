<template>
    <div>
        {{mseeage}}
        <child :mseeage="mseeage" @span="reduceNum" />
        <button @click="btnClick">加1</button>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import child from './viewChild.vue';
    @Component({
        components: {
            child
        }
    })
    export default class Parents extends Vue {
        // data
        public mseeage = 0;

        public btnClick(): void {
            this.mseeage += 1;
        }
        public reduceNum(arg): void {
            console.log(arg);
            this.mseeage -= 1;
        }
    }
</script>