import React from 'react';
import { getLyrics, getSong } from 'genius-lyrics-api';
import { getKendrick } from '../lib/geniusapi';

const options = {
  apiKey: '4wX_AIcVI8fQHIbkWY8z95hKj_23o_04j8FOVD79b-1g_m2GXuYzyfC7pHRDoacU',
  title: 'HUMBLE',
  artist: 'Kendrik Lamar',
  optimizeQuery: true,
};

function click() {
  getLyrics(options).then((lyrics) => console.log(lyrics));
  // getSong(options).then((song) =>
  //   console.log(`
  // ${song.id}
  // ${song.title}
  // ${song.albumArt}
  // ${song.lyrics}`)
  // );
}

// const KendrickStats = () => {};
// setInterval(getLyrics(), 5000);

const Home = () => {
  const [kendrikinfo, setkendrikinfo] = React.useState(null);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getKendrick();
        setkendrikinfo(data.response.hits);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  // const sampleTextarea = document.querySelector('.sample');
  // sampleTextarea.addEventListener('input', () => {
  //   sampleTextarea.style.height = '20px';
  //   sampleTextarea.style.height = sampleTextarea.scrollHeight + 'px';
  // });

  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="hero-body">
        <div className="container">
          <input type="text" className="input-res" />

          <input type="text" className="input-res" />

          <input type="text" className="input-res" />

          <input type="text" className="input-res" />

          <input type="text" className="input-res" />

          <p className="title has-text-centered">PLAY</p>
          <button onClick={click}>Click for Song Lyrics</button>
          <div>
            {!kendrikinfo ? (
              <div className="pageloader ">
                <span className="title is-active ">Loading...</span>
              </div>
            ) : (
              console.log(
                'TEST',
                kendrikinfo.map((x) => x.result.full_title),
                console.log('TEST2', kendrikinfo[0].result.title),
                console.log('TEST3', kendrikinfo[0].result.artist_names)
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
