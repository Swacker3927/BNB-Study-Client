<template>
  <q-page>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="email"
      v-model:pagination="pagination"
      @request="onRequest"
      v-model:selected="selected"
      selection="multiple"
    >
      <template #bottom>
        <TableFooter
          v-model:pagination="pagination"
          @request="onRequest"
          v-model:selected="selected"
        >
          <q-btn icon="mdi-close" color="red" round dense size="sm"></q-btn>
          <q-btn icon="mdi-close" color="red" round dense size="sm"></q-btn>
        </TableFooter>
      </template>
    </q-table>
    <ul>
      <li>필드정리</li>
      <li>개별 회원 정보 수정</li>
      <li>회원 차단</li>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import adminUserApi from "src/apis/adminUserApi";
import TableFooter from "src/components/etc/TableFooter.vue";
export default defineComponent({
  components: { TableFooter },
  name: "AdmUserPage",
  data() {
    return {
      selected: [],
      pagination: {
        page: 1,
        rowsPerPage: 2,
        sortBy: "createdAt",
        descending: false,
        rowsNumber: 0, // 서버사이드에서 가져온다! 약속
      },
      rows: [],
      columns: [
        { name: "email", label: "이메일", field: "email", sortable: true },
        { name: "name", label: "이름", field: "name", sortable: true },
        { name: "tel", label: "tel", field: "tel", sortable: false },
        {
          name: "createdAt",
          label: "가입일",
          field: "createdAt",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    async onRequest({ pagination }) {
      const data = await adminUserApi.list(pagination);
      if (data) {
        this.selected = [];
        this.rows = data.rows;
        this.pagination = {
          ...pagination,
          rowsNumber: data.count,
        };
      }
    },
  },
  mounted() {
    this.onRequest({ pagination: this.pagination });
  },
});
</script>

<style lang="scss"></style>
