<template>
  <md-editor v-model="model" v-bind="options" @on-upload-img="onUploadImg" class="custom-md-editor" />
</template>
<script setup lang="ts">
import { uploadMdEditorApi } from '@/api/upload'
import type { FileData } from '@/api/upload/type'
import 'highlight.js/styles/github.css'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref } from 'vue'
const props = defineProps(['props'])
const model = defineModel()

// 工具栏配置
const toolbars = [
  'bold',
  'italic',
  'strikethrough',
  'heading',
  'quote',
  'ordered-list',
  'unordered-list',
  'link',
  'image',
  'table',
  'line',
  'code',
  'code-block',
  'preview',
  'fullscreen',
]

// 图片上传函数
const onUploadImg = async (files: File[], callback: Function) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append(`file`, file)
  })
  const { data } = await uploadMdEditorApi(formData)
  data.files.forEach((ff: FileData) => {
    // model.value += `\n![${encodeURIComponent(ff.originalname.split('.')[0])}](${ff.url})\n`
  })
  callback(data.files.map((ff: FileData) => ff.url));
}
const options = ref({
  previewTheme: "github",
  codeTheme: "github",
  toolbars,
  style: {
    height: "60vh",
  },
  ...props.props
})
</script>
<style lang="scss" scoped>
// 添加自定义样式来覆盖默认样式
.custom-md-editor {
  white-space: normal;
}
</style>
