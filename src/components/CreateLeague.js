import React from 'react';
import { createLeague } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserId, getUserById } from '../lib/api';

function CreateLeague() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(getLoggedInUserId());
      const userId = user.data.id;
      setUser(userId);
      console.log('test', userId);
    };
    getData();
  }, []);

  console.log('testuser', user);

  const [leagueName, setLeagueName] = React.useState({
    league_name: '',
    league_users: [],
  });

  function handleChange(event) {
    setLeagueName({ ...leagueName, [event.target.name]: event.target.value });
  }

  // THIS FIXES A STATE ISSUE. TEMPORARY FIX.
  function handleChangeuser(event) {
    setLeagueName({ ...leagueName, [event.target.name]: event.target.value2 });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        const { data } = await createLeague(leagueName);
        localStorage.setItem('accessToken', data.token);
        // navigate('/');
        console.log(leagueName);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }

  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="section has-background-success">
        <div className="container">
          <div className="columns">
            <form
              className="box column is-half is-offset-one-quarter"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label">League Name</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    placeholder="e.g QueenFans2022"
                    name="league_name"
                    onChange={handleChange}
                    value={leagueName.league_name}
                    userId={user}
                  />
                  <span className="icon is-left">
                    <i className="fa-solid fa-trophy fa-xl"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <button
                  // href="/login"
                  type="submit"
                  className="button is-fullwidth is-info"
                >
                  Create!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateLeague;
