<template>
  <q-page padding>
    <!-- <div class="page-title">Протокол</div> -->

    <q-tabs v-model="tab" inline-label class="text-primary">
      <q-tab name="parties" label="Партии" />
      <q-tab name="candidates" label="Кандидаты" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="parties">
        <result-table :rows="parties"></result-table>
      </q-tab-panel>

      <q-tab-panel name="candidates">
        <result-table :rows="candidates"></result-table>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped>
.q-tab-panel {
  padding-left: 0;
  padding-right: 0;
}
</style>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent, ref } from 'vue';
import ResultTable from './Result/ResultTable.vue'

export default defineComponent({
  components: { ResultTable },
  setup() {
    const store = useStore();
    const tab = ref('parties');
    const parties = store.state.observation.currentObservation.partiesRows;
    const candidates = store.state.observation.currentObservation.candidatesRows;

    return { tab, parties, candidates };
  },
  computed: {
    variables() {
      return this.$store.state.observation.currentObservation.variables;
    },
  },
});
</script>
