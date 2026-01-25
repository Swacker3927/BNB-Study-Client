<template>
  <q-page padding class="column flex-center">
    <h2 class="q-my-sm">로그인</h2>
    <q-form @submit.stop="login">
      <q-card>
        <q-card-section>
          <q-input
            label="이메일"
            v-model="form.email"
            outlined
            dense
            :rules="[(v) => !!v || '필수 입력입니다.']"
          ></q-input>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <InputPassword
            label="비밀번호"
            v-model="form.password"
            outlined
            dense
            :rules="[(v) => !!v || '필수 입력입니다.']"
          ></InputPassword>
        </q-card-section>
        <q-card-section class="q-pt-none row">
          <q-btn label="회원가입" flat dense color="grey-8"></q-btn>
          <q-space></q-space>
          <q-btn label="로그인" type="submit" color="primary"></q-btn>
        </q-card-section>
      </q-card>
    </q-form>
    <q-btn label="비밀번호찾기" type="button" flat class="q-mt-md"></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import InputPassword from "src/components/forms/InputPassword.vue";
import userApi from "src/apis/userApi";
import useUser from "src/stores/useUser";
import { mapActions } from "pinia";

export default defineComponent({
  components: { InputPassword },
  name: "LoginPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useUser, ["signInUser"]),
    async login() {
      // console.log(this.form);
      this.$q.loading.show();
      const data = await userApi.login(this.form);
      if (data) {
        // console.log(data);
        this.signInUser(data);
        this.$router.push({ name: "home" });
        this.$q.cookies.set("authToken", data.token);
        this.$q.notify({
          type: "positive",
          message: `${data.user.name}님 로그인되었습니다.`,
        });
      }
      this.$q.loading.hide();
    },
  },
});
</script>

<style lang="scss" scoped></style>
