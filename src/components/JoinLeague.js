import React from 'react';
import { joinLeague } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function JoinLeague() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        const { data } = await joinLeague();
        localStorage.setItem('accessToken', data.token);
        navigate('/');
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
