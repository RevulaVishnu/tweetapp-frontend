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
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
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
import { BASE_URL } from '../Constants';
import Navbar from './Navbar';
import PostTweet from './PostTweet';

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
  const [noTweetsErr, setNoTweetsErr] = useState('');
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [tweetIdLiked, setTweetIdLiked] = useState('');

  console.log(props.userSelected);


  useEffect(() => {

    function getTweetsByUser() {
      axios.get(BASE_URL + '/tweets/' + props.userSelected,
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
          setNoTweetsErr(err.response.data.data)
        })
      isMounted = false;
    }
    if (isMounted) {
      getTweetsByUser();
    }
  });

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ padding: '2%' }}>
          {tweets ? tweets.map((tweet) => {
            let sameUser = false;
            if (tweet.userName === localStorage.getItem('username')) {
              sameUser = true;
            }
            return (
              <div key={tweet.tweetId}>
                {tweet ? <TweetTemplate style={{ padding: '2%' }} tweet={tweet} /> : ''}
              </div>
            );
          }) : "hi"}
        </div>
      </div>
    </>
  );
}
