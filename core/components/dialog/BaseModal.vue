<template>
  <v-layout row justify-center>
    <v-dialog v-model="options.open" persistent :max-width="options.maxWidth">
      <slot name="content"></slot>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
