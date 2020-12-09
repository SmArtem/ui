<template>
  <select :value="value"  @input="onInput">
    <slot></slot>
    <option v-for="option in options" :key="option">{{option}}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'

export default defineComponent({
  name: 'v-select',
  props: {
    value: [String, Number, Object],
    placeholder: String,
    disabled: Boolean,
    noDataText: String,
    multiple: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  setup (props, context) {
    const options = reactive<unknown[]>([])

    provide('options', options)

    provide('selectProps', props)

    const onInput = (event: InputEvent & { target: HTMLSelectElement }) => {
      context.emit('input', event.target.value)
    }

    return { options, onInput }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  select {
    appearance: none;
    display: inline-block;
    height: 40px;
    background-color: #F0F2F5;
    border: none;
    border-radius: 4px;
    padding: 0 12px;
    outline: none;
  }
  select:focus {
    box-shadow: 0 0 0 1px #444;
  }
</style>
