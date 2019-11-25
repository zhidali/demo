<template>
    <div>
        <ul>
            <li
                v-for="(item,index) in list"
                :key="index"
            >
                {{item}}
            </li>
        </ul>
        <p>
            {{count}}
        </p>
        <p>
            标题：{{title}}
        </p>
        <button @click="addList">
            随机添加
        </button>
    </div>
</template>

<script lang="ts">
    // public  公共
    // private  私有
    // protected 受保护
    import { IRoot, InvType, Item } from '../interfaces';
    // 引入vue以及一些装饰器
    import { Component, Vue, Prop, Watch, } from 'vue-property-decorator';
    // 继承vue 并且导出vue组件
    @Component
    export default class Step extends Vue {
        // 原来的props
        @Prop({
            required: true
        })
        isVisible!: boolean;
        @Prop() title!: string | number;
        // 类似原来vue 里面的data
        public list: any[] = [1, 'a', 3];
        public obj: Item = {} as Item;
        // 通过get 和set实现计算属性
        public get count(): number {
            return this.list.length;
        }
        // 原来的methods
        private addList(): void {
            let a: number = Math.ceil(Math.random() * 10);
            this.list.push(a);
        }
        @Watch('list', { deep: true })a(newVal, oldVal): void {
            console.log(newVal);
        }
        // 组件使用正常的用法即可

        // Vue.extend() components 和 JavaScript 写法完全一致
        // vue-class-component 需要把导入的组件写在修饰器@Components({})里面
        // components: {
            
        // }
        public dele<T>(val:T):T {
            return val
        }
        @Prop() item!: Item;
    }
</script>