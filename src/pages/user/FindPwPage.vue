<template>
  <q-page padding class="column flex-center">
    <h2 class="q-my-sm">비밀번호 찾기</h2>
    <q-form @submit.stop="findPw">
      <q-card>
        <q-card-section>
          <q-input label="이메일" v-model="form.email" outlined dense :rules="[(v) => !!v || '필수 입력입니다.']"></q-input>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <InputPhone v-model="form.tel" label="전화번호" outlined dense :rules="[(v) => !!v || '필수입력입니다.']"
            class="required"></InputPhone>
        </q-card-section>
        <q-card-section class="q-pt-none row">
          <q-btn label="로그인" flat dense color="grey-8" :to="{ name: 'login' }"></q-btn>
          <q-space></q-space>
          <q-btn label="비밀번호 찾기" type="submit" color="primary"></q-btn>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import InputPhone from "src/components/forms/InputPhone.vue";
import userApi from "src/apis/userApi";
export default defineComponent({
  components: { InputPhone },
  name: "FindPwPage",
  data() {
    return {
      form: {
        email: "",
        tel: ""
      }
    };
  },
  methods: {
    async findPw() {
      this.$q.loading.show();
      const data = await userApi.fildPw(this.form);
      this.$q.loading.hide();
      if (data) {
        this.$q
          .dialog({
            title: "비밀번호 찾기",
            message: "입력하신 이메일로 인증메일을 발송하였습니다.",
            persistent: true
          })
          .onOk(() => {
            this.$router.push({ name: "home" });
          });
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
