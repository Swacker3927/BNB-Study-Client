<template>
  <q-input v-model="model" :mask="mask"></q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputPhone",
  emits: ["update:model-value"],
  props: {
    modelValue: { type: String, required: true }
  },
  data() {
    return {};
  },
  computed: {
    model: {
      set(val) {
        this.$emit("update:model-value", val);
      },
      get() {
        return this.modelValue;
      }
    },
    mask() {
      const val = this.modelValue.replace(/[^\d]/g, "");
      let mask = "###-####-####";
      if (val[0] != "0") {
        // 0으로 시작하지 않음 1588-1588
        mask = val.length < 8 ? "###-#####" : "####-####";
      } else if (val[1] == "2") {
        // 02시작 02-323-2222 02-3233-2323
        mask = val.length < 10 ? "##-###-#####" : "##-####-####";
      } else {
        if (val.startsWith("050")) {
          // 0504 이런거(안심번호) 0504-3333-3333
          mask = "####-####-####";
        } else {
          mask = val.length < 11 ? "###-###-#####" : "###-####-####";
        }
      }
      return mask;
    }
  }
});
</script>

<style lang="scss" scoped></style>
