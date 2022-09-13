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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { EditText, EditTextarea } from 'react-edit-text';
import { BASE_URL } from '../Constants';



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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TweetTemplate(props) {
    let isMounted = true;
    const [likedTweetId, setLikedTweetId] = useState('');
    const [deletedTweetId, setDeletedTweetId] = useState('');
    const [repliedTweetId, setRepliedTweetId] = useState('');
    const [replyTweetMessage, setreplyTweetMessage] = useState('');
    const [updatedTweetId, setUpdatedTweetId] = useState('');
    const [updatedTweetMessage, setUpdatedTweetMessage] = useState(props.tweet.tweet);
    const [currentTweetMessage, setCurrentTweetMessage] = useState(props.tweet.tweet);
    const [wasReplyTweetSubmitted, setWasReplyTweetSubmitted] = useState(false);
    const [wasUpdateTweetSubmitted, setWasUpdateTweetSubmitted] = useState(false);

    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const refreshPage = ()=>{
        window.location.reload();
     }
   
    const [tweetSentByParent, setTweetSentByParent] = useState(props.tweet);
    let sameUser = false;
    if (tweetSentByParent.userName === localStorage.getItem('username')) {
        sameUser = true;
    }
    useEffect(() => {
        function likeTweet() {
            // console.log(tweetMessage)
            axios.put(
                BASE_URL+'/tweets/' + localStorage.getItem("username") + '/like/' + likedTweetId,
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
            if (replyTweetMessage !== '') {
                console.log(replyTweetMessage)
                axios.post(
                    BASE_URL+'/tweets/' + localStorage.getItem("username") + '/reply/' + repliedTweetId,
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
        }
        if (repliedTweetId) replyTweet();
    }, [wasReplyTweetSubmitted])

    useEffect(() => {
        function deleteTweet() {
            // console.log(tweetMessage)
            axios.delete(
                BASE_URL+'/tweets/' + localStorage.getItem("username") + '/delete/' + deletedTweetId,
                {
                    headers: {
                        Authorization: localStorage.getItem('Authorization')
                    }
                }
            )
                .then((resp) => {
                    refreshPage();
                    console.log(resp);
                });
        }
        if (deletedTweetId) deleteTweet();
    }, [deletedTweetId])

    useEffect(() => {
        function updateTweet() {
            if (updatedTweetMessage !== '' && updatedTweetMessage !== currentTweetMessage) {
                console.log(updatedTweetMessage)
                axios.put(
                    BASE_URL+'/tweets/' + localStorage.getItem("username") + '/update/' + updatedTweetId,
                    {
                        tweet: updatedTweetMessage
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('Authorization')
                        }
                    }
                )
                    .then((resp) => {
                        // refreshPage();
                        console.log(resp);
                    });
            }

        }
        if (updatedTweetId) updateTweet();
    }, [wasUpdateTweetSubmitted])

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
                        <IconButton aria-label="Like"
                            style={{ display: (!(sameUser) ? 'none' : 'block') }}
                            onClick={handleOpen}
                        >
                            <EditOutlinedIcon />
                        </IconButton>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Update the tweet
                                </Typography>

                                <Typography variant="body3" color="text.secondary">
                                    <Textarea
                                        id="modal-modal-description"
                                        label="Primary"
                                        placeholder="Update your tweet here"
                                        variant="outlined"
                                        color="primary"
                                        required
                                        value={updatedTweetMessage}
                                        onChange={(e) => { setUpdatedTweetMessage(e.target.value) }}
                                    />
                                </Typography>
                                <br />
                                <CardActions disableSpacing>
                                    <IconButton aria-label="Post" size="small"
                                        onClick={() => { setWasUpdateTweetSubmitted(true); setUpdatedTweetId(props.tweet.tweetId) }}
                                    >
                                        <ReplyIcon />
                                        {/* Reply */}
                                    </IconButton>
                                </CardActions>
                            </Box>
                        </Modal>

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
                            <Typography variant="overline" display="block" gutterBottom>
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
