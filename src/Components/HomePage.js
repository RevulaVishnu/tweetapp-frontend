import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import axios from "axios";


import {
  BsFillBookFill,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill
} from "react-icons/bs";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "../styles/HomePage.module.css";
import ListAllTweets from "./ListAllTweets";
import Navbar from "./Navbar";
import PostTweet from "./PostTweet";
import ListAllUsers from "./ListAllUsers";
import ListTweetsByUser from "./ListTweetsByUser";

export default function HomePage() {
  const navigate = useNavigate();

  function tokenValidate() {
    axios.get('http://localhost:8084/api/v1.0/validate', {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
      .then(function (response) {
        console.log(response.status);
      })
      .catch(function (error) {
        console.log(error);
        localStorage.removeItem("Authorization");
        localStorage.removeItem("userName");
        navigate('/')
      });
  }
  useEffect(() => {
    if (localStorage.getItem("Authorization") !== "") {
      tokenValidate()
      if (localStorage.getItem("Authorization") !== null && localStorage.getItem("Authorization") !== "")
        navigate("/home");
    }
  }, []);
  return (
    // <Container >
    <>
      <Navbar />
      <Grid style={{ display: 'flex', width: '100%' }}>
        <div style={{ padding: '2%', minWidth: "66%" }}>
          <ListAllUsers />
          {/* <ListTweetsByUser /> */}
        </div>
        {/* <div style={{ padding: '2%', minWidth: "33%" }}>
          <ListAllTweets />
        </div> */}
        <div style={{ padding: '2%', minWidth: "33%" }}>
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 3000,
                // height: 1500,
                position: "sticky"
              },
            }}
          >
            <PostTweet />
          </Box>
          <div style={{ padding: '2%', minWidth: "33%" }}>
            <ListAllTweets />
          </div>
        </div>
      </Grid>
    </>
  );
}


