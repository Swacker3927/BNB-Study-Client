<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-btn flat dense :to="{ name: 'adm-dashboard' }"> Admin </q-btn>
        </q-toolbar-title>

        <SiteUser></SiteUser>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list style="width: 100%" separator>
        <q-item
          v-for="menu in menus"
          :key="menu.label"
          clickable
          :to="menu.to"
        >
          <q-item-section>{{ menu.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapActions } from "pinia";
import useUser from "src/stores/useUser";
import SiteUser from "src/components/layout/SiteUser.vue";

export default defineComponent({
  components: { SiteUser },
  name: "AdminLayout",
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    menus() {
      const arr = [];
      arr.push({
        to: { name: "adm-user" },
        label: "회원관리",
      });
      return arr;
    },
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>
