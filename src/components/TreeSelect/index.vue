<template>
  <!-- 使用el-tree-select组件，绑定ref属性为treeSelectDom，v-model绑定value，v-bind绑定$attrs，:data绑定props.options，监听change事件 -->
  <el-tree-select ref="treeSelectDom" v-model="value" v-bind="$attrs" :data="props.options"
    @change="change"></el-tree-select>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps(['needHalfCheckedKeys', 'modelValue', 'options'])
const emits = defineEmits(['update:model-value'])
// 定义treeSelectDom属性，为ref类型
const treeSelectDom = ref()
// 定义value属性，为ref类型，初始值为props.modelValue
let value = ref(props.modelValue)

//设置默认选中节点
function defaultChecked() {
  if (!props.needHalfCheckedKeys) return
  // 将props.options深拷贝一份
  const checkedKeys = JSON.parse(JSON.stringify(props.options))
  // 定义keys数组，用于存储选中的key
  let keys: Array<number> = []
  // 定义updateCheck函数，用于更新选中状态
  function updateCheck(tree: Record<string, any>[]) {
    tree.forEach((node: Record<string, any>) => {
      if (node.children && node.children.length) {
        return updateCheck(node.children)
      }
      if (props.modelValue.includes(node.value)) {
        keys.push(node.value)
      }
    });
  }
  // 调用updateCheck函数
  updateCheck(checkedKeys)
  // 将keys数组排序后赋值给value
  value.value = keys.sort()

}



// change事件处理函数
const change = (data: any) => {
  if (props.needHalfCheckedKeys) {
    setTimeout(() => {
      // 全选状态数据
      const checkedKeys = treeSelectDom.value.getCheckedKeys()
      // 半选状态数据
      const halfSelected = treeSelectDom.value.getHalfCheckedKeys()
      // 包含全选与半选状态的数据
      emits('update:model-value', checkedKeys.concat(halfSelected).sort())
    }, 0);

  } else {
    emits('update:model-value', value.value)
  }
}

// 组件挂载后调用defaultChecked函数
onMounted(() => {
  defaultChecked()
})

</script>
<style lang="scss" scoped></style>