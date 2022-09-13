import { React, useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import TweetTemplate from './TweetTemplate';
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

export default function ListAllTweets() {
  let isMounted = true;
  const [tweets, setTweets] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [noTweetsFound, setNoTweetsFound] = useState('');

  useEffect(() => {
    isMounted &&
      axios.get(BASE_URL+'/tweets/all')
        .then((response) => {
          // console.log(response.data.data);
          setTweets(response.data.data);
        })
        .catch((err) =>{
          console.log(err.response.data.data);
          setNoTweetsFound(err.response.data.data);
        })
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div >
      {tweets ? tweets.map((tweet) => {
        return (
          <div key={tweet.tweetId}>
             {tweet ? <TweetTemplate style={{ padding: '2%', minWidth: "70%" }} tweet={tweet}/> : ''}
          </div>
        );
      }) : "hi"}
    </div >
  );
}
