import React from 'react';
import { getLoggedInUserId, getUserById, getUserLeagues } from '../lib/api';

const UserProfile = () => {
  const [user, setUser] = React.useState({});
  const [userLeagues, setUserLeagues] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(getLoggedInUserId());
      setUser(user.data);
      console.log(user.data);
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const userLeagues = await getUserLeagues();
      const emptystring = '';

      console.log('userleagues', userLeagues.data[1].league_name);
      console.log('userleaguesspread', ...userLeagues.data);
      const populatedstring = (emptystring, { ...userLeagues.data });
      setUserLeagues(populatedstring);
      console.log('populates', populatedstring);
    };
    getData();
  }, []);

  console.log('user', user);

  return (
    <section className="hero is-fullheight-with-navbar is-info">
      <div className="has-background-info p-4 mb-4">
        <div className="columns py-2">
          <div className="column is-6">
            <p className="title">{user.image}</p>
            <p className="title">{user.username}</p>
            <p className="title">
              <i className="fa-solid fa-trophy"></i>: {user.user_leagues}
            </p>
            <p className="title">{userLeagues}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
