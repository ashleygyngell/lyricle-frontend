import React from 'react';

import { getUserById } from '../lib/api.js';

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="hero-body">
        <div className="container">
          <div className="title has-text-centered">
            <a href="/play">
              <img
                className="logo transform"
                src="https://i.imgur.com/y9qikIT.png"
                alt="Small Lyricle Logo"
                width="90"
                height="300"
              />
              <a href="/play"></a>
              <p>Play Lyricle</p>
            </a>
            <br />
            <br />
            {getUserById() ? (
              ''
            ) : (
              <a href="/register">
                <p>Sign Up To Compete</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
