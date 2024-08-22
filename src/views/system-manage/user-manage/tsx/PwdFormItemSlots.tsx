import { type VxeFormItemPropTypes } from 'vxe-table/types/form-item'

const slots: VxeFormItemPropTypes.Slots = {
  default: ({ data, item, field }) => {
    const slot = {
      append: () => (
        <el-button class="el-button-restore" type="primary" v-slots={slot} onclick={reset}>
          重置密码
        </el-button>
      )
    }

    const reset = () => {
      data[field] = '123123'
    }
    return [
      <el-input type="password" show-password v-model={data[field]} v-slots={slot}></el-input>
    ]
  }
}

export default slots
