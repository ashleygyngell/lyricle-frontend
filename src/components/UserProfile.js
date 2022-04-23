import React from 'react';
import { getLoggedInUserId, getUserById } from '../lib/api';

const UserProfile = () => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(getLoggedInUserId());
      setUser(user.data);
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
