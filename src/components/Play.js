import React from 'react';
import { getLyrics, getSong } from 'genius-lyrics-api';
import { getKendrick } from '../lib/geniusapi';

const options = {
  apiKey: '4wX_AIcVI8fQHIbkWY8z95hKj_23o_04j8FOVD79b-1g_m2GXuYzyfC7pHRDoacU',
  title: 'bohemian rhapsody',
  artist: 'queen',
  optimizeQuery: true,
};

// const KendrickStats = () => {};
// setInterval(getLyrics(), 5000);
document.addEventListener('keyup', function (event) {
  if (event.code === 'ArrowDown') {
    console.log('Down is pressed!');
  }
});

let i = 0;

const Home = () => {
  function click() {
    i++;
    console.log(i);

    const returnSevenWords = (s) =>
      s.split(/[.?!]/)[0].split(' ').slice(0, 7).join(' ');
    const returnFiveWords = (s) =>
      s.split(/[.?!]/)[0].split(' ').slice(0, 5).join(' ');
    const returnThreeWords = (s) =>
      s.split(/[.?!]/)[0].split(' ').slice(0, 5).join(' ');
    const returnFourtyWords = (s) =>
      s.split(/[.?!]/)[0].split(' ').slice(0, 40).join(' ');

    if (i === 1) {
      getLyrics(options).then((lyrics) => {
        const lyricsString = lyrics;

        // ! Below, The substring function on the return checks if the reponse from the api (string) inclues the phrase 'chorus',
        // ! It then returns the 40 words that follow (To allow for many annotations on the chorus headers from the Genius API response)
        // ! Then, It repeats the same process but returning 7 words after the closing bracket on the chorus tag.
        // ! This prevents any situation where the artist is listed in the chorus header i.e '[Chorus sung by The Beatles].
        // ! As if that content was returned, we wouldnt have a guessing game on our hands...

        // VERSE 4 RETURN

        if (lyricsString.includes('Verse 4')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Verse 4'))
          );
          const SevenWordsafter = returnSevenWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue1(SevenWordsafter);
        } else {
          const NoClue = 'Song doesnt contain this clue!';
          setClue1(NoClue);
        }
      });
    }
    if (i === 2) {
      getLyrics(options).then((lyrics) => {
        const lyricsString = lyrics;
        // VERSE 3 RETURN
        if (lyricsString.includes('Verse 3')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Verse 3'))
          );
          const SevenWordsafter = returnSevenWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue2(SevenWordsafter);
        } else {
          const NoClue = 'Song doesnt contain this clue!';
          setClue2(NoClue);
        }
      });
    }
    if (i === 3) {
      getLyrics(options).then((lyrics) => {
        const lyricsString = lyrics;
        // VERSE 2 RETURN
        if (lyricsString.includes('Verse 2')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Verse 2'))
          );
          const SevenWordsafter = returnSevenWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue3(SevenWordsafter);
        } else {
          const NoClue = 'Song Doesnt Contain this clue!';
          setClue3(NoClue);
        }
      });
    }
    if (i === 4) {
      getLyrics(options).then((lyrics) => {
        const lyricsString = lyrics;
        // VERSE 1 RETURN
        if (lyricsString.includes('Verse 1')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Verse 1'))
          );
          const SevenWordsafter = returnSevenWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue4(SevenWordsafter);
        } else {
          console.log('Song doesnt contain Verse 1!');
        }
      });
    }
    if (i === 5) {
      getLyrics(options).then((lyrics) => {
        const lyricsString = lyrics;
        // CHORUS CLUE RETURN
        if (lyricsString.includes('Chorus')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Chorus'))
          );
          console.log(
            'CHORUS CLUE INITIAL RETURN:       ',
            lyricsString.substring(lyricsString.indexOf('Chorus'))
          );
          const SevenWordsafter = returnSevenWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue5(SevenWordsafter);
        } else if (lyricsString.includes('Intro')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Intro'))
          );
          // console.log(
          //   'CHORUS CLUE ALT RETURN:       ',
          //   lyricsString.substring(lyricsString.indexOf('Intro'))
          // );
          const SevenWordsafter = returnSevenWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue5(SevenWordsafter);
        }
      });
      // document.getElementById('clue_clicker').disabled = 'disabled';
      // document.getElementById('clue_clicker').style.background = 'transparent';
      // document.getElementById('clue_clicker').style.color = 'transparent';
      const button = document.getElementById('clue_clicker');
      button.parentNode.removeChild(button);
    }

    // getSong(options).then((song) =>
    //   console.log(`
    // ${song.id}
    // ${song.title}
    // ${song.albumArt}
    // ${song.lyrics}`)
    // );
  }

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

  // !THIS NEEDS UPDATING AS STATE ISSUE
  // const btn = document.querySelectorAll('#keyboard button');

  // btn.forEach(function (elm) {
  //   elm.addEventListener('click', function () {
  //     const r = document.querySelector(['active']);
  //     const l = elm.dataset.key;
  //     console.log(l);
  //     setGuess([guess].append(l));

  //     if (l === '←') {
  //       if (Number(r.dataset.length) > 0) {
  //         r.querySelectorAll('.letter')[r.dataset.length].dataset.letter = '';
  //         r.querySelectorAll('.letter')[r.dataset.length].innerText = '';
  //       }
  //     } else if (l === '↵') {
  //       //   if (Number(r.dataset.length) === 0) {

  //       //     console.log('noguess')
  //       //   }
  //       // } else {
  //       //   if (Number(r.dataset.length) < 5) {
  //       //     r.dataset.word = r.dataset.word + l;
  //       //     r.querySelectorAll('.letter')[r.dataset.length].dataset.letter = l;
  //       //     r.querySelectorAll('.letter')[r.dataset.length].innerText = l;
  //       //     r.dataset.length = Number(r.dataset.length) + 1;
  //       //   }
  //       console.log('hit enter');
  //     }
  //   });
  // });

  // Event Listener For Enter Key On Text Field.
  const handleKeyDownOnTextField = (event) => {
    if (event.key === 'Enter') {
      const newGuess = document.getElementById('guess_field').value;
      setGuess(newGuess);
      document.getElementById('guess_field').value = '';
    }
  };

  // Event Listener For Next Clue,
  const handleKeyDownOnClue = (event) => {
    if (event.key === 'ArrowDown') {
      console.log('Arrow Button, Pressed Down');
    }
  };

  const [clue5, setClue5] = React.useState('?');
  const [clue4, setClue4] = React.useState('?');
  const [clue3, setClue3] = React.useState('?');
  const [clue2, setClue2] = React.useState('?');
  const [clue1, setClue1] = React.useState('?');
  const [guess, setGuess] = React.useState('');
  const [countdown, setCountdown] = React.useState('time');

  setInterval(function time() {
    const d = new Date();
    // !THIS IS HARDCODED FOR UK DEMO - NOT VALID FOR ALL TIME ZONES
    const hours = 24 - d.getHours() - 1;
    let min = 60 - d.getMinutes();
    if ((min + '').length === 1) {
      min = '0' + min;
    }
    let sec = 60 - d.getSeconds();
    if ((sec + '').length === 1) {
      sec = '0' + sec;
    }
    setCountdown(hours + ':' + min + ':' + sec);
  }, 1000);

  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile is-multiline is-centered">
            <input
              type="text"
              className="clue_field has-text-centered is-half"
              value={clue1}
              readOnly
            />
            <input
              type="text"
              className="clue_field has-text-centered"
              value={clue2}
              readOnly
            />
            <input
              type="text"
              className="clue_field has-text-centered"
              value={clue3}
              readOnly
            />
            <input
              type="text"
              className="clue_field has-text-centered"
              value={clue4}
              readOnly
            />
            <input
              type="text"
              className="clue_field has-text-centered"
              value={clue5}
              readOnly
            />
            <input
              type="text"
              className="guess_rendered_field has-text-centered"
              value={guess}
              readOnly
            />

            <input
              type="text"
              id="guess_field"
              className="guess_typed_field has-text-centered"
              onKeyDown={handleKeyDownOnTextField}
            />
          </div>
          <div className="row">
            <button className="is-ghost">
              <i className="fa fa-circle-chevron-right yellow-color"></i>
            </button>
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
              <button data-key="↵" className="submit">
                Submit
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
              <button data-key="←" className="one-and-a-half">
                <i className="fas fa-backspace"></i>
              </button>
            </div>
            <div className="row">
              <button data-key=" " className="">
                {' '}
                Space{' '}
              </button>
            </div>
            <br />

            <button id="clue_clicker" onClick={click}>
              Click for Song Lyrics
            </button>
          </div>

          <div id="the-final-countdown">
            <p>Next Lyricle in : {countdown}</p>
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
