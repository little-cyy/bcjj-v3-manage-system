import { useDictionaryStore } from '@/store/dictionary'
import { dayFormatter } from '@/utils/formatter'
import { transformToTreeData } from '@/utils/tree'
import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
const dictionaryStore = useDictionaryStore()
const menuOptions = await dictionaryStore.getDictionaryTer('menu')
const menuTreeOptions = transformToTreeData(menuOptions, 0)
export const columns: VxeGridPropTypes.Columns = [
  {
    title: '角色名称',
    field: 'name',
    width: '130px'
  },
  {
    title: '菜单分配',
    field: 'menus',
    minWidth: '120px',
    formatter: ({ cellValue }) => {
      let menuNames: Array<string> = []
      cellValue?.forEach((code: number) => {
        const label =
          menuOptions.find((item: Record<string, any>) => item.value == code)?.label || ''
        label && menuNames.push(label)
      })
      return menuNames.join(',') || ''
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
    field: 'name',
    title: '角色名称',
    itemRender: { name: 'ElInput', props: { placeholder: '请输入角色名称' } }
  },
  {
    field: 'menus',
    title: '菜单分配',
    itemRender: {
      name: 'ElTreeSelect',
      options: menuTreeOptions,
      props: {
        multiple: true,
        showCheckbox: true,
        needHalfCheckedKeys: true,
        placeholder: '请选择菜单分配'
      }
    }
  }
]
export const formRules: VxeFormPropTypes.Rules = {
  menus: [{ required: true, message: '请选择菜单分配' }]
}
