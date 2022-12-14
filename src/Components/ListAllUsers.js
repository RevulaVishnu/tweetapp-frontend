import { React, useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { BASE_URL } from '../Constants';
import TweetTemplate from './TweetTemplate';
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ListAllUsers() {
    const navigate = useNavigate();

    let isMounted = true;
    const [users, setUsers] = useState([])
    const [tweets, setTweets] = useState([]);
    const [wasUserSelected, setWasUserSelected] = useState(false);
    const [userSelected, setUserSelected] = useState('');
    const [noTweetsByUser, setNoTweetsByUser] = useState('');

    useEffect(() => {
        isMounted &&
            axios.get(BASE_URL + '/user/users/all')
                .then((response) => {
                    console.log(response.data.data);
                    setUsers(response.data.data);
                })
        return () => {
            isMounted = false;
        };
    }, []);

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
        }
    }, []);


    useEffect(() => {
        function getTweetsByUser() {
            console.log(userSelected)
            axios.get(BASE_URL + '/tweets/' + userSelected,
                {
                    headers: {
                        Authorization: localStorage.getItem('Authorization')
                    }
                }
            )
                .then((response) => {
                    console.log(response.status);
                    console.log(response.data.data);
                    setTweets(response.data.data);
                }).catch((err) => {
                    console.log(err.response.data.data)
                    setNoTweetsByUser(err.response.data.data)
                })
            setWasUserSelected(false);
            setUserSelected('');
        }
        if (userSelected) {
            getTweetsByUser();
        }
    }, [wasUserSelected]);

    return (
        <><Navbar />
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ padding: '2%', minWidth: "30%" }}>
                    {users ? users.map((user) => {
                        let sameUser = false;
                        if (user.userName === localStorage.getItem('username')) {
                            sameUser = true;
                        }
                        return (
                            <Grid style={{ padding: '5px 30px' }} key={user.userName}>
                                <br />
                                <Card >
                                    <CardHeader
                                        onClick={() => { setUserSelected(user.userName); setWasUserSelected(true); setTweets('') }}
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {user.userName.charAt(0)}
                                            </Avatar>
                                        }
                                        title={user.userName}
                                    />
                                </Card>
                                {/* : ''} */}
                            </Grid>
                        );
                    }) : ""
                    }
                </div>


                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ padding: '2%' }}>
                        {tweets ? tweets.map((tweet) => {
                            return (
                                <div key={tweet.tweetId}>
                                    {tweet ? <TweetTemplate style={{ padding: '2%', minWidth: "70%" }} tweet={tweet} /> : ''}
                                </div>
                            );
                        })
                            : <Typography style={{ color: red }}>{noTweetsByUser}</Typography>
                        }
                    </div>
                </div>


            </div ></>
    );
}
