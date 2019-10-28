<template>
    <div>
        child
        {{mseeage}}
        <span @click="spanClick">减1</span>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component
    export default class Child extends Vue {
        @Prop({ default: 0 }) public mseeage: number;
        private created(): void {
            // console.log(this.mseeage);
        }
        public spanClick() {
            this.$emit('span', 222);
        }
    }
</script>

<style scoped>
span {
    border: 1px solid #ccc;
    padding: 4 6px;
    cursor: pointer;
}
</style>