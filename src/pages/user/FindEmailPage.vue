<template>
  <q-page padding class="column flex-center">
    <h2 class="q-my-sm">이메일 찾기</h2>
    <p v-if="email" class="text-grey-8">아래에 이메일로 로그인 하세요.</p>
    <p v-else class="text-grey-8">회원가입 시, 입력한 이름과 전화번호를 입력하세요.</p>
    <q-form @submit.stop="onSubmit">
      <q-card v-if="email">
        <q-card-section>
          <q-input v-model="email" readonly outlined></q-input>
        </q-card-section>
      </q-card>
      <q-card v-else>
        <q-card-section>
          <q-input v-model.trim="form.name" label="이름" outlined :rules="[
            (v) => !!v || '필수입력입니다.',
            (v) => v.length >= 2 || '이름은 2자 이상 입력하세요.',
          ]" class="required" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <InputPhone v-model="form.tel" label="전화번호" outlined :rules="[
            (v) => !!v || '필수입력입니다.',
            (v) =>
              defineReg.phone(v).test(v) ||
              '올바른 전화번호 형식을 입력하세요.',
          ]" class="required"></InputPhone>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-btn label="이메일 찾기" type="submit" color="primary" class="full-width"></q-btn>
        </q-card-section>
      </q-card>
      <div class="row full-width q-mt-md">
        <q-btn label="로그인" type="button" dense flat :to="{ name: 'login' }"></q-btn>
        <q-space></q-space>
        <q-btn label="비밀번호 찾기" type="button" dense flat :to="{ name: 'find-pw' }"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import InputPhone from "src/components/forms/InputPhone.vue";
import defineReg from "src/util/defineReg";
import userApi from "src/apis/userApi";

export default defineComponent({
  components: { InputPhone },
  name: "FindEmailPage",
  data() {
    return {
      form: {
        name: "",
        tel: ""
      },
      email: "test@test.com"
    };
  },
  computed: {
    defineReg: () => defineReg
  },
  methods: {
    async onSubmit() {
      this.$q.loading.show();
      const email = await userApi.findEmail(this.form);
      this.$q.loading.hide();
      if (email) {
        this.email = email;
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
