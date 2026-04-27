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
      <template #top>
        <h3 class="q-ma-none">회원관리</h3>
        <q-space></q-space>
        <q-input
          v-model="pagination.search"
          label="검색"
          dense
          outlined
          clearable
          clear-icon="mdi-close"
          @clear="searchClear"
          @keyup.enter="searchData"
          style="width: 200px"
        >
          <template #append>
            <q-btn
              icon="mdi-magnify"
              dense
              round
              flat
              @click="searchData"
            ></q-btn>
          </template>
        </q-input>
        <ExportCsvButton
          flat
          color="purple"
          :columns="columns"
          :fetch-api="fetchApi"
          :pagination="pagination"
          filename="회원관리"
        ></ExportCsvButton>
      </template>

      <template #body-cell-photoUrl="props">
        <q-td :props="props">
          <q-img
            width="60px"
            ratio="1"
            fit="contain"
            :src="props.value"
          ></q-img>
        </q-td>
      </template>

      <template #body-cell-cmd="props">
        <q-td :props="props">
          <q-btn icon="mdi-pencil-outline" dense round flat></q-btn>
        </q-td>
      </template>

      <template #bottom>
        <TableFooter
          v-model:pagination="pagination"
          @request="onRequest"
          v-model:selected="selected"
        >
        </TableFooter>
      </template>
    </q-table>
    <ul>
      <li>필드정리 : 완료</li>
      <li>개별 회원 정보 수정</li>
      <li>회원 차단</li>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import adminUserApi from "src/apis/adminUserApi";
import TableFooter from "src/components/etc/TableFooter.vue";
import { date } from "quasar";
import userApi from "src/apis/userApi";
import ExportCsvButton from "src/components/etc/ExportCsvButton.vue";

export default defineComponent({
  components: { TableFooter, ExportCsvButton },
  name: "AdmUserPage",
  data() {
    return {
      selected: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "createdAt",
        descending: false,
        rowsNumber: 0, // 서버사이드에서 가져온다! 약속
        search: "",
      },
      rows: [],
      columns: [
        {
          name: "no",
          label: "#",
          field: "no",
          sortable: false,
          align: "left",
        },
        {
          name: "email",
          label: "이메일",
          field: "email",
          sortable: true,
          align: "left",
        },
        {
          name: "name",
          label: "이름",
          field: "name",
          sortable: true,
          align: "left",
        },
        {
          name: "photoUrl",
          label: "사진",
          field: "photoUrl",
          sortable: false,
          align: "center",
          format: (val, row) => userApi.photoUrl(val),
        },
        {
          name: "tel",
          label: "전화번호",
          field: "tel",
          sortable: false,
          align: "left",
        },
        {
          name: "birth",
          label: "생일",
          field: "birth",
          sortable: false,
          align: "left",
        },
        {
          name: "sex",
          label: "성별",
          field: "sex",
          sortable: true,
          align: "center",
          format: (val, row) => (val == "M" ? "남" : "여"),
        },
        {
          name: "role",
          label: "역활",
          field: "role",
          sortable: true,
          align: "center",
          format: (val, row) => {
            switch (val) {
              case "Admin":
                return "관리자";
              case "User":
                return "사용자";
              case "Seller":
                return "대행사";
              case "Company":
                return "입점회사";
              default:
                return val;
            }
          },
        },
        {
          name: "connectedAt",
          label: "최근접속일",
          field: "connectedAt",
          sortable: true,
          format: (val, row) => date.formatDate(val, "YYYY-MM-DD HH:mm"),
        },
        {
          name: "createdAt",
          label: "가입일",
          field: "createdAt",
          sortable: true,
          format: (val, row) => date.formatDate(val, "YYYY-MM-DD"),
        },
        {
          name: "cmd",
          sortable: false,
          print: false,
        },
      ],
    };
  },
  computed: {
    fetchApi: () => adminUserApi.list,
  },
  methods: {
    async onRequest({ pagination }) {
      const data = await adminUserApi.list(pagination);
      if (data) {
        this.selected = [];

        this.rows = data.rows.map((row, idx) => {
          row.no = data.count - idx;
          return row;
        });

        this.pagination = {
          ...pagination,
          rowsNumber: data.count,
        };
      }
    },
    fetchData() {
      this.onRequest({ pagination: this.pagination });
    },
    searchData() {
      if (!this.pagination.search) {
        this.$q.notify({ type: "negative", message: "검색어를 입력하세요" });
        return;
      }
      this.fetchData();
    },
    searchClear() {
      this.pagination.search = "";
      this.pagination.page = 1;
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>

<style lang="scss"></style>
