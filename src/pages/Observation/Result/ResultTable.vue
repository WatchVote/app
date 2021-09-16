<template>
  <q-list class="bg-white protocol">
    <template v-for="item in rows" :key="item.index">
      <q-item>
        <q-item-section side class="text-bold">{{ item.index }}</q-item-section>
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section side>
          {{ item.value }}<q-btn
            flat
            dense
            round
            icon="create"
            @click="setRowValue(item)"
          />
        </q-item-section>
      </q-item>
      <template v-if="item.index == 5">
        <q-separator spaced/>
        <q-item-label header>Контроль</q-item-label>
        <q-item>
          <q-item-section side>
            <div v-if="x1?.value && x3?.value && x4?.value && x5?.value">
              <q-icon name="check_circle" color="positive" v-if="x1?.value >=  x3?.value + x4?.value + x5?.value" />
              <q-icon name="dangerous" color="negative" v-else />
            </div>
          </q-item-section>
          <q-item-section>
            [1] ≥ [3] + [4] + [5]
            <div v-if="x1?.value && x3?.value && x4?.value && x5?.value">
            {{x1?.value}} ≥ {{ x3?.value + x4?.value + x5?.value }}
            </div>
          </q-item-section>
        </q-item>

      </template>

      <template v-if="item.index == 12">
        <q-separator spaced/>
        <q-item-label header>Контроль</q-item-label>
        <q-item>
          <q-item-section side>
            <div v-if="x2?.value && x3?.value && x4?.value && x5?.value && x6?.value && x11?.value && x12?.value">
              <q-icon name="check_circle" color="positive" v-if="x2?.value == x3?.value + x4?.value + x5?.value + x6?.value  + x11?.value - x12?.value" />
              <q-icon name="dangerous" color="negative" v-else />
            </div>
          </q-item-section>
          <q-item-section>
            [2] = [3] + [4] + [5] + [6] + [11] - [12]
            <div v-if="x2?.value && x3?.value && x4?.value && x5?.value && x6?.value && x11?.value && x12?.value">
            {{x2?.value}} = {{ x3?.value + x4?.value + x5?.value + x6?.value  + x11?.value - x12?.value }}
            </div>
          </q-item-section>
        </q-item>


        <q-item>
          <q-item-section side>
            <div v-if="x7?.value && x8?.value && x9?.value && x10?.value">
              <q-icon name="check_circle" color="positive" v-if="x7.value + x8.value == x9.value + x10.value" />
              <q-icon name="dangerous" color="negative" v-else />
            </div>
          </q-item-section>
          <q-item-section>
            [7] + [8] = [9] + [10]
            <div v-if="x7?.value && x8?.value && x9?.value && x10?.value">
            {{x7?.value + x8?.value}} = {{x9?.value + x10?.value}}
            </div>
          </q-item-section>
        </q-item>
      </template>
    </template>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import { ObservationProtocolRow } from 'src/services/Observation/Model';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'ResultTable',
  props: {
    rows: {
      type: Object as () => ObservationProtocolRow[],
      required: true,
    },
  },
  setup(props) {
    const quasar = useQuasar();
    const store = useStore();
    const x1 = props.rows.find(x => x.index == 1);
    const x2 = props.rows.find(x => x.index == 2);
    const x3 = props.rows.find(x => x.index == 3);
    const x4 = props.rows.find(x => x.index == 4);
    const x5 = props.rows.find(x => x.index == 5);
    const x6 = props.rows.find(x => x.index == 6);
    const x7 = props.rows.find(x => x.index == 7);
    const x8 = props.rows.find(x => x.index == 8);
    const x9 = props.rows.find(x => x.index == 9);
    const x10 = props.rows.find(x => x.index == 10);
    const x11 = props.rows.find(x => x.index == 11);
    const x12 = props.rows.find(x => x.index == 12);

    const setRowValue = (row: ObservationProtocolRow) => {
      quasar.dialog({
          message: row.name,
          ok: 'Ок',
          cancel: 'Отмена',
          prompt: {
            model: row.value?.toString() || '',
            // isValid: val => val.length > 2, // << here is the magic
            type: 'number', // optional
          },
          persistent: true,
        })
        .onOk((data: string) => {
          void store.commit('observation/setRowValue', {
            row,
            value: parseInt(data),
          });
        });
    }

    return {
      x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12,
      setRowValue };
  }
});
</script>
