import { makeStyles } from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { React, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import { BASE_URL } from '../Constants';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Login = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);
    axios.post(BASE_URL+'/login', {
      "username": email,
      "password": password,
    })
      .then(function (response) {
        console.log(response.data.data.token);
        localStorage.setItem('username', response.data.data.userData.firstName + response.data.data.userData.lastName);
        localStorage.setItem('Authorization', response.data.data.token)
        navigate('/home')
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  };
  function handleClose() {
    navigate('/');
  }
  return (

    <form className={classes.root} onSubmit={handleSubmit}>

      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};
// <ThemeProvider theme={theme}>
//   <Container component="main" maxWidth="xs">
//     <CssBaseline />
//     <Box
//       sx={{
//         marginTop: 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//         <LockOutlinedIcon />
//       </Avatar>
//       <Typography component="h1" variant="h5">
//         Sign in
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//       <TextField
//           label="Email"
//           variant="filled"
//           type="email"
//           required
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           variant="filled"
//           type="password"
//           required
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />

//         <FormControlLabel
//           control={<Checkbox value="remember" color="primary" />}
//           label="Remember me"
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           Sign In
//         </Button>
//         <Grid container>
//           <Grid item xs>
//             <Link href="#" variant="body2">
//               Forgot password?
//             </Link>
//           </Grid>
//           <Grid item>
//             <Link href="#" variant="body2">
//               {"Don't have an account? Sign Up"}
//             </Link>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//     <Copyright sx={{ mt: 8, mb: 4 }} />
//   </Container>
// </ThemeProvider>

export default Login;
