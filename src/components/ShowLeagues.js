import React from 'react';
import { getLoggedInUserId, getUserById, getUserLeagues } from '../lib/api';
import LeagueCard from './LeagueCard';

const UserProfile = () => {
  const [user, setUser] = React.useState({});
  const [sortedLeagues, setSortedLeagues] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(getLoggedInUserId());
      const fetchedUserLeagues = await getUserLeagues();

      let userLeaguesInArray = user.data.user_leagues;
      let userLeagues = fetchedUserLeagues.data;

      const arrayOfUsersLeagues = [];
      userLeaguesInArray.forEach((x) => {
        arrayOfUsersLeagues.push(
          userLeagues.find((idNumber) => idNumber.league_id === x)
        );
      });

      setUser(user.data);
      setSortedLeagues(arrayOfUsersLeagues);
      console.log(userLeagues);
    };

    getData();
  }, []);

  return (
    <section className="hero is-fullheight-with-navbar is-info">
      <div className="has-background-info p-4 mb-4">
        <div className="columns py-2">
          <div className="column is-8">
            <p className="title">
              <i className="fa-solid fa-trophy"></i>: {user.username}'s Leagues
            </p>
            {!sortedLeagues ? (
              <p>Loading...</p>
            ) : (
              sortedLeagues.map((league) => (
                <LeagueCard key={league.league_name} {...league} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
