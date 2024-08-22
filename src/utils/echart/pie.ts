import type { ECOption } from '@/types/echarts'
interface pieOpts {
  data: Data[]
  title: string
  subtext?: string
}
interface Data {
  name: string
  value: number
}
export const getPieOption = (pieOpts: pieOpts): ECOption => {
  return {
    title: {
      text: pieOpts.title,
      subtext: pieOpts.subtext,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: pieOpts.title,
        type: 'pie',
        radius: '70%',
        center: ['50%', '60%'],
        data: pieOpts.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
