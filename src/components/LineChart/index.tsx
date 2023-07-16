import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import type { CanvasHTMLAttributes } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface dataset extends CanvasHTMLAttributes<HTMLCanvasElement> {
  label: string
  data: Array<number>
  borderColor: string
  backgroundColor: string
  fill?: boolean
  lineTension?: number
}

export interface ILineChartTicketProps {
  title?: string
  labels: Array<string>
  datasets: Array<dataset>
}

const LineChart = (lineChartData: ILineChartTicketProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: !!lineChartData.title,
        text: lineChartData.title
      }
    },
    interaction: {
      intersect: false
    }
  }
  const data = {
    labels: lineChartData.labels,
    datasets: lineChartData.datasets
  }
  return <Line className="rounded-3xl" options={options} data={data} />
}

export default LineChart
