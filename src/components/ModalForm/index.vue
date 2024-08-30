<template>
  <vxe-modal ref="xModalDom" v-bind="xModalOpt">
    <vxe-form ref="xFormDom" v-bind="xFormOpt" />
  </vxe-modal>
</template>
<script setup lang="ts">
import { type MordalFormProps } from '@/types/modal-form';
import { ElMessage } from "element-plus";
import { nextTick, reactive, ref, toRefs } from "vue";
import { type VxeFormInstance, type VxeFormProps, type VxeModalInstance, type VxeModalProps } from 'vxe-table';

const props = withDefaults(defineProps<MordalFormProps>(), {})
const emits = defineEmits(['asyncGetFormData', 'sumbitForm', 'submit-success'])
const { modalTitle, modalWidth } = toRefs(props)

//#region vxe-modal
const xModalDom = ref<VxeModalInstance>()
const xModalOpt: VxeModalProps = reactive({
  title: modalTitle,
  width: modalWidth,
  showClose: true,
  escClosable: true,
  maskClosable: false,
  destroyOnClose: true,
  beforeHideMethod: () => {
    xFormDom.value?.clearValidate()
    return Promise.resolve()
  }
})
//endregion

//#region vxe-form
const xFormDom = ref<VxeFormInstance>()
const xFormOpt: VxeFormProps = reactive({
  span: 24,
  titleWidth: "100px",
  loading: false,
  titleColon: false,
  titleAlign: 'right',
  data: {},
  items: [
    ...props.formItems,
    {
      align: "right",
      itemRender: {
        name: "$buttons",
        children: [
          { props: { content: "取消" }, events: { click: () => xModalDom.value?.close() } },
          {
            props: { type: "submit", content: "确定", status: "primary" },
            events: { click: () => onSubmitForm() }
          }
        ]
      }
    }
  ],
  rules: props.formRules
})
//#endregion 




/** 点击显示弹窗 */
const onShowModal = (formData?: Record<string, any>, asyncFormData?: boolean) => {
  if (asyncFormData) {
    xFormOpt.loading = true
    const callback = (data: Record<string, any>) => {
      xFormOpt.loading = false
      xFormOpt.data = JSON.parse(JSON.stringify(data))
    }
    emits('asyncGetFormData', formData, callback)
  }
  else {
    xFormOpt.data = JSON.parse(JSON.stringify(formData))
  }
  xModalDom.value?.open()
  nextTick(() => {
    !xFormOpt.data && xFormDom.value?.reset()
    xFormDom.value?.clearValidate()
  })
}
/** 点击确定按钮 */
const onSubmitForm = async () => {
  const errMap = await xFormDom.value?.validate()
  if (errMap) return
  xFormOpt.loading = true
  const callback = (isSuccess: boolean = true) => {
    xFormOpt.loading = false
    if (!isSuccess) return
    xModalDom.value?.close()
    ElMessage.success("操作成功")
    //成功之后的回调
    emits('submit-success')
  }
  //这里开始调接口
  if (props.submitApi) {
    props.submitApi && props.submitApi(xFormOpt.data).then(() => {
      callback()
    }).catch(() => {
      callback(false)
    })
  } else {
    emits('sumbitForm', xFormOpt.data, callback)
  }
}

defineExpose({
  onShowModal
})
</script>
<style lang="scss" scoped></style>