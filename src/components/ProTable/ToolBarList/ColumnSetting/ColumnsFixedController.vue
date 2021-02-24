<template>
  <a-button-group class="d2-table-columns-fixed-controller">
    <a-button
      v-for="option of options"
      :key="option.icon"
      :type="value === option.value ? 'primary' : 'default'"
      :icon="option.icon"
      size="small"
      @click="submit(option.value)"
    />
  </a-button-group>
</template>

<script>
export default {
  name: 'ColumnsFixedController',
  components: {},
  props: {
    value: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      options: [
        {
          value: 'left',
          icon: 'arrow-left'
        },
        {
          value: false,
          icon: 'close'
        },
        {
          value: 'right',
          icon: 'arrow-right'
        }
      ]
    }
  },
  methods: {
    submit (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
