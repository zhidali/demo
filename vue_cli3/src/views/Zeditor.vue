<!--
 * @author: zhidl
 * @Date: 2021-07-07 11:36:10
 * @description: 
 * @LastEditTime: 2021-07-08 17:21:43
 * @LastEditors: zhidl
-->

<template>
    <div id="editor">
        <div>editor</div>
        <!-- <div id="editor">
        </div> -->
        <Editor
            :value="value"
            @change="handleChange"
            :uploadImages="uploadImages"
            :locale="zhHans"
            :plugins="plugins"
            mode="auto"
            placeholder="请输入内容"
        />
        <Viewer :value="value" :plugins="plugins" />
    </div>

</template>

<script>
    import { Editor, Viewer } from '@bytemd/vue';
    import highlight from '@bytemd/plugin-highlight';
    import mediumZoom from '@bytemd/plugin-medium-zoom';
    import gemoji from '@bytemd/plugin-gemoji';
    import gfm from '@bytemd/plugin-gfm';
    import frontmatter from '@bytemd/plugin-frontmatter';
    import externallinks from '@bytemd/plugin-external-links';
    import breaks from '@bytemd/plugin-breaks';
    import math from '@bytemd/plugin-math';

    import highlightStyle from './index';

    // 引入中文包
    import zhHans from './hans.json';
    // 引入基础css
    import 'bytemd/dist/index.min.css';
    // 引入高亮css
    import 'highlight.js/styles/vs.css';
    
    export default {
        name: 'Zeditor',
        data() {
            return {
                value: '',
                plugins: [
                    gfm(),
                    highlight(),
                    mediumZoom(),
                    gemoji(),
                    frontmatter(),
                    highlightStyle(),
                    externallinks({
                        test: function (href) {
                            return true;
                        },
                    }),
                    breaks(),
                    math(),
                    // Add more plugins here
                ],
                zhHans
            };
        },

        mounted() {
            // uploadImages
            // let _this = this;
            // this.$nextTick(() => {
            //     const editor = new Editor({
            //         target: document.getElementById('editor'), // DOM to render
            //         props: {
            //             value: '',
            //             plugins,
            //             locale: zhHans,
            //             uploadImages: _this.uploadImages,
            //             mode: 'auto',
            //         },
            //     });
            //     editor.$on('change', (e) => {
            //         editor.$set({ value: e.detail.value });
            //     });
            // });
        },
        components: {
            Editor,
            Viewer
        },
        methods: {
            uploadImages(file) {
                // return Promise.all(
                //     file.map((e, i) => {
                //         let r = [];
                //         return new Promise((resolve) => {
                //             let reader = new FileReader();
                //             reader.readAsDataURL(e);
                //             reader.onload = () => {
                //                 r[i] = reader.result;
                //                 if (r.length === file.length) {
                //                     resolve({
                //                         url: r[i],
                //                     });
                //                 }
                //             };
                //         });
                //     })
                // );
                
                 return Promise.all(file.map(e=>({
                        url: "https://picsum.photos/300"
                })))
            },
            handleChange(v) {
                console.log(v, 'vvv');
                this.value = v;
            },
        },
    };
</script>

<style scoped>
#editor >>> .bytemd {
    height: calc(100vh - 500px);
}
</style>