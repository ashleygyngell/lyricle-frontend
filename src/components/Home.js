import React from 'react';

import { getUserById } from '../lib/api.js';
// import { getLyrics, getSong } from 'genius-lyrics-api';

// const options = {
//   apiKey: `${process.env.client_access_token}`,
//   title: 'Blinding Lights',
//   artist: 'The Weeknd',
//   optimizeQuery: true,
// };

// getLyrics(options).then((lyrics) => console.log(lyrics));

// getSong(options).then((song) =>
//   console.log(`
// 	${song.id}
// 	${song.title}
// 	${song.url}
// 	${song.albumArt}
// 	${song.lyrics}`)
// );

// function myFunction() {
//   console.log('Hello');
// }

// setTimeout(myFunction, 3000);

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="hero-body">
        <div className="container">
          <div className="title has-text-centered">
            {getUserById() ? (
              ''
            ) : (
              <a href="/register">
                <p>Sign Up To Compete With Your Friends</p>
              </a>
            )}

            <br />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
