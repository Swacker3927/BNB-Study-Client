<template>
  <q-page padding>
    <h2 class="text-center q-my-md fw500">회원가입</h2>
    <p class="text-right text-grey-8 q-mt-none">
      <span style="color: red; font-size: 1.25em">*</span>는 필수 입력입니다.
    </p>
    <q-form @submit="onSubmit" @reset="onReset" @validation-error="onValidError" class="q-gutter-md">
      <q-input ref="inputEmail" v-model.trim="form.email" label="이메일" outlined @update:model-value="changEmail" :rules="[
        (v) => !!v || '필수입력입니다.',
        (v) =>
          defineReg.email.test(v) || '올바른 이메일 형식으로 입력하세요.',
        (v) => emailCheck.valid || '중복된 이메일 입니다.',
      ]" :loading="emailCheck.loading" class="required" />
      <q-input v-model.trim="form.name" label="이름" outlined :rules="[
        (v) => !!v || '필수입력입니다.',
        (v) => v.length >= 2 || '이름은 2자이상 입력하세요.',
      ]" class="required" />
      <InputPassword v-model.trim="form.password" label="비밀번호" outlined :rules="[
        (v) => !!v || '필수입력입니다.',
        (v) =>
          defineReg.password.test(v) ||
          '대소문자,숫자,특수문자(@$!%*?&)포함 6자 이상 입력하세요.',
      ]" class="required" />
      <InputPassword v-model.trim="checkPw" label="비밀번호 확인" outlined :rules="[
        (v) => v == form.password || '동일한 비밀번호를 한번더 입력하세요.',
      ]" class="required" />
      <InputPhone v-model="form.tel" label="전화번호" outlined :rules="[
        (v) => !!v || '필수입력입니다.',
        (v) =>
          defineReg.phone(v).test(v) || '올바른 전화번호 형식을 입력하세요.',
      ]" class="required"></InputPhone>
      <InputDate v-model="form.birth" label="생년월일" outlined :rules="[
        (v) => !!v || '필수입력입니다.',
        (v) => defineReg.date.test(v) || 'YYYY-MM-DD 형식으로 입력하세요.',
      ]" class="required"></InputDate>

      <q-field outlined v-model="form.sex" label="성별" stack-label dense :rules="[(v) => !!v || '필수입력입니다.']"
        class="required">
        <template v-slot:control>
          <q-btn-toggle v-model="form.sex" flat text-color="grey-8" toggle-color="primary"
            :options="sexOptions"></q-btn-toggle>
        </template>
      </q-field>

      <q-field outlined v-model="form.role" label="가입유형" stack-label dense :rules="[(v) => !!v || '필수입력입니다.']"
        class="required">
        <template v-slot:control>
          <q-btn-toggle v-model="form.role" flat text-color="grey-8" toggle-color="primary"
            :options="roleOptions"></q-btn-toggle>
        </template>
      </q-field>

      <InputImage v-model="form.photo" label="사진" outlined></InputImage>

      <div>
        <q-btn label="회원가입" type="submit" color="primary" />
        <q-btn label="취소" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <q-btn label="폼테스트" @click="testForm"></q-btn>
    <!-- <pre>{{ form }}</pre> -->
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
      emailCheck: {
        loading: false,
        valid: false,
        controller: null,
      },
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
    async onSubmit() {
      this.$q.loading.show();
      const data = await userApi.join(this.form);
      this.$q.loading.hide();
      if (data) {
        this.$q
          .dialog({
            title: "회원가입",
            message: `${this.form.name}님 회원가입을 축하합니다.`,
            persistent: true,
          })
          .onOk(() => {
            // TODO: 로그인 페이지로 이동
            this.$router.push({ name: "home" });
          });
      }
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
    testForm() {
      this.form = {
        email: "test@test.com",
        name: "이태우",
        password: "Abcd12!@",
        tel: "01011111111",
        birth: "1990-11-18",
        sex: "M",
        role: "User",
        photo: null,
      };
      this.checkPw = "Abcd12!@";
    },
    async changEmail(val) {
      if (!defineReg.email.test(val)) {
        // console.log("유효한 이메일이 아님", val);
        return;
      }
      try {
        this.emailCheck.loading = true;
        this.emailCheck.valid = false;
        this.$refs.inputEmail.validate();

        // 먼저 요청한게 있다면 취소 한다.
        if (this.emailCheck.controller) {
          this.emailCheck.controller.abort();
        }

        this.emailCheck.controller = new AbortController();

        const data = await userApi.overlabCheck(
          val,
          this.emailCheck.controller
        );
        this.emailCheck.valid = data; // true 사용가능
        this.$refs.inputEmail.validate();
        // console.log("중복검사 결과", data);
      } catch (e) {
        // console.log("요청이 취소됨");
      } finally {
        this.emailCheck.loading = false;
      }
    },
  },
  created() {
    this.changEmail = debounce(this.changEmail, 250);
  },
  mounted() {
    console.log("ENV", process.env.API_SERVER);
  },
});
</script>

<style lang="scss" scoped></style>
