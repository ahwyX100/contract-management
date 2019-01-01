<template>
  <v-snackbar
    v-model="snackbar"
    :top="options.y === 'top'"
    :color="color"
    :timeout="options.timeout"
  >
    {{ options.text }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data () {
    return {
      snackbar: false,
      options: {},
      defaultOptions: {
        type: 'success',
        text: '',
        y: 'top',
        timeout: 3000
      }
    }
  },
  computed: {
    color () {
      const type = this.options.type
      if (type === 'success') {
        return 'success'
      } else if (type === 'warning') {
        return 'info'
      } else if (type === 'error') {
        return 'error'
      }
    }
  },
  mounted () {
    this.$bus.$on('NOTIFY_MESSAGE', (options) => {
      this.options = Object.assign({}, this.defaultOptions, options)
      this.snackbar = true
    })
  },
  beforeDestroy () {
    this.$bus.$off('NOTIFY_MESSAGE')
  }
}
</script>

