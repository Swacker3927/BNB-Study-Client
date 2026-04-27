<template>
  <q-btn :icon="icon" :loading="loading" @click="downloadCsv">
    <MyTooltip>CSV 다운로드</MyTooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";
import MyTooltip from "./MyTooltip.vue";
import { fasFileCsv } from "@quasar/extras/fontawesome-v6";
import { date } from "quasar";
import exportTable from "src/util/exportTable";

export default defineComponent({
  components: { MyTooltip },
  name: "ExportCsvButton",
  props: {
    icon: { type: String, default: fasFileCsv },
    columns: { type: Array, required: true },
    fetchApi: { type: Function, required: true },
    pagination: { type: Object, required: true },
    filename: { type: String, default: "download" },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    exportName() {
      return `${this.filename}_${date.formatDate(Date.now(), "YYYY-MM-DD")}`;
    },
    filteredColumns() {
      return this.columns.filter((col) => col.print !== false);
    },
    initPagination() {
      return { ...this.pagination, page: 1, rowsPerPage: 10000 };
    },
  },
  methods: {
    async downloadCsv() {
      this.loading = true;
      const data = await this.fetchApi(this.initPagination);
      let rows = [];
      if (data) {
        rows = data.rows.map((row, idx) => {
          row.no = data.count - idx;
          return row;
        });
        exportTable(this.exportName, this.filteredColumns, rows, this);
      }
      this.loading = false;
    },
  },
});
</script>

<style lang="scss"></style>
