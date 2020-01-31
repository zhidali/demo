<template>
  <!--
    placeholder：输入的placeholder
    value： v-model绑定值
    minVal：最小值
    maxVal：最大值
    reg： 数字匹配规则--int（正整数）、纯数字（number）、两位小数（twoNum）、四位小数（fourNum）
  -->
   <div class="number-input-box">
     <el-input
        :maxlength="maxlength"
        v-model="model"
        :placeholder="placeholder"
        @input.native="oninput($event)"
      @blur="onBlur()">
      </el-input>
   </div>
</template>

<script>
export default {
  name: 'number-input',
  props: {
    // 最多输入个数
    maxlength: {
      type: [Number, String],
      default: 10
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: ''
    },
    reg: {
      type: String,
      default: ''
    },
    minVal: {
      type: [Number, String],
      default: ''
    },
    maxVal: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      model: ''
    }
  },
  mounted () {
    this.model = this.value;
  },
  methods: {
    // 限制输入框输入内容
    oninput (e) {
      // 最大值判断和最小值判断
      /* if ((this.maxVal + '') && parseFloat(this.model) > this.maxVal) {
        this.model = this.maxVal
      } else if ((this.minVal + '') && parseFloat(this.model) < this.minVal) {
        this.model = this.minVal
      } else { */
        let ev = e || window.event
        // e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        if (this.reg) {
          // 判断如果有校验规则，比如两位小数
          if (this.reg === 'int') {
            // 正整数
            e.target.value = e.target.value.replace(/[^\d]/g, '')
            e.target.value = e.target.value.replace(/^0+/g, '')
          } else if (this.reg === 'parseInt') {
            // 整数
            e.target.value = e.target.value.replace(/[^\d]/g, '')
          } else if (this.reg === 'number') {
            // 数字
            e.target.value = e.target.value.replace(/[^\d.]/g, '')
            e.target.value = e.target.value.replace(/\.{2,}/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
          } else if (this.reg === 'fourNum') {
            // 四位小数
            e.target.value = e.target.value.replace(/[^\d.]/g, '')
            e.target.value = e.target.value.replace(/\.{2,}/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
          } else if (this.reg === 'twoNum') {
            // 两位小数
            e.target.value = e.target.value.replace(/[^\d.]/g, '')
            e.target.value = e.target.value.replace(/\.{2,}/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
            e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
          }
        } else {
          // 默认数字即可
          e.target.value = e.target.value.replace(/[^\d.]/g, '')
          e.target.value = e.target.value.replace(/\.{2,}/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        }
        this.model = e.target.value
      // }
      this.$emit('input', this.model)
    },
    onBlur(event) {
        // 失去焦点时更新边界值
        if ((this.maxVal + '') && parseFloat(this.model) > this.maxVal) {
            this.model = this.maxVal;
        } else if ((this.minVal + '') && parseFloat(this.model) < this.minVal) {
            this.model = this.minVal;
        }
        this.$emit('input', this.model);
        this.$emit('blur');
    }
  },
  watch: {
    value: {
      handler: function (val, oldval) {
        this.model = this.value
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
