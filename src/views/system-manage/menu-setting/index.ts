import { type SearchBoxConfigs } from '@/types/search-box'
import { dayFormatter, isOrNotFormatter } from '@/utils/formatter'
import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
const isOrNotOptions = [
  { label: '是', value: true },
  { label: '否', value: false }
]
export const columns: VxeGridPropTypes.Columns = [
  {
    title: '菜单标题',
    field: 'title',
    minWidth: '100px',
    treeNode: true
  },
  {
    title: '菜单路径',
    field: 'path',
    minWidth: '120px'
  },
  {
    title: '菜单名称',
    field: 'name',
    minWidth: '110px'
  },
  {
    title: '排序',
    field: 'order',
    width: '70px',
    sortable: true
  },
  {
    title: '是否显示',
    field: 'isShow',
    width: '80px',
    formatter({ cellValue }) {
      return isOrNotFormatter(cellValue)
    }
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
    width: '80px',
    fixed: 'right',
    showOverflow: false,
    slots: { default: 'row-operate' }
  }
]
export const formItems: VxeFormPropTypes.Items = [
  {
    field: 'title',
    title: '菜单标题',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入菜单标题' } }
  },
  {
    field: 'order',
    title: '排序',
    itemRender: { name: 'ElInput', props: { type: 'number', min: 1, placeholder: '请输入排序' } }
  },
  {
    field: 'isShow',
    title: '是否显示',
    itemRender: {
      name: 'ElSelect',
      options: isOrNotOptions,
      props: { placeholder: '请选择是否显示' }
    }
  }
]
export const formRules: VxeFormPropTypes.Rules = {
  order: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请输入排序')
          case !isNaN(Number(itemValue)) && Number(itemValue) <= 0:
            return new Error('排序必须是正整数')
        }
      }
    }
  ],
  isShow: [
    {
      required: true
    }
  ]
}
export const configs: SearchBoxConfigs[] = [
  {
    type: 'input',
    field: 'title',
    label: '菜单标题'
  },
  {
    type: 'input',
    field: 'name',
    label: '菜单名称'
  }
]
