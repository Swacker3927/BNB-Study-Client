<template>
  <q-avatar v-if="isLogin" color="secondary" style="cursor: pointer">
    <img v-if="user.photo" :src="user.photo" />
    <span v-else>{{ firstName }}</span>
    <q-menu>
      <q-card style="min-width: 300px">
        <q-card-section class="text-center">{{ user.email }}</q-card-section>
        <q-card-section class="text-center">
          <q-avatar size="100px" color="grey-8" text-color="white">
            <img v-if="user.photo" :src="user.photo" />
            <span v-else>{{ firstName }}</span>
          </q-avatar>
        </q-card-section>
        <q-card-section class="text-center">
          안녕하세요. {{ user.name }}
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-list style="width: 100%" separator>
            <q-item v-for="menu in userMenu" :key="menu.label" clickable :to="menu.to">
              <q-item-section avatar>
                <q-icon :name="menu.icon"></q-icon>
              </q-item-section>
              <q-item-section>{{ menu.label }}</q-item-section>
            </q-item>
            <q-item clickable @click="logout">
              <q-item-section avatar>
                <q-icon name="mdi-account-off-outline"></q-icon>
              </q-item-section>
              <q-item-section>로그아웃</q-item-section>
            </q-item>
          </q-list>
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-avatar>
  <q-avatar v-else color="secondary" text-color="white" icon="mdi-account" style="cursor: pointer">
    <q-menu>
      <q-list style="min-width: 100px" separator>
        <q-item clickable :to="{ name: 'login' }">
          <q-item-section>로그인</q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'join' }">
          <q-item-section>회원가입</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-avatar>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import useUser from "src/stores/useUser";

export default defineComponent({
  name: "SiteUser",
  data() {
    return {};
  },
  computed: {
    ...mapState(useUser, ["user", "isLogin"]),
    firstName() {
      if (this.isLogin) {
        return this.user.name[0];
      }
    },
    userMenu() {
      const arr = [];
      arr.push({
        label: "회원정보 수정",
        to: { name: "user-modify" },
        icon: "mdi-account-edit-outline"
      });

      // TODO: 사용자 권한별 메뉴 추가해야됨
      switch (this.user.role) {
        case "Admin":
          arr.push({
            label: "관리자",
            to: { name: "adm-dashboard" },
            icon: "mdi-cog",
          });
          break;
      }

      arr.push({
        label: "회원정보 탈퇴",
        to: { name: "user-leave" },
        icon: "mdi-account-remove-outline"
      });
      return arr;
    }
  },
  methods: {
    ...mapActions(useUser, ["signOutUser"]),
    logout() {
      const name = this.signOutUser();
      this.$q.notify({
        type: "positive",
        message: `${name}님 로그아웃 하였습니다.`,
      });
      if (this.$route.name != "home") {
        this.$router.push({ name: "home" });
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
