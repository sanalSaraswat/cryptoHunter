import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from '../config/api'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import styles from "../css/CoinPage.module.css"
import { chartDays } from '../config/data'
import Button from './Button'
import { Crypto } from '../Context'

const CoinInfo = (props) => {

  const {currency, symbol} = useContext(Crypto)
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement)


  async function fetchHistoricalData() {
    const { data } = await axios.get(HistoricalChart(props.coin.id, days, currency))
    setHistoricalData(data.prices)
  }


  useEffect(() => {
    fetchHistoricalData()
  }, [days, currency])

  return (

    <div className={styles.chartContainer}>
      <Line
        data={{
          labels: historicalData?.map((coin) => {
            let date = new Date(coin[0])
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}: ${date.getMinutes()}PM`
                : `${date.getHours()}: ${date.getMinutes()}AM`

            return days === 1 ? time : date.toLocaleDateString()
          }),

          datasets: [
            {
              label: `Price (Past ${days} Day(s) ) in ${currency}`,
              data: historicalData?.map((coin) => coin[1]),
              borderColor: "gold",
            },
          ],

        }}

        options={{
          elements: {
            point: {
              radius: 1,
            },
          }
        }}
      />

      <div className={styles.buttonContainer}>
        {chartDays.map((day) => (

          <Button key={day.value}
            onClick={() => { setDays(day.value) }}
            label={day.label}
          >
            {day.label}
          </Button>

        ))}
      </div>

    </div>




  )
}

export default CoinInfo