<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <pre>{{ user }}</pre>
    <div>{{token}}</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import useUser from 'src/stores/useUser';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'IndexPage',
  computed:{
    ...mapState(useUser, ['user', 'token']),
  },
  mounted() {
    console.log(this.$api.defaults.headers.common)
  }
});
</script>
