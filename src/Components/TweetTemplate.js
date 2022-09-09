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
import Button from '@restart/ui/esm/Button';
import ReplyIcon from '@mui/icons-material/Reply';


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

export default function TweetTemplate(props) {
    let isMounted = true;
    const [likedTweetId, setLikedTweetId] = useState('');
    const [deletedTweetId, setDeletedTweetId] = useState('');
    const [repliedTweetId, setRepliedTweetId] = useState('');
    const [replyTweetMessage, setreplyTweetMessage] = useState('');
    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState({});
    // const [replies, setReplies] = useState({});
    const [wasReplyTweetSubmitted, setWasReplyTweetSubmitted] = useState(false);
    const [tweetMessage, setTweetMessage] = useState('');
    // const tweetList = 
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [tweetIdLiked, setTweetIdLiked] = useState('');
    // Object.keys(tweet.replies) ? setReplies(Object.keys(tweet.replies)) : setReplies(null);
    // console.log(replies);
    let sameUser = false;
    if (tweet.userName === localStorage.getItem('username')) {
        sameUser = true;
    }
    useEffect(() => {
        function likeTweet() {
            // console.log(tweetMessage)
            axios.put(
                'http://localhost:8084/api/v1.0/tweets/' + localStorage.getItem("username") + '/like/' + likedTweetId,
                {},
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
            setLikedTweetId();
        }
        if (likedTweetId) likeTweet();
    }, [likedTweetId])


    useEffect(() => {
      function replyTweet() {
        console.log(replyTweetMessage)
        axios.post(
          'http://localhost:8084/api/v1.0/tweets/'  + localStorage.getItem("username") + '/reply/' + repliedTweetId,
          {
            'tweet': replyTweetMessage
          },
          {
            headers: {
                Authorization: localStorage.getItem('Authorization'),

            }
        }
        )
          .then((resp) => {
            console.log(resp);
          });
      }
      if(repliedTweetId) replyTweet();
    }, [wasReplyTweetSubmitted])

    useEffect(() => {
        function deleteTweet() {
            // console.log(tweetMessage)
            axios.delete(
                'http://localhost:8084/api/v1.0/tweets/' + localStorage.getItem("username") + '/delete/' + deletedTweetId,
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
        if (deletedTweetId) deleteTweet();
    }, [deletedTweetId])

    return (
        <div >

            <Grid key={props.tweet.tweetId}>
                <br />

                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {props.tweet.userName.charAt(0)}
                            </Avatar>
                        }
                        title={props.tweet.userName}
                        subheader={props.tweet.created}
                    />
                    <CardContent>
                        <Typography variant="body3" color="text.secondary">
                            {props.tweet.tweet} + {props.tweet.tweetId}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton aria-label="Like"
                            onClick={() => { setLikedTweetId(props.tweet.tweetId) }}
                        >
                            {likedTweetId ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
                        </IconButton>
                        <IconButton aria-label="Like"
                            style={{ display: (!(sameUser) ? 'none' : 'block') }}
                            onClick={() => { setDeletedTweetId(props.tweet.tweetId) }}
                        >
                            <DeleteOutline />
                        </IconButton>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Replies</Typography>
                            <Typography variant="body3" color="text.secondary">
                                <Textarea
                                    label="Primary"
                                    placeholder="What's on your mind"
                                    variant="outlined"
                                    color="primary"
                                    required
                                    value={replyTweetMessage}
                                    onChange={e => setreplyTweetMessage(e.target.value)}
                                />
                            </Typography>
                            <br />
                            <CardActions disableSpacing>
                                <IconButton aria-label="Post" size="small"
                                onClick={() => { setWasReplyTweetSubmitted(true); setRepliedTweetId(props.tweet.tweetId) }}
                                >
                                    <ReplyIcon />
                                    {/* Reply */}
                                </IconButton>
                            </CardActions>
                            <Typography  variant="overline" display="block" gutterBottom>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} size="small" aria-label="recipe">
                                            {props.tweet.userName.charAt(0)}
                                        </Avatar>
                                        
                                    }
                                    subheader={props.tweet.created}
                                />
                                overline text
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        </div >
    );
}
