<template>
  <q-tooltip v-bind="bindAttr" :offset="offset" transition-show="rotate" transition-hide="rotate">
    <slot></slot>
  </q-tooltip>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyTooltip",
  props: {
    offset: { type: Array, default: [10, 10] },
    dir: { type: String, default: "top" } // bottom, left, right
  },
  data() {
    return {};
  },
  computed: {
    bindAttr() {
      switch (this.dir) {
        case "left":
        case "l":
          return { anchor: "center left", self: "center right" };
        case "right":
        case "r":
          return { anchor: "center right", self: "center left" };
        case "bottom":
        case "b":
          return { anchor: "bottom middle", self: "top middle" };
        default:
          return { anchor: "top middle", self: "bottom middle" };
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
