<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-select
        label="Выборы"
        v-model="regulation"
        :options="allRegulations"
      />

      <div v-if="regulation">
        <q-select
          label="Роль на участке"
          v-model="observerType"
          :options="allObserverTypes"
        />
      </div>

      <div v-if="observerType">
        <q-select
          label="Подсчет голосов"
          v-model="countType"
          :options="[
            { label: 'Ручной подсчет', value: 0 },
            { label: 'КОИБ', value: 1 },
          ]"
        />
      </div>

      <div v-if="countType">
        <q-btn label="Создать" type="submit" color="primary" />
        <q-btn
          label="Отмена"
          color="primary"
          flat
          class="q-ml-sm"
          @click="onCancel()"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, watch } from 'vue';
import { defineComponent } from 'vue';
import { RegulationService } from 'src/services/Regulation/RegulationService';
import { ObservationService } from 'src/services/Observation/ObservationService';
import { TypeService } from 'src/services/Observation/TypeService';

export default defineComponent({
  setup() {
    const regulation = ref(null);
    const observerType = ref(null);
    const countType = ref(null);

    const allRegulations = RegulationService.getAllRegulations();
    const allObserverTypes = ref(TypeService.getAllObserverTypes());
    const allCountTypes = ref(TypeService.getAllCountTypes());


    return {
      regulation,
      observerType,
      countType,
      allRegulations,
      allObserverTypes,
      allCountTypes
    };
  },
  methods: {
    async onSubmit() {
      const reg = RegulationService.getRegulation(this.regulation.value);
      ObservationService.createObservation(
        reg,
        this.observerType.value,
        this.countType.value
      );
      await this.$router.push('/')
    },
    onCancel() {
      this.$router.go(-1);
    },
  }
});
</script>
