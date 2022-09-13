import { React, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import TweetTemplate from './TweetTemplate';
import { BASE_URL } from '../Constants';
import Navbar from './Navbar';

export default function ListTweetsByUser(props) {
  let isMounted = true;
  const [tweets, setTweets] = useState([]);

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
