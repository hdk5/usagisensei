<template>
  <div class="sidebar">
    <Builder/>
    <Button class="raw-button" type="primary" @click="rawData = true" long>检视原始码</Button>
    <Modal v-model="rawData" title="Raw rank data">
      <pre>{{rankData}}</pre>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Builder from './builder.vue'

export default {
  name: 'sidebar',
  data() {
    return {
      rawData: false
    }
  },
  components: {
    Builder
  },
  computed: {
    ...mapGetters(['rankData'])
  }
}
</script>
<style scoped>
.raw-button {
  margin: 10px;
  width: 180px;
}
</style>
