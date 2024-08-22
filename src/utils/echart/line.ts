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
export const getLineOption = (pieOpts: pieOpts): ECOption => {
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
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
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
        type: 'line'
      }
    })
  }
}
