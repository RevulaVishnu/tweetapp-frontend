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
import TweetTemplate from './TweetTemplate';

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

export default function ListTweetsByUser(props) {
  let isMounted = true;
  const [clicked, setClicked] = useState('');
  const [deleteSelected, SetDeleteSelected] = useState('');
  const [tweets, setTweets] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [userSelectedFromParent, setUserSelectedFromParent] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [tweetIdLiked, setTweetIdLiked] = useState('');

  console.log(props.userSelected);


  useEffect(() => {

    function getTweetsByUser(){
      axios.get('http://localhost:8084/api/v1.0/tweets/'+props.userSelected,
      {
          headers:{
              Authorization : localStorage.getItem('Authorization')
          }
      }
      )
        .then((response) => {
          console.log(response.status);
          setTweets(response.data.data);
          
        }).catch((err) =>{
          console.log(err.response.data.data)
        
        })
      isMounted = false;
    }
    if(isMounted){
      getTweetsByUser();
    }
  });


  useEffect(() => {

    function onlike() {
    //   console.log(userSelected);
      axios.put(
        'http://localhost:8084/api/v1.0/tweets/' + props.userSelected + '/like/' + clicked,{},
        {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
          
        }
      }
      )
        .then((resp) => {
          console.log(resp);
        })
        .catch((err)=>{
          // console.log(err);
        })
        setClicked();
    }
    if(clicked) onlike();
  }, [clicked])


  // useEffect(() => {
  //   function replyTweet(e) {
  //     // console.log(tweetMessage)
  //     axios.post(
  //       'http://localhost:8084/api/v1.0/tweets/'  + localStorage.getItem("username") + '/reply/' + clicked,
  //       {
  //         'tweet': tweetMessage
  //       },
  //       {
  //         headers: {
  //           // Authorization: token
  //           Authorization: localStorage.getItem('Authorization')
  //         }
  //       }
  //     )
  //       .then((resp) => {
  //         console.log(resp);
  //       });
  //   }
  //   replyTweet()
  // }, [submitTweet])

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
    if(deleteSelected) deleteTweet();
  }, [deleteSelected])

  return (
    <div >
    {tweets ? tweets.map((tweet) => {
      console.log(tweet);
      return (
        <div key={tweet.tweetId}>
           {tweet ? <TweetTemplate style={{ padding: '2%', minWidth: "70%" }} tweet={tweet}/> : ''}
        </div>
      );
    }) : "hi"}
  </div >
  );
}
