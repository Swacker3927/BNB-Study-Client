<template>
  <q-page padding>
    <h2 class="text-center">회원가입</h2>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      @validation-error="onValidError"
      class="q-gutter-md"
    >
      <q-input
        v-model.trim="form.email"
        label="이메일"
        outlined
        @update:model-value="changEmail"
        :rules="[
          (v) => !!v || '필수입력입니다.',
          (v) =>
            defineReg.email.test(v) || '올바른 이메일 형식으로 입력하세요.',
        ]"
      />
      <q-input
        v-model.trim="form.name"
        label="이름"
        outlined
        :rules="[
          (v) => !!v || '필수입력입니다.',
          (v) => v.length >= 2 || '이름은 2자이상 입력하세요.',
        ]"
      />
      <InputPassword
        v-model.trim="form.password"
        label="비밀번호"
        outlined
        :rules="[
          (v) => !!v || '필수입력입니다.',
          (v) =>
            defineReg.password.test(v) ||
            '대소문자,숫자,특수문자(@$!%*?&)포함 6자 이상 입력하세요.',
        ]"
      />
      <InputPassword
        v-model.trim="checkPw"
        label="비밀번호 확인"
        outlined
        :rules="[
          (v) => v == form.password || '동일한 비밀번호를 한번더 입력하세요.',
        ]"
      />
      <InputPhone
        v-model="form.tel"
        label="전화번호"
        outlined
        :rules="[
          (v) => !!v || '필수입력입니다.',
          (v) =>
            defineReg.phone(v).test(v) || '올바른 전화번호 형식을 입력하세요.',
        ]"
      ></InputPhone>
      <InputDate
        v-model="form.birth"
        label="생년월일"
        outlined
        :rules="[
          (v) => !!v || '필수입력입니다.',
          (v) => defineReg.date.test(v) || 'YYYY-MM-DD 형식으로 입력하세요.',
        ]"
      ></InputDate>

      <q-field
        outlined
        v-model="form.sex"
        label="성별"
        stack-label
        dense
        :rules="[(v) => !!v || '필수입력입니다.']"
      >
        <template v-slot:control>
          <q-btn-toggle
            v-model="form.sex"
            flat
            text-color="grey-8"
            toggle-color="primary"
            :options="sexOptions"
          ></q-btn-toggle>
        </template>
      </q-field>

      <q-field
        outlined
        v-model="form.role"
        label="가입유형"
        stack-label
        dense
        :rules="[(v) => !!v || '필수입력입니다.']"
      >
        <template v-slot:control>
          <q-btn-toggle
            v-model="form.role"
            flat
            text-color="grey-8"
            toggle-color="primary"
            :options="roleOptions"
          ></q-btn-toggle>
        </template>
      </q-field>

      <InputImage v-model="form.photo" label="사진" outlined></InputImage>

      <div>
        <q-btn label="회원가입" type="submit" color="primary" />
        <q-btn label="취소" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <pre>{{ form }}</pre>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import InputPassword from "src/components/forms/InputPassword.vue";
import InputPhone from "src/components/forms/InputPhone.vue";
import InputDate from "src/components/forms/InputDate.vue";
import InputImage from "src/components/forms/InputImage.vue";
import defineReg from "src/util/defineReg";
import { debounce } from "quasar";
import userApi from "src/apis/userApi";

export default defineComponent({
  components: { InputPassword, InputPhone, InputDate, InputImage },
  name: "JoinPage",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        tel: "",
        birth: "",
        sex: "",
        role: "",
        photo: null,
      },
      checkPw: "",
    };
  },
  computed: {
    defineReg: () => defineReg,
    sexOptions() {
      return [
        { label: "남성", value: "M" },
        { label: "여성", value: "F" },
      ];
    },
    roleOptions() {
      return [
        { label: "일반 사용자", value: "User" },
        { label: "사업자", value: "Company" },
        { label: "셀러", value: "Seller" },
      ];
    },
  },
  methods: {
    onValidError(ref) {
      if (ref && ref.$el) {
        ref.$el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    onSubmit() {
      console.log(this.form);
    },
    onReset() {
      this.form = {
        email: "",
        name: "",
        password: "",
        tel: "",
        birth: "",
        sex: "",
        role: "",
        photo: null,
      };
    },
    async changEmail(val) {
      const data = await userApi.overlabCheck(val);
      console.log("중복검사 결과",  data);
    },
  },
  created() {
    this.changEmail = debounce(this.changEmail, 1000);
  },
  mounted() {
    console.log("ENV", process.env.API_SERVER);
  },
});
</script>

<style lang="scss" scoped></style>
