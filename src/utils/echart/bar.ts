import type { ECOption } from '@/types/echarts'
interface pieOpts {
  data: Data
  title: string
  subtext?: string
  showLegend?: boolean
}
interface Data {
  xAxisData: Array<string | number>
  seriesData: Array<{ name: string; data: Array<number | string> }>
}
export const getBarOption = (pieOpts: pieOpts): ECOption => {
  return {
    title: {
      text: pieOpts.title,
      subtext: pieOpts.subtext,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: pieOpts.hasOwnProperty('showLegend') ? pieOpts.showLegend : true,
      data: pieOpts.data.seriesData.map((it) => it.name),
      top: '30px'
    },
    grid: {
      left: '40px',
      right: '20px',
      bottom: '20px'
    },
    xAxis: [
      {
        type: 'category',
        data: pieOpts.data.xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: pieOpts.data.seriesData.map((it) => {
      return {
        ...it,
        type: 'bar'
      }
    })
  }
}
