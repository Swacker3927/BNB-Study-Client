<template>
  <q-input v-model="model" mask="####-##-##">
    <template #append>
      <q-btn icon="mdi-calendar" round flat tabindex="-1" dense>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-model="model"
            mask="YYYY-MM-DD"
            years-in-month-view
            :title="popupTitle"
            :subtitle="$attrs.label"
          >
            <q-btn
              v-close-popup
              icon="mdi-close"
              color="white"
              flat
              round
              style="position: absolute; top: 10px; right: 10px"
            />
            <slot></slot>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputDate",
  emits: ["update:model-value"],
  props: {
    modelValue: { type: String, required: true },
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
      },
    },
    popupTitle() {
      const pattern = /[\d]{4}-[\d]{2}-[\d]{2}/;
      if (pattern.test(this.modelValue)) {
        return this.modelValue.replace("-", "년 ").replace("-", "월 ") + "일";
      } else {
        return "선택하세요.";
      }
    },
  },
});
</script>

<style lang="scss">
.q-date__navigation > div:nth-child(1) {
  order: 4;
}
.q-date__navigation > div:nth-child(2) {
  order: 5;
}
.q-date__navigation > div:nth-child(3) {
  order: 6;
}
.q-date__navigation > div:nth-child(4) {
  order: 1;
}
.q-date__navigation > div:nth-child(5) {
  order: 2;
}
.q-date__navigation > div:nth-child(6) {
  order: 3;
}
</style>
