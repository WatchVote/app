<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        {{ currentAction.text }}
      </q-card-section>

      <q-card-actions>
        <div v-if="currentAction.law" class="q-pl-sm q-pr-md">
          <span class="text-subtitle2">Закон</span><br />
          <q-btn flat>
            {{ currentAction.law }}
          </q-btn>
        </div>

        <div v-if="currentAction.resp" class="q-pl-sm q-pr-md">
          <span class="text-subtitle2">Ответственность</span><br />
          <q-btn flat>
            {{ currentAction.resp }}
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>

    <div v-if="currentAction.descr" class="q-mt-sm">
      <q-card >
        <q-card-section>
          {{ currentAction.descr }}
        </q-card-section>
      </q-card>
    </div>

    <!-- <div v-if="this.$store.state.observation.actionVariables[currentAction.id]">
      <p class="q-mt-md q-mb-sm text-subtitle1">Значения</p>
      <q-card>
        <q-card-section>
          <q-list separator dense>
            <q-item
              v-for="variable in this.$store.state.observation.actionVariables[currentAction.id]"
              :key="variable.id"
              class="no-padding"
            >
              <q-item-section>{{ variable.name }}</q-item-section>
              <q-item-section side> {{ variable.value }} </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  dense
                  round
                  icon="create"
                  @click="onEditValue(variable)"
              /></q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div> -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    elections: [],
  }),
  computed: {
    currentAction() {
      return this.$store.state.observation.currentAction;
    },
  }
});
</script>
