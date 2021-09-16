<template>
  <q-page padding>
    <div class="page-title">Шаблоны жалоб</div>
      <q-list bordered class="bg-white" separator>
        <q-item
          v-for="template in templates"
          :key="template.name"
          clickable
          v-ripple
          @click="openTemplate(template.page)"
        >
          <q-item-section>
            <q-item-label>{{ template.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="page-title q-mt-xl">Грубые нарушения</div>
      <q-list bordered class="bg-white" separator>
        <q-item
          v-for="item in items"
          :key="item.name"
          clickable
          v-ripple
          @click="openViolation(item)"
        >
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
  </q-page>
</template>

<script lang="ts">
import { ViolationService } from 'src/services/Violations/ViolationService'
import { Violation } from 'src/services/Violations/Model'
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ViolationTemplate',
  setup() {
    const router = useRouter();
    const store = useStore();
    const items = ref(ViolationService.getStrongViolations());

    const templates = [
      { name: 'Общий шаблон', page: 'general' }
    ]

    const openTemplate = (name: string): void => {
      void router.push('/template/' + name);
    }

    const openViolation = (item: Violation): void => {
        store.commit('app/openViolation', item);
        void router.push('/violation');
    };

    return { items, templates, openViolation, openTemplate };
  }
})
</script>
