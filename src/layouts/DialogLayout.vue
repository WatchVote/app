<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense  icon="keyboard_arrow_left" @click="backBtnClick"/>
        <q-toolbar-title>{{ $route.meta.title }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    backBtnClick () {
      this.$router.go(-1)
    }
  }
})
</script>
