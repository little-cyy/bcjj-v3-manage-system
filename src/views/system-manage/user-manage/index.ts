import { useAuthStore } from '@/store/auth'
import { type SearchBoxConfigs } from '@/types/search-box'
import { dayFormatter } from '@/utils/formatter'
import {
  getRoleLabel,
  getSexLabel,
  roleOptions,
  roleOptions2,
  sexOptions,
  startStateOptions
} from '@/utils/options-label'
import { storeToRefs } from 'pinia'
import { watchEffect, type WatchStopHandle } from 'vue'
import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
import PwdFormItemSlots from './tsx/PwdFormItemSlots'
const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
let roleOpts = roleOptions2
let stopWtach: WatchStopHandle = () => {}
stopWtach = watchEffect(() => {
  if (userInfo.value.role) {
    if (userInfo.value.role === 100) {
      roleOpts = roleOptions
    }
    stopWtach()
  }
})
export const columns: VxeGridPropTypes.Columns = [
  {
    title: '用户名',
    field: 'username',
    minWidth: '100px'
  },
  {
    title: '昵称',
    field: 'nickname',
    minWidth: '125px'
  },
  {
    title: '邮箱',
    field: 'email',
    minWidth: '120px'
  },
  {
    title: '性别',
    field: 'sex',
    width: '80px',
    formatter: ({ cellValue }) => {
      return getSexLabel(cellValue)
    }
  },

  {
    field: 'state',
    title: '状态',
    width: '80px',
    cellRender: {
      name: 'StateTag',
      options: startStateOptions
    }
  },

  {
    title: '角色',
    field: 'role',
    width: '80px',
    formatter: ({ cellValue }) => {
      return getRoleLabel(cellValue)
    }
  },
  {
    title: '工作单位',
    field: 'company',
    minWidth: '110px'
  },
  {
    title: '介绍',
    field: 'introduce',
    minWidth: '110px'
  },
  {
    title: '新建时间',
    field: 'createdAt',
    width: '100px',
    formatter: ({ cellValue }) => {
      return dayFormatter(cellValue)
    }
  },
  {
    title: '更新时间',
    field: 'updatedAt',
    width: '100px',
    formatter: ({ cellValue }) => {
      return dayFormatter(cellValue)
    }
  },
  {
    title: '操作',
    field: 'action',
    width: '150px',
    fixed: 'right',
    showOverflow: false,
    slots: { default: 'row-operate' }
  }
]
export const formItems: VxeFormPropTypes.Items = [
  {
    span: 12,
    field: 'username',
    title: '用户名',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入用户名' } }
  },
  {
    span: 12,
    field: 'nickname',
    title: '昵称',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入昵称' } }
  },
  {
    span: 12,
    field: 'sex',
    title: '性别',
    itemRender: {
      name: 'ElSelect',
      options: sexOptions,
      props: { placeholder: '请选择性别' }
    }
  },
  {
    span: 12,
    field: 'email',
    title: '邮箱',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入邮箱' } }
  },
  {
    span: 12,
    field: 'state',
    title: '状态',
    itemRender: {
      name: 'ElSelect',
      options: startStateOptions,
      props: { placeholder: '请选择状态' }
    }
  },
  {
    span: 12,
    field: 'role',
    title: '角色',
    itemRender: {
      name: 'ElSelect',
      options: roleOpts,
      props: { placeholder: '请选择角色' }
    }
  },
  {
    span: 12,
    field: 'company',
    title: '工作单位',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入工作单位' } }
  },
  {
    span: 12,
    field: 'introduce',
    title: '介绍',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入介绍' } }
  }
]
export const formRules: VxeFormPropTypes.Rules = {
  username: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请输入用户名')
          case !itemValue.trim():
            return new Error('空格无效')
        }
      }
    }
  ],
  nickname: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请输入昵称')
          case !itemValue.trim():
            return new Error('空格无效')
        }
      }
    }
  ],
  email: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请输入邮箱')
          case !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(itemValue):
            return new Error('请输入正确的邮箱')
        }
      }
    }
  ],
  sex: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请选择性别')
        }
      }
    }
  ],
  state: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case [null, undefined].includes(itemValue):
            return new Error('请选择状态')
        }
      }
    }
  ],
  role: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请选择角色')
        }
      }
    }
  ]
}
export const configs: SearchBoxConfigs[] = [
  {
    type: 'input',
    field: 'username',
    label: '用户名'
  },
  {
    type: 'input',
    field: 'nickname',
    label: '昵称'
  },
  {
    type: 'select',
    field: 'state',
    label: '状态',
    options: startStateOptions
  },
  {
    type: 'select',
    field: 'role',
    label: '角色',
    options: roleOptions
  }
]

export const updatePwdFormItems: VxeFormPropTypes.Items = [
  {
    field: 'username',
    title: '用户名',
    itemRender: { name: 'ElInput', props: { disabled: true } }
  },
  {
    field: 'password',
    title: '密码',
    slots: PwdFormItemSlots
  }
]
export const updatePwdFormRules: VxeFormPropTypes.Rules = {
  password: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请输入密码')
          case !itemValue.trim():
            return new Error('空格无效')
          case itemValue.length < 6 || itemValue.length > 45:
            return new Error('密码长度在6到45个字符之间')
        }
      }
    }
  ]
}
