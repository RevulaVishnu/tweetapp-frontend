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
    let isMounted = true;
    const [clicked, setClicked] = useState('');
    const [deleteSelected, SetDeleteSelected] = useState('');
    const [users, setUsers] = useState([]);
    // const [replies, setReplies] = useState({});
    const [submitTweet, setSubmitTweet] = useState(false);
    const [tweetMessage, setTweetMessage] = useState('');
    // const tweetList = 
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [tweetIdLiked, setTweetIdLiked] = useState('');

    const [userSelected, setUserSelected] = useState('');

    useEffect(() => {
        isMounted &&
            axios.get('http://localhost:8084/api/v1.0/user/users/all')
                .then((response) => {
                    // console.log(response.data.data);
                    setUsers(response.data.data);
                })
        return () => {
            isMounted = false;
        };
    }, []);


    useEffect(() => {
        function onlike() {
            // console.log(tweetMessage)
            axios.put(
                'http://localhost:8084/api/v1.0/tweets/' + localStorage.getItem("username") + '/like/' + clicked, {},
                {
                    headers: {
                        Authorization: localStorage.getItem('Authorization'),

                    }
                }
            )
                .then((resp) => {
                    console.log(resp);
                })
                .catch((err) => {
                    // console.log(err);
                })
            setClicked();
        }
        if (clicked) onlike();
    }, [clicked])

    function SendTweetUser(userName) {
        setUserSelected(userName);

    }



    useEffect(() => {
        function deleteTweet(e) {
            // console.log(tweetMessage)
            axios.delete(
                'http://localhost:8084/api/v1.0/tweets/' + localStorage.getItem("username") + '/delete/' + deleteSelected,
                {
                    headers: {
                        Authorization: localStorage.getItem('Authorization')
                    }
                }
            )
                .then((resp) => {
                    console.log(resp);
                });
        }
        if (deleteSelected) deleteTweet();
    }, [deleteSelected])

    return (
        <div  style={{ display: 'flex', width: '100%' }}>
            <div  style={{ padding: '2%', minWidth: "30%" }}>
            {users ? users.map((user) => {
                let sameUser = false;
                if (user.userName === localStorage.getItem('username')) {
                    sameUser = true;
                    console.log("Same user")
                }
                return (
                    <Grid style={{ padding: '5px 30px' }} key={user.userName}>
                        <br />
                        <Card >
                            <CardHeader
                                onClick={()=>{SendTweetUser(user.userName)}}

                                // console.log(user.userName);
                                // setUserSelected(user.userName)
                                // }}

                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {user.userName.charAt(0)}
                                    </Avatar>
                                }
                                title={user.userName}
                            />
                        </Card>

                    </Grid>
                );
            }) : "hi"}
            </div>
            <Card>
                {userSelected && <ListTweetsByUser style={{ padding: '2%', minWidth: "70%" }} userSelected={userSelected} />}
            </Card>
        </div >
    );
}
