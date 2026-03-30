<template>
  <q-page padding>
    <h2 class="text-center q-my-md fw500">회원 정보 수정</h2>
    <p class="text-right text-grey-8 q-mt-none">
      <span style="color: red; font-size: 1.25em">*</span>
      비밀번호를 변경하시면 비밀번호가 변경됩니다.
    </p>
    <q-form
      @submit="onSubmit"
      @reset="init"
      @validation-error="onValidError"
      class="q-gutter-md"
    >
      <q-input v-model.trim="email" label="이메일" outlined readonly />
      <q-input
        v-model.trim="form.name"
        label="이름"
        outlined
        :rules="[
          (v) => !!v || '필수입력입니다.',
          (v) => v.length >= 2 || '이름은 2자 이상 입력하세요.',
        ]"
        class="required"
      />
      <InputPassword
        ref="inputPw"
        v-model.trim="form.password"
        label="비밀번호"
        outlined
        :rules="pwRules"
        :class="{ required: !!form.password }"
      />
      <InputPassword
        ref="inputChkPW"
        v-model.trim="checkPw"
        label="비밀번호 확인"
        outlined
        :rules="[
          (v) => v == form.password || '동일한 비밀번호를 한번 더 입력하세요.',
        ]"
        :class="{ required: !!form.password }"
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
        class="required"
      ></InputPhone>
      <InputDate
        v-model="form.birth"
        label="생년월일"
        outlined
        :rules="[
          (v) => !!v || '필수입력입니다.',
          (v) => defineReg.date.test(v) || 'YYYY-MM-DD 형식으로 입력하세요.',
        ]"
        class="required"
      ></InputDate>

      <q-field
        outlined
        v-model="form.sex"
        label="성별"
        stack-label
        dense
        :rules="[(v) => !!v || '필수입력입니다.']"
        class="required"
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

      <InputImage
        v-model="form.photo"
        :source="source"
        label="사진"
        outlined
      ></InputImage>

      <div class="row justify-center">
        <q-btn label="초기화" type="reset" color="primary" flat />
        <q-btn
          label="회원정보수정"
          type="submit"
          color="primary"
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <!-- <q-btn label="폼테스트" @click="testForm"></q-btn> -->
    <!-- <pre>{{ form }}</pre> -->
     <pre>{{ user }}</pre>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import InputPassword from "src/components/forms/InputPassword.vue";
import InputPhone from "src/components/forms/InputPhone.vue";
import InputDate from "src/components/forms/InputDate.vue";
import InputImage from "src/components/forms/InputImage.vue";
import defineReg from "src/util/defineReg";
import userApi from "src/apis/userApi";
import useUser from "src/stores/useUser";
import { mapActions, mapState } from "pinia";

export default defineComponent({
  components: { InputPassword, InputPhone, InputDate, InputImage },
  name: "ModifyPage",
  data() {
    return {
      email: "",
      form: {
        name: "",
        password: "",
        tel: "",
        birth: "",
        sex: "",
        photo: null,
      },
      checkPw: "",
    };
  },
  computed: {
    ...mapState(useUser, ["user"]),
    defineReg: () => defineReg,
    sexOptions() {
      return [
        { label: "남성", value: "M" },
        { label: "여성", value: "F" },
      ];
    },
    pwRules() {
      if (this.form.password) {
        return [
          (v) => !!v || "필수입력입니다.",
          (v) =>
            defineReg.password.test(v) ||
            "대소문자,숫자,특수문자(@$!%*?&)포함 6자 이상 입력하세요.",
        ];
      } else {
        return [];
      }
    },
  },
  watch: {
    "form.password"(newVal) {
      if (!newVal) {
        this.$refs.inputPw.resetValidation();
        this.checkPw = "";
        this.$refs.inputChkPW.resetValidation();
      }
    },
  },
  methods: {
    ...mapActions(useUser, ["modifyUser"]),
    init() {
      this.email = this.user.email;
      this.form = {
        name: this.user.name,
        tel: this.user.tel,
        birth: this.user.birth,
        sex: this.user.sex,
        photo: null,
        password: "",
      };
      this.source = this.user.photo;
      this.checkPw = "";
    },
    onValidError(ref) {
      if (ref && ref.$el) {
        ref.$el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    async onSubmit() {
      this.$q.loading.show();
      const data = await userApi.modify(this.email, this.form);
      this.$q.loading.hide();
      console.log(data);
      if (data) {
        const newUser = {
          name: this.form.name,
          tel: this.form.tel,
          birth: this.form.birth,
          sex: this.form.sex,
        };
        if (data.photo) {
          newUser.photo = data.photo;
        }
        this.modifyUser(newUser);
        this.$q.notify({
          type: "positive",
          message: "회원정보가 변경되었습니다.",
        });
      }
    },
  },
  created() {
    this.init();
  },
  mounted() {},
});
</script>

<style lang="scss" scoped></style>
