<template>
  <div class="bg-primary text-white q-py-xs q-px-md">
    <div class="q-my-sm">{{ electionName }}</div>
    <q-breadcrumbs active-color="white">
      <q-breadcrumbs-el :label="regulationName" />
      <q-breadcrumbs-el
        icon="location_on"
        :label="precintName"
        v-if="precintName"
      />
    </q-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ObservationInfo',
  computed: {
    electionName() {
      return '4'; // this.$store.state.observation.electionName
    },
    regulationName() {
      return '5'; // this.$store.state.observation.regulationName
    },
    precintName() {
      return '6'; // this.$store.state.observation.precintName
    },
  },
});
</script>
