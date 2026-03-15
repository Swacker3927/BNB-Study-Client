<template>
  <q-page padding class="column flex-center">
    <h2 class="q-my-sm">비밀번호 초기화</h2>
    <q-form @submit.stop="resetPw">
      <q-card style="width: 100vw; max-width: 340px;">
        <q-card-section>
          <q-input
            label="임시 비밀번호"
            v-model.trim="form.tempPw"
            outlined
            dense
            class="required"
            :rules="[(v) => !!v || '필수 입력입니다.']"
          ></q-input>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <InputPassword
            label="비밀번호"
            v-model.trim="form.password"
            outlined
            dense
            class="required"
            :rules="[
              (v) => !!v || '필수 입력입니다.',
              (v) =>
                defineReg.password.test(v) ||
                '대소문자,숫자,특수문자(@$!%*?&)포함 6자 이상 입력하세요.',
            ]"
          ></InputPassword>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <InputPassword
            v-model.trim="checkPw"
            label="비밀번호 확인"
            outlined
            dense
            :rules="[
              (v) =>
                v == form.password || '동일한 비밀번호를 한번더 입력하세요.',
            ]"
            class="required"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn
            label="비밀번호 초기화"
            type="submit"
            color="primary"
            class="full-width"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import InputPassword from "src/components/forms/InputPassword.vue";
import userApi from "src/apis/userApi";
import defineReg from "src/util/defineReg";

export default defineComponent({
  components: { InputPassword },
  name: "PwResetPage",
  data() {
    return {
      form: {
        email: "",
        token: "",
        tempPw: "",
        password: "",
      },
      checkPw: "",
    };
  },
  computed: {
    defineReg: () => defineReg,
  },
  methods: {
    async resetPw() {
      this.$q.loading.show();
      const data = await userApi.resetPw(this.form);
      this.$q.loading.hide();
      if (data) {
        this.$q.notify({
          type: "positive",
          message: "변경된 비밀번호로 로그인 하세요.",
        });
        this.$router.push({ name: "login" });
      }
    },
  },
  created() {
    const { name, query } = this.$route;
    this.form.email = query.email;
    this.form.token = query.token;
    this.$router.replace({ name, query: {} });
  },
});
</script>

<style lang="scss"></style>
