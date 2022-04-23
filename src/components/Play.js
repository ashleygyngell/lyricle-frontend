import React from 'react';
import { getLyrics, getSong } from 'genius-lyrics-api';
import { getKendrick } from '../lib/geniusapi';

const options = {
  apiKey: '4wX_AIcVI8fQHIbkWY8z95hKj_23o_04j8FOVD79b-1g_m2GXuYzyfC7pHRDoacU',
  title: 'If these walls',
  artist: 'Kendrik',
  optimizeQuery: true,
};

function click() {
  const returnSevenWords = (s) =>
    s.split(/[.?!]/)[0].split(' ').slice(0, 7).join(' ');
  const returnFiveWords = (s) =>
    s.split(/[.?!]/)[0].split(' ').slice(0, 5).join(' ');
  const returnThreeWords = (s) =>
    s.split(/[.?!]/)[0].split(' ').slice(0, 5).join(' ');
  const returnFourtyWords = (s) =>
    s.split(/[.?!]/)[0].split(' ').slice(0, 40).join(' ');

  getLyrics(options).then((lyrics) => {
    const lyricsString = lyrics;
    if (lyricsString.includes('Chorus')) {
      console.log(
        'c clue: ',
        returnSevenWords(
          lyricsString.substring(lyricsString.indexOf('Chorus') + 7)
        )
      );
    } else {
      console.log('doesnt');
    }

    // ! Below, The substring function on the return checks if the reponse from the api (string) inclues the phrase 'chorus',
    // ! It then returns the 40 words that follow (To allow for many annotations on the chorus headers from the Genius API response)
    // ! Then, It repeats the same process but returning 7 words after the closing bracket on the chorus tag.
    // ! This prevents any situation where the artist is listed in the chorus header i.e '[Chorus sung by The Beatles].
    // ! As if that content was returned, we wouldnt have a guessing game on our hands...

    if (lyricsString.includes('Chorus')) {
      const AfterEndingBracket = returnFourtyWords(
        lyricsString.substring(lyricsString.indexOf('Chorus'))
      );
      console.log(
        'THIS',
        lyricsString.substring(lyricsString.indexOf('Chorus'))
      );

      const SevenWordsafter = returnSevenWords(
        AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
      );

      console.log('Return after bracket:', SevenWordsafter);
    } else {
      console.log('doesnt');
    }
    // if (lyricsString.includes('Verse 2')) {
    //   console.log(
    //     'v2 clue: ',
    //     returnThreeWords(
    //       lyricsString.substring(lyricsString.indexOf('Verse 2') + 8)
    //     )
    //   );
    // } else {
    //   console.log('doesnt');
    // }
    // if (lyricsString.includes('Verse 3')) {
    //   console.log(
    //     'v3 clue: ',
    //     returnThreeWords(
    //       lyricsString.substring(lyricsString.indexOf('Verse 3') + 8)
    //     )
    //   );
    // } else {
    //   console.log('doesnt have a verse 3');
    // }
    // if (lyricsString.includes('Verse 3')) {
    //   console.log(
    //     'Test ',
    //     returnThreeWords(
    //       lyricsString.substring(lyricsString.indexOf('Verse 3') + 8)
    //     )
    //   );
    // } else {
    //   console.log('doesnt have a verse 3');
    // }
  });

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

  const [guess, setGuess] = React.useState('hi');

  const btn = document.querySelectorAll('#keyboard button');

  btn.forEach(function (elm) {
    elm.addEventListener('click', function () {
      const r = document.querySelector(['active']);
      const l = elm.dataset.key;
      console.log(l);
      setGuess([guess].append(l));

      if (l === '←') {
        if (Number(r.dataset.length) > 0) {
          r.querySelectorAll('.letter')[r.dataset.length].dataset.letter = '';
          r.querySelectorAll('.letter')[r.dataset.length].innerText = '';
        }
      } else if (l === '↵') {
        //   if (Number(r.dataset.length) === 0) {

        //     console.log('noguess')
        //   }
        // } else {
        //   if (Number(r.dataset.length) < 5) {
        //     r.dataset.word = r.dataset.word + l;
        //     r.querySelectorAll('.letter')[r.dataset.length].dataset.letter = l;
        //     r.querySelectorAll('.letter')[r.dataset.length].innerText = l;
        //     r.dataset.length = Number(r.dataset.length) + 1;
        //   }
        console.log('hit enter');
      }
    });
  });

  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile is-multiline is-centered">
            <input
              type="text"
              className="clue_field has-text-centered is-half"
            />
            <input
              type="text hidden"
              className="clue_field has-text-centered"
            />
            <input type="text" className="clue_field has-text-centered" />
            <input type="text" className="clue_field has-text-centered" />
            <input type="text" className="clue_field has-text-centered" />
            <textarea className="guess_field has-text-centered">
              {guess}
            </textarea>
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
                Submit
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
