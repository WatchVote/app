<template>
  <q-page padding>
    <div class="row q-mt-md">
      <div class="col text-bold">Нарушение</div>
      <div class="col-8">{{ violation?.name }}</div>
    </div>

    <div class="row q-mt-md">
      <div class="col text-bold">Закон</div>
      <div class="col-8">
        <div v-for="item in laws " :key="item.name">
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col text-bold">Ответственность</div>
      <div class="col-8">
        <div v-for="item in resp " :key="item.name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from 'src/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Violation',
  setup() {
    const violation = useStore().state.app.currentViolation;
    const laws = violation?.laws || [];
    const resp = violation?.resp || [];
    return { violation, laws, resp }
  }
});
</script>
