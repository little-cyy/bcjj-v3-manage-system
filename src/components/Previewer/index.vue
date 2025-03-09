<template>
  <MdPreview :editorId="id" v-model="model" v-bind="options" class="custom-md-preview" />
  <!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { ref } from 'vue';

const id = 'preview-only';
const scrollElement = document.documentElement;
const props = defineProps(['props'])
const model = defineModel()
const options = ref({
  previewTheme: "github",
  codeTheme: "github",
  style: {
    height: "60vh",
  },
  ...props.props
})
</script>
<style lang="scss" scoped>
.custom-md-preview {
  white-space: normal;
  border: 1px solid var(--md-border-color);
}
</style>