import { AppBar, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crypto } from '../Context'

const Header = () => {

  const { currency, setCurrency } = useContext(Crypto)

  const navigate = useNavigate()
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (

    <ThemeProvider theme={darkTheme}>

      <AppBar position='static' color='transparent'>

        <Toolbar
          sx={{ margin: "0 150px" }}>

          <Typography
            variant='h6'
            onClick={() => { navigate("/", { replace: true }) }}
            sx={{
              fontWeight: 900,
              color: 'gold',
              fontFamily: 'Montserrat',
              flex: 1,
              cursor: 'pointer',
            }}
          >Crypto Hunter</Typography>

          <Select
            value={currency}
            sx={{
              width: 100,
              height: 40,
            }}
            onChange={(e) => setCurrency(e.target.value )}
            >
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>

        </Toolbar>

      </AppBar >

    </ThemeProvider>

  )
}

export default Header