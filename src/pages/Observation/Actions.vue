<template>
  <q-page padding>
    <div class="page-title">Чек-лист</div>
    <div
      v-for="section in this.$store.state.observation.currentObservation
        .sections"
      :key="section.id"
      class="q-mb-sm"
    >
      <q-item-label header v-if="section.title">
        <!-- <q-icon name="watch_later" style="font-size: 1.4em;" />  -->
        {{ section.title }}
      </q-item-label>
      <q-expansion-item
        dense-toggle
        :model-value="section.isOpen"
        class="checklist"
        @update:modelValue="setSectionOpen(section, $event)"
      >
        <template v-slot:header class="q-pl-none">
          <q-item-section >
            <p class="text-subtitle1 text-primary no-margin no-padding">
              {{ section.name }}
            </p>
          </q-item-section>
          <q-item-section side>
            {{ doneCount(section.actions) }} / {{ section.actions.length }}
          </q-item-section>
        </template>

        <q-list bordered padding separator >
          <q-item
            v-for="action in section.actions"
            :key="action.id"
            class="q-pa-sm"
          >
            <q-item-section side top class="q-pr-sm">
              <q-checkbox
                :modelValue="action.isDone"
                @update:modelValue="setActionState(action, $event)"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ action.text }}</q-item-label>
              <q-item-label v-if="action.link" class="q-py-sm">
                <a v-bind:href="action.link" target="_blank">Смотреть</a>
              </q-item-label>
              <q-list
                separator
                dense
                class="q-my-md q-mr-md"
                v-if="action.variables.length"
              >
                <q-item
                  v-for="variable in this.$store.state.observation
                    .actionVariables[action.id]"
                  :key="variable.id"
                  class="no-padding"
                >
                  <q-item-section class="text-bold">{{
                    variable.name
                  }}</q-item-section>
                  <q-item-section side class="text-bold q-pr-md">
                    <div>
                      {{ variable.value }}
                      <q-btn
                        flat
                        dense
                        round
                        icon="create"
                        @click="setVariableValue(variable)"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-if="action.descr || action.law || action.resp">
                <q-btn
                  flat
                  color="blue-grey-8 float-right"
                  align="left"
                  no-caps
                  @click="showDetails(action)"
                  >Подробнее</q-btn
                >
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<style scoped>
  .q-item { padding-left: 0 !important; }

  .q-item-type { padding-left: 0 !important; }
</style>

<script lang="ts">
import {
  ObservationAction,
  ObservationSection,
  ObservationVariable
} from 'src/services/Observation/Model';
import { /*nextTick,*/ defineComponent } from 'vue';

export default defineComponent({
  data: () => ({}),
  async created() {
    // await this.$store.dispatch('observation/update')
    // const savedPosition = (<Window>window).savedPosition
    // if (savedPosition) {
    //   await nextTick()
    //   window.scrollTo(0, savedPosition.y)
    // }
  },
  computed: {
    sections() {
      return this.$store.state.observation.currentObservation;
    },
  },
  methods: {
    doneCount(actions: ObservationAction[]) {
      var count = 0;
      for (var action of actions) {
        if (action.isDone === true) count++;
      }
      return count;
    },

    async showDetails(action: ObservationAction) {
      this.$store.commit('observation/selectAction', action);
      await this.$router.push('/action');
    },

    setActionState(action: ObservationAction, value: boolean) {
      const variables =
        this.$store.state.observation.actionVariables[action.id];
      if (value === true && variables?.length > 0 && variables.some((x) => x.value == undefined)) {
        this.$q.dialog({
          title: 'Не введено значение',
          message:
            'Чтобы отметить выполненным, нужно ввести значение. Нажмите "Подробнее" для этого',
        });
        return;
      }
      this.$store.commit('observation/setActionState', { action, value });
    },

    setSectionOpen(section: ObservationSection, value: boolean) {
      this.$store.commit('observation/setSectionOpen', { section, value });
    },

    setVariableValue(variable: ObservationVariable) {
      this.$q
        .dialog({
          message: variable.name,
          ok: 'Ок',
          cancel: 'Отмена',
          prompt: {
            model: variable.value?.toString() || '',
            // isValid: val => val.length > 2, // << here is the magic
            type: 'number', // optional
          },
          persistent: true,
        })
        .onOk((data: number) => {
          void this.$store.commit('observation/setVariableValue', {
            variable,
            value: data,
          });
        });
    }
  },
});
</script>
