import { createTheme, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { color, Container } from '@mui/system'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../config/api'
import styles from "../css/HomePage.module.css"
import { Crypto } from '../Context'

const CoinsTable = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })

    const useStyles = makeStyles(() => ({
        ul: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    }))

    const classes = useStyles()
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const {currency, symbol} = useContext(Crypto)



    async function fetchCoins() {
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
    }

    function handleSearch() {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
        ))
    }

    useEffect(() => {
        fetchCoins()
    }, [currency])

    useEffect(() => {}, [search])
    return (

        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }} >

                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices by Market Cap

                </Typography>

                <TextField
                    label="Search For a Crypto Currency..."
                    fullWidth
                    style={{ marginBottom: 20 }}
                    onChange={(e) => { setSearch(e.target.value) }}
                ></TextField>

                <TableContainer>

                    <Table>
                        <TableHead style={{ backgroundColor: "#EEBC1D" }} >
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell style={{
                                        color: "black",
                                        fontWeight: 700,
                                        fontFamily: "Montserrat"
                                    }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}>
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {handleSearch().slice((page - 1) * 10, (page) * 10).map((row) => {
                                const profit = row.price_change_percentage_24h > 0

                                return (
                                    <TableRow className={styles.tableRow}
                                        onClick={() => { navigate(`/coins/${row.id}`) }}
                                        key={row.id}
                                    >
                                        <TableCell
                                            component="th"
                                            align='left'
                                            scope="row"
                                            style={{
                                                display: "flex",
                                                gap: 15
                                            }}>
                                            <img src={row.image}
                                                alt={row.name}
                                                height="50"
                                                style={{
                                                    marginBottom: 10
                                                }}
                                            />

                                            <div
                                                style={{ display: "flex", flexDirection: "column" }}>

                                                <span
                                                    style={{ fontSize: 22, textTransform: "uppercase" }}>
                                                    {row.symbol}
                                                </span>

                                                <span style={{ color: "darkgrey" }}>{row.name}</span>
                                            </div>


                                        </TableCell>

                                        <TableCell
                                            align='right'>
                                            <span style={{ fontSize: 18, fontWeight: 500 }}>
                                                {symbol} {row.current_price.toLocaleString("en-us")}
                                            </span>
                                        </TableCell>

                                        <TableCell
                                            align='right'>
                                            <span style={{
                                                color: profit > 0 ? "rgba(14, 203, 129)" : "red",
                                                fontSize: 18, fontWeight: 500
                                            }}

                                            >
                                                {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%

                                            </span>
                                        </TableCell>

                                        <TableCell
                                            align='right'>
                                            <span style={{ fontSize: 18, fontWeight: 500 }}>
                                                {symbol} {row.market_cap.toLocaleString("en-us").slice(-18, -8)}M
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                </TableContainer>

                <Pagination
                    count={handleSearch().length / 10}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    onChange={(_, value) => {
                        setPage(value)
                        window.scroll(0, 450)
                    }}

                    classes={{ ul: classes.ul }}

                ></Pagination>

            </Container>

        </ThemeProvider>

    )
}

export default CoinsTable