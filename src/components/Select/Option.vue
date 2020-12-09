<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue'
import { getValueByPath } from '../../utils'

export default defineComponent({
  name: 'v-option',
  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    console.log(props)
    const options = inject<unknown[]>('options')

    const selectProps = inject <{
      valueKey: string | 'value';
    } & {
      value?: unknown;
      placeholder?: string | undefined;
      disabled?: boolean | undefined;
      noDataText?: string | undefined;
      multiple?: boolean | undefined;
    }>('selectProps')

    if (options) {
      options.push(props.value)
    }

    const isObject = computed(() => {
      return Object.prototype.toString.call(props.value).toLowerCase() === '[object object]'
    })

    const currentLabel = computed(() => {
      return props.label || (isObject.value ? '' : props.value)
    })

    const currentValue = computed(() => {
      return props.value || props.label || ''
    })

    const isEqual = (a: unknown, b: unknown) => {
      if (isObject.value) {
        return a === b
      } else {
        const valueKey = selectProps?.valueKey || 'value'
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
      }
    }
    const contains = (arr = [], target) => {
      if (!isObject.value) {
        return arr && arr.indexOf(target) > -1
      } else {
        const valueKey = selectProps?.valueKey || 'value'
        return arr && arr.some(item => {
          return getValueByPath(item, valueKey) === getValueByPath(target, valueKey)
        })
      }
    }
    const itemSelected = computed(() => {
      if (!selectProps?.multiple) {
        return isEqual(this.value, this.select.value)
      } else {
        return contains(this.select.value, this.value)
      }
    })
    return { currentLabel, currentValue }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
option {
  width: 200px;
  background-color: green;
}
</style>
