import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import axios from "axios";


import ListAllTweets from "./ListAllTweets";
import Navbar from "./Navbar";
import PostTweet from "./PostTweet";
import { BASE_URL } from "../Constants";

export default function HomePage() {
  const navigate = useNavigate();

  function tokenValidate() {
    axios.get(BASE_URL + '/validate', {
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
        {/* <div style={{ padding: '2%', minWidth: "66%" }}>
          <ListAllUsers />
        </div> */}
        <div style={{ padding: '2%', minWidth: "33%" }}>
          <ListAllTweets />
        </div>
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
          {/* <div style={{ padding: '2%', minWidth: "33%" }}>
            <ListAllTweets />
          </div> */}
        </div>
      </Grid>
    </>
  );
}


