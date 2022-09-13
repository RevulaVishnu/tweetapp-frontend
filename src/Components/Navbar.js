import { React, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import { Link, useNavigate } from "react-router-dom";

// Using Inline Styling
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500]
  },
  customHeight: {
    minHeight: 200
  },
  offset: theme.mixins.toolbar
}));

// Exporting Default Navbar to the App.js File
export default function Navbar() {
  const classes = useStyles();
  const [example, setExample] = useState("primary");
  const isCustomColor = example === "customColor";
  const isCustomHeight = example === "customHeight";
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userName");
    navigate('/')
  }
  function allUsersPage() {
    navigate('/allUsers')
  }
  function homePage() {
    navigate('/home')
  }
  return (
    <div >
      <AppBar
        color={isCustomColor || isCustomHeight ? "primary" : example}
        className={`${isCustomColor && classes.customColor} ${isCustomHeight && classes.customHeight
          }`}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tweet App
          </Typography>
          <IconButton color="inherit" onClick={() => homePage()}>
            Home
          </IconButton>
          <IconButton color="inherit" onClick={() => allUsersPage()}>
            All Users
          </IconButton>
          <IconButton color="inherit" onClick={() => logout()}>
            Logout
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}