import { useDictionaryStore } from '@/store/dictionary'
import { type SearchBoxConfigs } from '@/types/search-box'
import { dayFormatter, isOrNotFormatter } from '@/utils/formatter'
import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
const dictionaryStore = useDictionaryStore()
const isOrNotOptions = [
  { label: '是', value: true },
  { label: '否', value: false }
]
export const useConfigs = async () => {
  const categoryDic = await dictionaryStore.getDictionaryRefreshTer('category')
  //#region columns
  const columns: VxeGridPropTypes.Columns = [
    {
      type: 'checkbox',
      width: '50px'
    },
    {
      title: '课程名称',
      field: 'name',
      minWidth: '100px'
    },
    {
      title: '所属分类',
      field: 'category',
      minWidth: '80px',
      formatter: ({ cellValue }) => {
        return cellValue?.name
      }
    },
    {
      title: '是否推荐课程',
      field: 'recommended',
      width: '110px',
      formatter: ({ cellValue }) => {
        return isOrNotFormatter(cellValue)
      }
    },
    {
      title: '是否入门课程',
      field: 'introductory',
      width: '110px',
      formatter: ({ cellValue }) => {
        return isOrNotFormatter(cellValue)
      }
    },
    {
      title: '创建人员',
      field: 'user',
      minWidth: '80px',
      formatter: ({ cellValue }) => {
        return cellValue?.username
      }
    },
    {
      title: '课程内容',
      field: 'content',
      minWidth: '80px'
    },
    {
      title: '点赞数量',
      field: 'likesCount',
      width: '80px'
    },
    { title: '章节数量', field: 'chaptersCount', width: '80px' },
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
      width: '120px',
      fixed: 'right',
      showOverflow: false,
      slots: { default: 'row-operate' }
    }
  ]
  //#endregion

  //#region formItems
  const formItems: VxeFormPropTypes.Items = [
    {
      span: 12,
      field: 'name',
      title: '课程',
      itemRender: { name: 'ElInput', props: { placeholder: '请输入课程名称' } }
    },
    {
      span: 12,
      field: 'categoryId',
      title: '所属分类',
      itemRender: {
        name: 'ElSelect',
        options: categoryDic,
        props: { placeholder: '请选择所属分类' }
      }
    },
    {
      span: 12,
      field: 'recommended',
      title: '是否推荐课程',
      itemRender: {
        name: 'ElSelect',
        options: isOrNotOptions,
        props: { placeholder: '请选择是否推荐课程' }
      }
    },
    {
      span: 12,
      field: 'introductory',
      title: '是否入门课程',
      itemRender: {
        name: 'ElSelect',
        options: isOrNotOptions,
        props: { placeholder: '请选择是否入门课程' }
      }
    },
    {
      span: 12,
      field: 'likesCount',
      title: '点赞数量',
      itemRender: {
        name: 'ElInput',
        props: { type: 'number', min: 0, placeholder: '请输入点赞数量' }
      }
    },
    {
      span: 12,
      field: 'chaptersCount',
      title: '章节数量',
      itemRender: {
        name: 'ElInput',
        props: { type: 'number', min: 0, placeholder: '请输入章节数量' }
      }
    },
    {
      span: 24,
      field: 'content',
      title: '课程内容',
      itemRender: {
        name: 'ElInput',
        props: {
          type: 'textarea',
          autosize: { minRows: 2, maxRows: 4 },
          resize: 'none',
          placeholder: '请输入课程内容'
        }
      }
    }
  ]
  //#endregion

  //#region formRules
  const formRules: VxeFormPropTypes.Rules = {
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
    categoryId: [{ required: true, message: '请选择分类' }],
    likesCount: [
      {
        validator: ({ itemValue }) => {
          switch (true) {
            case !isNaN(Number(itemValue)) && Number(itemValue) < 0:
              return new Error('点赞数量必须是不小于0的整数')
          }
        }
      }
    ],
    chaptersCount: [
      {
        validator: ({ itemValue }) => {
          switch (true) {
            case !isNaN(Number(itemValue)) && Number(itemValue) < 0:
              return new Error('章节数量必须是不小于0的整数')
          }
        }
      }
    ]
  }
  //#endregion

  //#region configs
  const SearchConfigs: SearchBoxConfigs[] = [
    {
      type: 'select',
      field: 'categoryId',
      label: '所属分类',
      options: categoryDic
    },
    {
      type: 'input',
      field: 'name',
      label: '课程名称'
    },
    {
      type: 'select',
      field: 'recommended',
      label: '是否推荐课程',
      options: isOrNotOptions
    },
    {
      type: 'select',
      field: 'introductory',
      label: '是否入门课程',
      options: isOrNotOptions
    }
  ]
  //#endregion
  return {
    columns,
    formItems,
    formRules,
    SearchConfigs
  }
}
