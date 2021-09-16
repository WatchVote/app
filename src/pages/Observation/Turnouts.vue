<template>
  <q-page padding>
    <div class="page-title">Явка</div>
    <q-markup-table class="q-my-md" flat bordered>
      <thead>
        <tr>
          <th class="text-left">Интервал</th>
          <th class="text-right">Значение</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="turnout in turnouts" :key="turnout.hour">
          <td class="text-left">{{ displayHours(turnout.hour) }}</td>
          <td class="text-right">
            {{ turnout.value }}
            <q-btn flat dense round
                  icon="create" class="text-grey-5"
                  @click="onEditValue(turnout)"
              />
          </td>
        </tr>
        <tr>
          <td class="text-left text-bold">Итого:</td>
          <td class="text-right text-bold">{{ total }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script lang="ts">
import { ObservationTurnout } from 'src/services/Observation/Model';
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    displayHours(hour: number): string {
      const startHour = hour - 0.5;
      return Math.trunc(startHour).toString() + ((startHour % 1 == 0) ? ':00' : ':30') + ' - ' +
             Math.trunc(hour).toString() + ((hour % 1 == 0) ? ':00' : ':30')
    },
    onEditValue(turnout: ObservationTurnout) {
      this.$q
        .dialog({
          message: this.displayHours(turnout.hour),
          ok: 'Ок',
          cancel: 'Отмена',
          prompt: {
            model: turnout.value?.toString() || '',
            // isValid: val => val.length > 2, // << here is the magic
            type: 'number', // optional
          },
          persistent: true,
        })
        .onOk((data: string) => {
          void this.$store.commit('observation/setTurnOutValue', {
            turnout,
            value: parseInt(data),
          });
        });
    }
  },
  computed: {
    total() {
      let sum = 0;
      for (let turnout of this.$store.state.observation.currentObservation.turnouts) {
        if (turnout.value) {
          sum += turnout.value;
        }
      }
      return sum;
    },
    turnouts() {
      return this.$store.state.observation.currentObservation.turnouts;
    },
  },
})
</script>
