<template>
  <q-page padding>
    <div
      class="q-mb-md"
      v-for="observation in this.items"
      :key="observation.id"
    >

      <q-list bordered class="bg-white" separator>
        <q-item class="bg-blue-grey-1">
          <q-item-section>
            <div class="q-pa-xs q-my-xs text-grey-8">
              <div class="text-subtitle1 text-primary"> {{ observation.name }}</div>
              <div class="text-caption "> {{ getObserverTypeName(observation.observerType) }} / {{ getCountTypeName(observation.countType) }} </div>
            </div>
          </q-item-section>
          <q-item-section side>
             <q-btn size="12px" flat dense round icon="more_vert">
               <q-menu>
                <q-list style="min-width: 120px">
                  <q-item clickable v-close-popup @click="removeObservation(observation)">
                    <q-item-section>Удалить</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
             </q-btn>
          </q-item-section>
        </q-item>
        <q-item
          v-for="day in observation.days"
          :key="day.id"
          clickable
          v-ripple
          @click="openDay(observation, day)"
        >
          <q-item-section>
            <q-item-label>{{ day.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-banner v-if="this.items.length == 0" class="bg-blue-grey-1 q-mt-lg" >
      Вы можете начать одно или несколько наблюдений с разными параметрами - участок, роль, вид подсчета голосов
      <template v-slot:action>
        <q-btn
          flat
          color="primary"
          label="Новое наблюдение"
          @click="createNew()"
        />
      </template>
    </q-banner>
    <div v-else class="q-mt-lg float-right">
      <q-btn
          flat
          color="primary"
          label="Новое наблюдение"
          @click="createNew()"
        />
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  CountType,
  ObservationListItem,
  ObservationListItemDay,
  ObserverType
} from 'src/services/Observation/Model';
import { ObservationService } from 'src/services/Observation/ObservationService';
import { TypeService } from 'src/services/Observation/TypeService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const items = ref(ObservationService.getAllObservations());

    return { items };
  },
  methods: {
    async openDay(
      observation: ObservationListItem,
      day: ObservationListItemDay
    ) {
      this.$store.commit('observation/open', day);
      this.$store.commit(
        'app/openObservation',
        this.$store.state.observation.currentObservation
      );

      await this.$router.push('/observation');
    },
    async createNew() {
      await this.$router.push('/create');
    },
    removeObservation(observation: ObservationListItem): void {
      this.$q
        .dialog({
          title: 'Удаление наблюдения',
          message: '<strong>' + observation.name + '</strong><br/> ' + TypeService.getObserverTypeName(observation.observerType) + ' / ' +TypeService.getCountTypeName(observation.countType),
          ok: { label: 'Удалить', color: 'negative'},
          html: true,
          cancel: 'Отмена',
          persistent: true,
        })
        .onOk(() => {
          ObservationService.removeObservation(observation);
          this.items = ObservationService.getAllObservations();
        });
    },
    getObserverTypeName(observerType: ObserverType): string {
      return TypeService.getObserverTypeName(observerType);
    },
    getCountTypeName(countType: CountType): string {
      return TypeService.getCountTypeName(countType);
    }
  },
});
</script>
