import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../config/api'
import { Crypto } from '../Context'
import styles from "../css/HomePage.module.css"

const Carousel = () => {

    const [trending, setTrending] = useState([])
    const {currency, symbol} = useContext(Crypto)


    async function fetchTrendingCoin() {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)

    }


    useEffect(() => {
        fetchTrendingCoin()
    }, [currency])


    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    }


    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0

        return (
            <Link className={styles.carouselItem} to={`/coins/${coin.id}`} >
                <img
                    src={coin.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                ></img>
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span style={{color: profit > 0 ? "rgba(14, 203, 129)" : "red"}}>{profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </span>

                <p style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {coin.current_price.toLocaleString("en-us")}
                </p>
            </Link>
        )

    })


    return (
        <div className={styles.carousel}>
            <AliceCarousel
                autoPlayInterval={1000}
                infinite
                mouseTracking
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                autoPlay
                items={items}
                responsive={responsive}>

            </AliceCarousel>
        </div>
    )
}

export default Carousel