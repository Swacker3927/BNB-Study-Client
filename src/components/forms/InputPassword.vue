<template>
  <q-input ref="input" v-model="model" :type="inputType">
    <template #append>
      <q-btn :icon="icon" flat round @click="show = !show" tabindex="-1"></q-btn>
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputPassword",
  emits: ["update:model-value"],
  expose: ["resetValidation"], // 기본 가시성 private 선언안하면 options API에서는 public, compositon API에서는 private
  props: {
    modelValue: { type: String, required: true }
  },
  data() {
    return {
      show: false
    };
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
    icon() {
      return this.show ? "mdi-eye-off-outline" : "mdi-eye-outline";
    },
    inputType() {
      return this.show ? "text" : "password";
    }
  },
  methods: {
    resetValidation() {
      this.$refs.input.resetValidation();
    }
  }
});
</script>

<style lang="scss" scoped></style>
