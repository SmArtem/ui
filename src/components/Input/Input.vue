<template>
  <input
    :value="value"
    @input="onInput"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'v-input',
  props: {
    value: String,
    type: String,
    placeholder: String,
    disabled: Boolean,
    autoComplete: Boolean,
    autoCapitalize: {
      default: 'off'
    },
    autofill: Boolean
  },
  methods: {
    onInput (event: InputEvent & { target: HTMLTextAreaElement }) {
      this.$emit('input', (event.target).value)
    },
    onChange (event: InputEvent) {
      this.$emit('change', event)
    },
    onBlur (event: InputEvent) {
      this.$emit('blur', event)
    },
    onFocus (event: InputEvent) {
      this.$emit('focus', event)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  input {
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #C0C4CC;
    box-sizing: border-box;
    border-radius: 4px;
  }
</style>
