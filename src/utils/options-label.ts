export const stateOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]
export const roleOptions = [
  { label: '普通用户', value: 0 },
  { label: '管理员', value: 1 },
  { label: '超级管理员', value: 100 }
]
export const roleOptions2 = [
  { label: '普通用户', value: 0 },
  { label: '管理员', value: 1 }
]
export const sexOptions = [
  { label: '男生', value: 0 },
  { label: '女生', value: 1 },
  { label: '未知', value: 2 }
]
export const getRoleLabel = (value: number) => {
  const role = roleOptions.find((item) => item.value === value)
  return role?.label || ''
}
export const getSexLabel = (value: number) => {
  const sex = sexOptions.find((item) => item.value === value)
  return sex?.label || ''
}

export const getLabel = (value: number, options: any[]) => {
  const item = options.find((item) => item.value === value)
  return item?.label || ''
}
