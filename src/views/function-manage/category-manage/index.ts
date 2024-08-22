import { type SearchBoxConfigs } from '@/types/search-box'
import { timeFormatter } from '@/utils/formatter'
import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
export const columns: VxeGridPropTypes.Columns = [
  {
    type: 'checkbox',
    width: '50px'
  },
  {
    title: '分类名称',
    field: 'name',
    minWidth: '100px'
  },
  {
    title: '排序',
    field: 'rank',
    width: '80px',
    sortable: true
  },
  {
    title: '新建时间',
    field: 'createdAt',
    minWidth: '100px',
    formatter: ({ cellValue }) => {
      return timeFormatter(cellValue)
    }
  },
  {
    title: '更新时间',
    field: 'updatedAt',
    minWidth: '100px',
    formatter: ({ cellValue }) => {
      return timeFormatter(cellValue)
    }
  },
  {
    title: '操作',
    field: 'action',
    width: '120px',
    fixed: 'right',
    showOverflow: false,
    slots: { default: 'row-operate' }
  }
]
export const formItems: VxeFormPropTypes.Items = [
  {
    field: 'name',
    title: '分类',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入分类名称' } }
  },
  {
    field: 'rank',
    title: '排序',
    itemRender: { name: 'ElInput', props: { type: 'number', min: 1, placeholder: '请输入排序' } }
  }
]
export const formRules: VxeFormPropTypes.Rules = {
  name: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请输入分类名称')
          case !itemValue.trim():
            return new Error('空格无效')
        }
      }
    }
  ],
  rank: [
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
  ]
}
export const configs: SearchBoxConfigs[] = [
  {
    type: 'input',
    field: 'name',
    label: '分类名称'
  }
]
