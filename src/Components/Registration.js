import { useState, React } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Backdrop, Button, TextField } from '@mui/material';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { Box } from '@mui/system';
import { CircularProgress } from '@material-ui/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../Constants';
import { red } from '@material-ui/core/colors';
import { Reddit } from '@mui/icons-material';




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

const Registration = () => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  var date = new Date(value)
  let navigate = useNavigate();

  const finaldate = date.getDate() + '-' +  (date.getMonth() + 1)  + '-' +  date.getFullYear()

  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(new Date());
  const [mobileNumber, setMobileNumber] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log(firstName, lastName, email, password, gender, value,finaldate, mobileNumber);
    axios.post(BASE_URL+'/user/register', {
      "email":email,
      "password":password,
      "firstName":firstName,
      "lastName":lastName,
      "gender": gender,
      "dob":finaldate,
      "mobileNumber":mobileNumber,
      "online":false
    })
    .then(function (response) {
      console.log(response);

      navigate('/')
    })
    .catch(function (error) {
      console.log(error.response.data.data);
      setErrorMsg(error.response.data.data);
    });
  
  };

  function handleClose(){
    navigate('/');
  }
  if(errorMsg !==''){
    
  }
  return (
    <>
    <Backdrop sx={{ color: "#fff", zIndex:(theme)=> theme.zIndex.drawer+1 }}>
      open={spinner}
      <CircularProgress color="inherit"/>
    </Backdrop>
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
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

      <RadioGroup row name="Gender" defaultValue="Male" value={gender} onChange={e => setGender(e.target.value)}>
        <FormControlLabel  value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
      </RadioGroup>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Basic example"
        // views={['year', 'month', 'day']}
        inputFormat="DD-MM-YYYY"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

      <TextField
        label="Mobile Number"
        variant="filled"
        type="text"
        required
        value={mobileNumber}
        onChange={e => setMobileNumber(e.target.value)}
      />
      <div>
        <div>
          <Typography style={{color: red}}>{errorMsg}</Typography>
        </div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
    </>
  );
};

export default Registration;
