<template>
  <q-page padding>
    <div class="page-title">Информация</div>
    <observer-status></observer-status>
  </q-page>
</template>

<script>
import ObserverStatus from './Status/ObserverStatus.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageName',
  components: { ObserverStatus }
})
</script>
