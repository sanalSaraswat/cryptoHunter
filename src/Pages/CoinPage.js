import { LinearProgress, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'
import styles from "../css/CoinPage.module.css"
import ReactHtmlParser from "react-html-parser"
import { Crypto } from '../Context'

const CoinPage = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState()
  const {currency, symbol} = useContext(Crypto)


  async function fetchCoin() {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  if (!coin) {
    return (
      <LinearProgress style={{ backgroundColor: "gold" }} />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>

        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: "20px" }}
        >

        </img>

        <Typography variant='h3' sx={{
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
          marginBottom: '20px',
        }}>
          {coin?.name}
        </Typography>

        <Typography variant='subtitle1' sx={{
          fontFamily: 'Montserrat',
        }} className={styles.description}>

          {ReactHtmlParser(coin?.description.en.split(". ", 1))}

        </Typography>


        <div className={styles.marketData}>

          <span style={{ display: "flex" }}>

            <Typography variant='h5' sx={{
              fontWeight: 'bold',
              fontFamily: 'Montserrat',
              marginBottom: '20px',
            }}>
              Rank:
            </Typography>

            &nbsp; &nbsp;

            <Typography variant='h5' sx={{
              fontFamily: 'Montserrat',
            }}>
              {coin.market_cap_rank}
            </Typography>

          </span>

          <span style={{ display: "flex" }}>

            <Typography variant='h5' sx={{
              fontWeight: 'bold',
              fontFamily: 'Montserrat',
              marginBottom: '20px',
            }}>
              Current Price:
            </Typography>

            &nbsp; &nbsp;

            <Typography variant='h5' sx={{
              fontFamily: 'Montserrat',
            }}>
              {symbol} {currency === 'INR' ? coin.market_data.current_price.inr.toLocaleString("en-us") : coin.market_data.current_price.usd.toLocaleString("en-us")} 
            </Typography>



          </span>

          <span style={{ display: "flex" }}>

            <Typography variant='h5' sx={{
              fontWeight: 'bold',
              fontFamily: 'Montserrat',
              marginBottom: '20px',
            }}>
              Market Cap:
            </Typography>

            &nbsp; &nbsp;

            <Typography variant='h5' sx={{
              fontFamily: 'Montserrat',
            }}>
              {symbol} {currency === "INR" ? coin.market_data.market_cap.inr.toLocaleString("en-us").slice(-18, -8) : coin.market_data.market_cap.usd.toLocaleString("en-us").slice(-18, -8)}M 
            </Typography>



          </span>


        </div>


      </div>

      <CoinInfo coin={coin} />

    </div>
  )
}

export default CoinPage