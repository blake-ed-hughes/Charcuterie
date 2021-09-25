import React from 'react';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/system';
import Container from '@material-ui/core/Container';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core/styles';



function Header(props) {
  const [searchVal, setSearchVal] = useState('');


  return (
    <header style={{backgroundColor: '#D3D3D3', borderBottom: "10px solid black"}}>
      <Container maxWidth="xl" >
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item>
            <h1 style={{color:'blue'}} >Charcuterie</h1>
            <h4 style={{color:'black'}}>Styles so fine you'll want cheese with your wine.</h4>
          </Grid>
          <Grid item style={{marginBottom: '8px'}} >
            <FormControl margin='normal'>
              <InputLabel htmlFor="search-Pid">Search Product Id</InputLabel>
              <Input id="search-Pid" aria-describedby="search" value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={()=>{props.onSearch(searchVal)}}>
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default Header;