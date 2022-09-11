import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from '@mui/material/Button';
import axios from "axios";
import Grid from '@mui/material/Grid';


import {
  BsFillBookFill,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill
} from "react-icons/bs";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "../styles/HomePage.module.css";
import ListAllTweets from "./ListAllTweets";




function LandingPage() {
  const navigate = useNavigate();
  return (
    <Container >
      <Row className={styles.container}>

        <div className={styles.colWithButtons}>

          <fieldset className="  text-primary">Join Tweet App today
              
              <br />
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ margin: "20px", width: '50%' }}>
                  <Link to="/signin" className={styles.linkTextFormat}><Button type="submit" variant="contained" color="primary">Sign In <RiLoginBoxLine /></Button></Link>
                </div>
                <div style={{ margin: "20px", width: '50%' }}>
                  <Link to="/signup" className={styles.linkTextFormat}><Button variant="success">Sign Up <BsFillPersonPlusFill /></Button></Link>
                </div>
              </div>
          
          </fieldset>
        </div>

      </Row>
    </Container>
  );
}

export default LandingPage;
