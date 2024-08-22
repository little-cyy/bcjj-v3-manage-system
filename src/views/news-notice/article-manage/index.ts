import { type SearchBoxConfigs } from '@/types/search-box'
import { timeFormatter } from '@/utils/formatter'
import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
export const columns: VxeGridPropTypes.Columns = [
  {
    type: 'checkbox',
    width: '50px'
  },
  {
    title: '文章标题',
    field: 'title',
    minWidth: '100px'
  },
  {
    title: '文章内容',
    field: 'content',
    minWidth: '80px'
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
    field: 'title',
    title: '文章标题',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入文章标题' } }
  },
  {
    field: 'content',
    title: '文章内容',
    itemRender: {
      name: 'ElInput',
      props: {
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 6 },
        resize: 'none',
        placeholder: '请输入文章内容'
      }
    }
  }
]
export const formRules: VxeFormPropTypes.Rules = {
  title: [
    {
      required: true,
      validator: ({ itemValue }) => {
        switch (true) {
          case !itemValue:
            return new Error('请输入文章标题')
          case !itemValue.trim():
            return new Error('空格无效')
        }
      }
    }
  ]
}
export const configs: SearchBoxConfigs[] = [
  {
    type: 'input',
    field: 'title',
    label: '文章标题'
  }
]
