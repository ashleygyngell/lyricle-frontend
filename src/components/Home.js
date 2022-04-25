import React from 'react';
import lyriclelogo from '../assets/images/lyriclelogo.png';
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
            <img
              className="logo transform"
              src={lyriclelogo}
              alt="Small Lyricle Logo"
              width="90"
              height="300"
            />
            <a href="/play">
              <p>Play Todays Lyricl with simon </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
