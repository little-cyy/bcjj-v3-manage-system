import dayjs from 'dayjs'

export const dayFormatter = (date: string | number | Date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
export const timeFormatter = (date: string | number | Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export const timeFormatter2 = (date: string | number | Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export const timeFormatter3 = (date: string | number | Date) => {
  return dayjs(date).format('HH:mm:ss')
}

export const timeFormatter4 = (date: string | number | Date) => {
  return dayjs(date).format('HH:mm')
}
export const timeFormatter5 = (date: string | number | Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS')
}
export const timeFormatter6 = (date: string | number | Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS')
}

export const isOrNotFormatter = (value: boolean) => {
  return value ? '是' : '否'
}
