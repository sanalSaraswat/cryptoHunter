import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import styles from "../css/HomePage.module.css"
import Carousel from './Carousel'

const Banner = () => {

    return (
        <div className={styles.banner}>
            <Container className={styles.bannerContext}>
                <div className={styles.tagline}>
                    <Typography
                        variant='h2'
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Montserrat',
                            cursor: 'pointer',
                            marginBottom: '15px',
                        }}
                    >Crypto Hunter</Typography>

                    <Typography
                        variant='subtitle6'
                        sx={{
                            color: 'darkgrey',
                            fontFamily: 'Montserrat',
                            textTransform: 'capitalize',
                        }}
                    >Get all the Info regarding your favorite Crypto Currency</Typography>
                </div>

                <Carousel />
            </Container>
        </div>
    )
}

export default Banner