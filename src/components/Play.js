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
          <div className="columns is-mobile is-multiline is-centered">
            <input
              type="text"
              className="clue_field has-text-centered is-half"
            />
            <input type="text" className="clue_field has-text-centered" />
            <input type="text" className="clue_field has-text-centered" />
            <input type="text" className="clue_field has-text-centered" />
            <input type="text" className="clue_field has-text-centered" />
            <input type="text" className="guess_field has-text-centered" />
          </div>

          <div id="keyboard">
            <div className="row">
              <button data-key="q" className="">
                q
              </button>
              <button data-key="w" className="">
                w
              </button>
              <button data-key="e" className="">
                e
              </button>
              <button data-key="r" className="">
                r
              </button>
              <button data-key="t" className="">
                t
              </button>
              <button data-key="y" className="">
                y
              </button>
              <button data-key="u" className="">
                u
              </button>
              <button data-key="i" className="">
                i
              </button>
              <button data-key="o" className="">
                o
              </button>
              <button data-key="p" className="">
                p
              </button>
            </div>
            <div className="row">
              <div className="spacer half"></div>
              <button data-key="a" className="">
                a
              </button>
              <button data-key="s" className="">
                s
              </button>
              <button data-key="d" className="">
                d
              </button>
              <button data-key="f" className="">
                f
              </button>
              <button data-key="g" className="">
                g
              </button>
              <button data-key="h" className="">
                h
              </button>
              <button data-key="j" className="">
                j
              </button>
              <button data-key="k" className="">
                k
              </button>
              <button data-key="l" className="">
                l
              </button>
              <div className="spacer half"></div>
            </div>
            <div className="row">
              <button data-key="←" className="one-and-a-half">
                <i className="fas fa-backspace"></i>
              </button>
              <button data-key="z" className="">
                z
              </button>
              <button data-key="x" className="">
                x
              </button>
              <button data-key="c" className="">
                c
              </button>
              <button data-key="v" className="">
                v
              </button>
              <button data-key="b" className="">
                b
              </button>
              <button data-key="n" className="">
                n
              </button>
              <button data-key="m" className="">
                m
              </button>
              <button data-key="↵" className="submit">
                Enter
              </button>
            </div>
            <div className="row">
              <button data-key=" " className="">
                {' '}
                Space{' '}
              </button>
            </div>
            <br />

            <button onClick={click}>Click for Song Lyrics</button>
          </div>

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
