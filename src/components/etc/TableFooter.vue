<template>
  <div class="row full-width items-center">
    <div v-if="selected.length > 0" class="q-gutter-x-xs">
      <slot></slot>
      <q-btn
        icon="mdi-delete"
        dense
        color="black"
        size="sm"
        round
        @click="unSelect"
      ></q-btn>
    </div>

    <q-space></q-space>
    <q-pagination
      v-model="page"
      color="grey-8"
      :max="pagesNumber"
      size="sm"
    ></q-pagination>
    <q-space></q-space>
    <q-select
      v-model="rowsPerPage"
      :options="pageOptions"
      dense
      outlined
    ></q-select>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableFooter",
  emits: ["request", "update:selected"],
  props: {
    pagination: { type: Object, requred: true },
    pageOptions: { type: Array, default: [2, 5, 10, 20, 50, 100] },
    selected: { type: Array, default: [] },
  },
  data() {
    return {};
  },
  computed: {
    page: {
      get() {
        return this.pagination.page;
      },
      set(val) {
        this.$emit("request", {
          pagination: { ...this.pagination, page: val },
        });
      },
    },
    rowsPerPage: {
      get() {
        return this.pagination.rowsPerPage;
      },
      set(val) {
        this.$emit("request", {
          pagination: { ...this.pagination, rowsPerPage: val },
        });
      },
    },
    pagesNumber() {
      const { rowsNumber, rowsPerPage } = this.pagination;
      return Math.ceil(rowsNumber / rowsPerPage);
    },
  },
  methods: {
    unSelect() {
      this.$emit("update:selected", []);
    },
  },
});
</script>

<style lang="scss"></style>
