import React from 'react';
import { getLoggedInUserId, getUserById, getUserLeagues } from '../lib/api';
import LeagueCard from './LeagueCard';

const UserProfile = () => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const user = await getUserById(getLoggedInUserId());
        setUser(user.data);
        console.log('userdata', user.data);
        console.log('erm');
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  // let result = objArray.map(({ foo }) => foo)

  return (
    <section className="hero is-fullheight-with-navbar is-info">
      <div className="has-background-info p-4 mb-4">
        <div className="columns py-2">
          <div className="column is-8">
            <p className="title"> {user.image}</p>
            <p className="title"> {user.username}</p>
            <p className="title">My Leagues: {user.user_leagues}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
