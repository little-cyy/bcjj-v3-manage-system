import { useDictionaryStore } from '@/store/dictionary'
import { type SearchBoxConfigs } from '@/types/search-box'
import { dayFormatter } from '@/utils/formatter'
import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
const dictionaryStore = useDictionaryStore()
//
export const useConfigs = async () => {
  const courseDic = await dictionaryStore.getDictionaryRefreshTer('course')
  //#region columns
  const columns: VxeGridPropTypes.Columns = [
    {
      type: 'checkbox',
      width: '50px'
    },
    {
      title: '章节标题',
      field: 'title',
      minWidth: '100px'
    },
    {
      title: '所属课程',
      field: 'course',
      minWidth: '80px',
      formatter: ({ cellValue }) => {
        return cellValue?.name
      }
    },
    {
      title: '排序',
      field: 'rank',
      width: '80px',
      sortable: true
    },
    {
      title: '章节内容',
      field: 'content',
      minWidth: '80px'
    },
    {
      title: '视频网址',
      field: 'video',
      width: '80px'
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
      field: 'title',
      title: '章节标题',
      itemRender: { name: 'ElInput', props: { placeholder: '请输入章节标题' } }
    },
    {
      span: 12,
      field: 'courseId',
      title: '所属课程',
      itemRender: {
        name: 'ElSelect',
        options: courseDic,
        props: { placeholder: '请选择所属课程' }
      }
    },
    {
      span: 12,
      field: 'rank',
      title: '排序',
      itemRender: { name: 'ElInput', props: { type: 'number', min: 1, placeholder: '请输入排序' } }
    },
    {
      span: 12,
      field: 'video',
      title: '视频网址',
      itemRender: { name: 'ElInput', props: { placeholder: '请输入视频网址' } }
    },
    {
      span: 24,
      field: 'content',
      title: '章节内容',
      itemRender: {
        name: 'ElInput',
        props: {
          type: 'textarea',
          autosize: { minRows: 2, maxRows: 4 },
          resize: 'none',
          placeholder: '请输入章节内容'
        }
      }
    }
  ]
  //#endregion
  //#region formRules
  const formRules: VxeFormPropTypes.Rules = {
    title: [
      {
        required: true,
        validator: ({ itemValue }) => {
          switch (true) {
            case !itemValue:
              return new Error('请输入章节标题')
            case !itemValue.trim():
              return new Error('空格无效')
          }
        }
      }
    ],
    courseId: [
      {
        required: true,
        validator: ({ itemValue }) => {
          switch (true) {
            case !itemValue:
              return new Error('请选择所属分类')
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
  //#endregion
  //#region configs
  const SearchConfigs: SearchBoxConfigs[] = [
    {
      type: 'select',
      field: 'courseId',
      label: '所属课程',
      options: courseDic,
      defaultValue: courseDic.length && courseDic[0].value
    },
    {
      type: 'input',
      field: 'title',
      label: '章节名称'
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
