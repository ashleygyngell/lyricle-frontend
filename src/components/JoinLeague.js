import React from 'react';
import { joinLeague } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function JoinLeague() {
  const navigate = useNavigate();
  const [leagueId, setLeagueId] = React.useState();

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        const { data } = await joinLeague();
        localStorage.getItem('accessToken', data.token);
        navigate('/userprofile');
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }

  function handleChange(event) {
    setLeagueId({ ...leagueId, [event.target.name]: event.target.value });
    console.log(leagueId);
  }

  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="title has-text-centered">Join A League</div>
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
                    // value={leagueId}
                    // leagueId={leagueId}
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
                  Join League!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinLeague;
