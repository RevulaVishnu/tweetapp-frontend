import { React, useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { ConstructionOutlined, DeleteOutline } from '@mui/icons-material';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Textarea from '@mui/joy/Textarea';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListTweetsByUser from './ListTweetsByUser';
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
    const [clicked, setClicked] = useState('');
    const [deleteSelected, SetDeleteSelected] = useState('');
    const [users, setUsers] = useState([]);
    // const [replies, setReplies] = useState({});
    const [submitTweet, setSubmitTweet] = useState(false);
    const [tweetMessage, setTweetMessage] = useState('');
    // const tweetList = 
    const [expanded, setExpanded] = useState(false);

    const [tweets, setTweets] = useState([]);
    const [noTweetsErr, setNoTweetsErr] = useState('');


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [tweetIdLiked, setTweetIdLiked] = useState('');

    const [userSelected, setUserSelected] = useState('');

    useEffect(() => {
        isMounted &&
            axios.get(BASE_URL + '/user/users/all')
                .then((response) => {
                    // console.log(response.data.data);
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
            if (localStorage.getItem("Authorization") !== null && localStorage.getItem("Authorization") !== "")
                navigate("/allUsers");
        }
    }, []);

    function SendTweetUser(userName) {
        setUserSelected(userName);
    }

    useEffect(() => {

        function getTweetsByUser() {
            axios.get(BASE_URL + '/tweets/' + userSelected,
                {
                    headers: {
                        Authorization: localStorage.getItem('Authorization')
                    }
                }
            )
                .then((response) => {
                    console.log(response.status);
                    setTweets(response.data.data);

                }).catch((err) => {
                    console.log(err.response.data.data)

                })
            isMounted = false;
        }
        if (isMounted) {
            getTweetsByUser();
        }
    });

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
                                        onClick={() => { setUserSelected(user.userName) }}
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {user.userName.charAt(0)}
                                            </Avatar>
                                        }
                                        title={user.userName}
                                    />
                                </Card>

                                <Card>
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <div style={{ padding: '2%' }}>
                                            {tweets ? tweets.map((tweet) => {
                                                <div key={tweet.tweetId}>
                                                    {tweet ? <TweetTemplate style={{ padding: '2%' }} tweet={tweet} /> : ''}
                                                </div>
            
                                            }) : "hi"}
                                        </div>
                                    </div>
                                </Card>
                                {/* : ''} */}
                            </Grid>
                        );
                    }) : "hi"}
                </div>

            </div ></>
    );
}
