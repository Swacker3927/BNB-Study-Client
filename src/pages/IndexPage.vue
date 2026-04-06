<template>
  <q-page padding>
    <h3>회원 관리페이지</h3>
    <ul>
      <li>완료: 회원 정보 수정</li>
      <li>관리자 - 회원 관리페이지</li>
      <li>권한별 메뉴</li>
      <li>관리권한별 페이지 접근</li>
      <li>회원 블럭(로그인 못하게)</li>
    </ul>
    <h3>회원 탈퇴</h3>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useUser from "src/stores/useUser";
import { mapState } from "pinia";

export default defineComponent({
  name: "IndexPage",
  computed: {
    ...mapState(useUser, ["user", "token"]),
  },
  mounted() {
    console.log(this.$api.defaults.headers.common);
  },
});
</script>
