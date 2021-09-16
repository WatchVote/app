<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>{{ this.$store.state.app.title }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay behavior="mobile" bordered>
      <q-scroll-area class="fit">
        <q-list>
          <q-item key="key-back" clickable to="/">
            <q-item-section avatar>
              <q-icon name="keyboard_arrow_left" />
            </q-item-section>
            <q-item-section>Назад</q-item-section>
          </q-item>
          <q-separator key="sep-back" />
          <template v-for="(menuItem, index) in menu" :key="index">
            <q-item clickable :to="'/observation/' + menuItem.page">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

const commonItems = [
  {
    icon: 'assignment',
    label: 'Чек-лист',
    page: 'actions',
    separator: false,
  }
]
const electionItems = [
  {
    icon: 'info',
    label: 'Права',
    page: 'status',
    separator: false,
  },
  {
    icon: 'pending_actions',
    label: 'Явка',
    page: 'turnouts',
    separator: false,
  },
  {
    icon: 'warning',
    label: 'Нарушения',
    page: 'warnings',
    separator: false,
  }
]
const finishItems = [
  {
    icon: 'assignment_turned_in',
    label: 'Протокол',
    page: 'results',
    separator: false,
  },
];

export default defineComponent({
  data() {
    return {
      left: false
    };
  },
  computed: {
    menu() {
      const isElectionDay = this.$store.state.observation.currentObservation.isElectionDay;
      const isFinishDay = this.$store.state.observation.currentObservation.isFinishDay;
      const menu = [...commonItems]
      if (isElectionDay) {
        for (const item of electionItems) menu.push(item)
      }
      if (isFinishDay) {
        for (const item of finishItems) menu.push(item)
      }
      return menu;
    },
  },
})
</script>
