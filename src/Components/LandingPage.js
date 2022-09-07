import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

import {
  BsFillBookFill,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill
} from "react-icons/bs";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "../styles/HomePage.module.css";
import TweetCard from "./TweetCard";




function LandingPage() {
  const navigate = useNavigate();
  return (
    <Container >
      {/* <TweetCard/> */}
      <Row className={styles.container}>
        {/* <Col className={`${styles.colContainerLeft} ${styles.leftBackground}`}>
          <div>
            <Row>
              <h3 className="my-3">
                <BsFillBookFill /> Welcome to Tweet App
              </h3>
            </Row>
            <Row>
              <h3 className="my-3">
                <BsFillCpuFill /> Hear what people are talking about.
              </h3>
            </Row>
            <Row>
              <h3 className="my-3">
                <BsFillShareFill /> Join and share your Post to your friends
              </h3>
            </Row>
          </div>
        </Col> */}
        <center>
        <Row>
              <h3 className="text-info">Join our Tweet Community to know latest updates on the world</h3>
            </Row>
        </center>
       
        {/* <Col className={styles.colContainerRight}> */}
          <div className={styles.colWithButtons}>
            {/* <img src={psnLogo} alt="PSN logo" width={120} className="mb-3" /> */}
           
            {/* <br />
            <Row>
              <h5 className="text-success mb-3">Join Tweet App today</h5>
            </Row>{" "}
            <br />
            <Row>
              <Link to="/signin" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign In <RiLoginBoxLine /></Button></Link>
            </Row>
            <Row>
            <Link to="/signup" className={styles.linkTextFormat}><Button variant="success" className={styles.btnHomePage}>Sign Up <BsFillPersonPlusFill /></Button></Link>
            </Row> */}
            <fieldset class="border p-2 text-primary">Join Tweet App today
              <legend class="w-auto">
                <Row>
                  <h5 className="text-success mb-3"></h5>
                </Row>{" "}
                <br />
                <Row>
                  <Link to="/signin" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign In <RiLoginBoxLine /></Button></Link>
                </Row>
                <Row>
                  <Link to="/signup" className={styles.linkTextFormat}><Button variant="success" className={styles.btnHomePage}>Sign Up <BsFillPersonPlusFill /></Button></Link>
                </Row>
              </legend>
            </fieldset>
          </div>
        {/* </Col> */}
      </Row>
    </Container>
  );
}

export default LandingPage;
