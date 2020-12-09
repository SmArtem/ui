<template>
  <div class="hello">
    <div>{{ item }}</div>
    <div>{{ massage }}</div>
    <div><Input v-model="massage" /></div>
    <div>
      <Select v-model="item">
        <Option value="1a">1</Option>
        <Option value="2a">2</Option>
      </Select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from './Input/Input.vue'
import Select from './Select/Select.vue'
import Option from './Select/Option.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: { Input, Select, Option },
  data () {
    return {
      item: '1a',
      massage: ''
    }
  },
  watch: {
    item (value) {
      console.log(value)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
