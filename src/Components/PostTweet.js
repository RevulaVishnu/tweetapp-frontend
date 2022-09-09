import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import { Button } from 'react-bootstrap'
import { Telegram } from '@mui/icons-material';



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

export default function PostTweet() {
    let isMounted = true;
    const [tweets, setTweets] = useState([]);
    // const [pageUpdate, setPageUpdate] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [submitTweet, setSubmitTweet] = useState(false);
    const [tweetMessage, setTweetMessage] = useState('');


    useEffect(() => {
        function postTweet(e) {
            // console.log(tweetMessage)
            axios.post(
                'http://localhost:8084/api/v1.0/tweets/add/' + localStorage.getItem("username"),
                {
                    'tweet': tweetMessage
                },
                {
                    headers: {
                        // Authorization: token
                        Authorization: localStorage.getItem('Authorization')
                    }
                }
            )
                .then((resp) => {
                    console.log(resp);
                });
            setSubmitTweet(false)
        }
        if (submitTweet) postTweet();
    }, [submitTweet])

    return (
        <div >
            <Grid>
                <br />
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {localStorage.getItem('username').charAt(0)}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={localStorage.getItem('username')}
                    />
                    <CardContent>
                        <Typography variant="body3" color="text.secondary">
                            <Textarea
                                label="Primary"
                                placeholder="What's on your mind"
                                variant="outlined"
                                color="primary"
                                required
                                value={tweetMessage}
                                onChange={e => setTweetMessage(e.target.value)}
                            />
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton variant="contained" aria-label="Post"
                            onClick={() => { setSubmitTweet(true) }}
                        >
                            <Telegram />
                        </IconButton>
                    </CardActions>

                </Card>
            </Grid>
        </div >
    );
}
