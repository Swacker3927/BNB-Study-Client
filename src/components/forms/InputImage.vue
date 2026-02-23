<template>
  <q-file :label="label" v-model="model" accept=".jpg,.png,.jpeg,.gif" clearable>
    <MyTooltip v-if="img" dir="bottom">
      <q-card>
        <img :src="img" :alt="`${label} 미리보기`" style="max-width: 200px; max-height: 200px" />
        <q-card-section class="text-black text-center q-pa-sm">
          {{ label }} 미리보기
        </q-card-section>
      </q-card>
    </MyTooltip>
  </q-file>
</template>

<script>
import { defineComponent } from "vue";
import imageToBase64 from "src/util/imageToBase64";
import MyTooltip from "components/etc/MyTooltip.vue";

export default defineComponent({
  components: { MyTooltip },
  name: "InputImage",
  emits: ["update:model-value"],
  props: {
    modelValue: { type: [Object, null], required: true },
    label: { type: String, default: "이미지" }
  },
  data() {
    return {
      img: ""
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
    }
  },
  watch: {
    model() {
      this.setImage();
    }
  },
  methods: {
    async setImage() {
      if (this.model) {
        this.img = await imageToBase64(this.model);
      } else {
        this.img = "";
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
