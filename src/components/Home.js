import React from 'react';

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
          <p className="title has-text-centered">
            <a href="/play">
              <span>TODAYS LYRICLE</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
