import React from 'react';
import { getLyrics, getSong } from 'genius-lyrics-api';
import { getKendrick } from '../lib/geniusapi';
import { getLyricsFromAPI } from '../lib/api.js';
import axios from 'axios';
import Spotify from 'react-spotify-embed';

let i = 0;
let guessedCorrect = false;

const Play = () => {
  const [clue5, setClue5] = React.useState('?');
  const [clue4, setClue4] = React.useState('?');
  const [clue3, setClue3] = React.useState('?');
  const [clue2, setClue2] = React.useState('?');
  const [clue1, setClue1] = React.useState('?');
  const [guess, setGuess] = React.useState('');
  const [autoCorrectGuess, setAutoCorectGuess] = React.useState('');
  const [submittedGuess, setSubmittedGuess] = React.useState('');
  const [countdown, setCountdown] = React.useState('');
  const [searchForArtist, setSearchForArtist] = React.useState('travis scott');
  const [searchArtistURI, setSearchArtistURI] = React.useState('');
  const [fullSongInfo, setFullSongInfo] = React.useState('');
  const [fetchedSongInfo, setFetchedSongInfo] = React.useState('');
  const [spotifySongLink, setSpotifySongLink] = React.useState(
    'https://open.spotify.com/track/'
  );

  // const guessAutoCorrect = {
  //   apiKey: '4wX_AIcVI8fQHIbkWY8z95hKj_23o_04j8FOVD79b-1g_m2GXuYzyfC7pHRDoacU',
  //   title: { guess },
  //   artist: { artistName },
  //   optimizeQuery: true,
  // };

  const [scrapedLyrics, setScrapedLyrics] = React.useState(null);
  const [songTitle, setSongTitle] = React.useState(null);
  const [artistName, setArtistName] = React.useState(null);
  const songInfo = {
    song_title: `${songTitle}`,
    song_artist: `${artistName}`,
  };

  React.useEffect(() => {
    setSearchForArtist('Travis Scott');

    document.getElementById('clue_clicker').disabled = 'disabled';
    document.getElementById('clue_clicker').style.background = 'grey';
    document.getElementById('clue_clicker').innerText = 'loading lyricle';

    const getData = async () => {
      try {
        const { data } = await getKendrick(searchForArtist);
        setFetchedSongInfo(data.response.hits[0].result);
        console.log('Song INFO', fetchedSongInfo);
        setFullSongInfo(data.response.hits[0].result);
        console.log(data.response);
        setSongTitle(data.response.hits[0].result.title);
        setArtistName(data.response.hits[0].result.artist_names);
        console.log(
          'HEYHEYHEY',
          data.response.hits[0].result.primary_artist.name,
          data.response.hits[0].result.title
        );
        const data2 = await getLyricsFromAPI({
          song_title: data.response.hits[0].result.title,
          song_artist: data.response.hits[0].result.primary_artist.name,
        });
        console.log('SUCCESS', data2.data);
        setScrapedLyrics(data2.data);
      } catch (err) {
        console.error(err);
      }
    };

    const disabledValue = document.getElementById('clue_clicker');
    getData()
      .then(setScrapedLyrics())
      .then(
        // NEED TO DO A TERNARY HERE TO SAY IF NO DATA ETC

        disabledValue.removeAttribute('disabled'),
        (document.getElementById('clue_clicker').style.background =
          'rgb(169, 169, 169)'),
        (document.getElementById('clue_clicker').innerText = 'more lyrics')
      );

    setInterval(function time() {
      const d = new Date();
      // !THIS IS HARDCODED FOR A UK DEMO - NOT VALID FOR ALL TIME ZONES (-1 add on to hours)
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
  }, []);

  function autoCorrectTheGuess() {
    axios
      .request(songSearchOptions)
      .then(function (response) {
        console.log(
          'autocorrectguess',
          response.data.tracks.items[0].external_urls.spotify
        );
        setSubmittedGuess(response.data.tracks.items[0].name);
        setSpotifySongLink(response.data.tracks.items[0].external_urls.spotify);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getArtist() {
    const searchOptions = {
      method: 'GET',
      url: 'https://spotify81.p.rapidapi.com/search',
      params: {
        q: `${searchForArtist}`,
        type: 'multi',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'X-RapidAPI-Key': '28fa7e1d77msh4969210312af748p13f318jsn62715d1354c9',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com',
      },
    };

    axios
      .request(searchOptions)
      .then(function (response) {
        console.log(
          'THISSHOULDBEARTIST',
          response.data.artists.items[0].data.profile.name
        );
        const artistURI = response.data.artists.items[0].data.uri;
        setSearchArtistURI(artistURI.split('artist:')[1]);
        console.log('searchURI', searchArtistURI);
        if (artistURI !== '') {
          console.log(getKendrick());
        } else {
          console.log('FATALERROR');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // const options = {
  //   method: 'GET',
  //   url: 'https://spotify81.p.rapidapi.com/search',
  //   params: {
  //     q: `${guess},
  //       ${artistName}`,
  //     type: 'multi',
  //     offset: '0',
  //     limit: '10',
  //     numberOfTopResults: '5',
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': '28fa7e1d77msh4969210312af748p13f318jsn62715d1354c9',
  //     'X-RapidAPI-Host': 'spotify81.p.rapidapi.com',
  //   },
  // };

  const songSearchOptions = {
    method: 'GET',
    url: `https://api.spotify.com/v1/search?q=track%3A${guess}%2Bartist%3A${artistName}&type=track&market=ES&limit=10&offset=0`,
    headers: {
      authorization:
        'Bearer BQAjWR_Fbyxa6Ql-nCZA7lcF7eiu6zWA8dIT6nW-TE-5xPJkU0WfQO6HBuN9RwGVgJpCVXHhh_KiX6AY906DoS0JwzyXGfLRbNVEb8EHe_fnqK7o9gdpgOheRbBmxxHP2oUwt5VufHqwCb7F1bcA0qOnW6POzbm4CPjyjcQH0nsaXQ',
    },
  };

  function checkGuess() {
    getArtist();
    let guessField = document.getElementById('guess_field').value;
    setGuess(guessField);
    console.log('GUESSFIELD', guess, artistName);
    autoCorrectTheGuess();
  }

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

    const lyricsString = scrapedLyrics;

    if (i === 1) {
      // ! Below, The substring function on the return checks if the reponse from the api (string) inclues the phrase 'chorus',
      // ! It then returns the 40 words that follow (To allow for many annotations on the chorus headers from the Genius API response)
      // ! Then, It repeats the same process but returning 7 words after the closing bracket on the chorus tag.
      // ! This prevents any situation where the artist is listed in the chorus header i.e '[Chorus sung by The Beatles].
      // ! As if that content was returned, we wouldnt have a guessing game on our hands...

      // CLUE 1 RETURN
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
    }
    // CLUE 2 RETURN
    if (i === 2) {
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
    }
    // CLUE 3 RETURN
    if (i === 3) {
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
    }
    // CLUE 4 RETURN
    if (i === 4) {
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
        const NoClue = 'Song doesnt contain this clue!';
        setClue4(NoClue);
      }
    }
    // CLUE 5 RETURN
    if (i === 5) {
      if (lyricsString.includes('Chorus')) {
        const AfterEndingBracket = returnFourtyWords(
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
        const SevenWordsafter = returnSevenWords(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue5(SevenWordsafter);
      } else if (!lyricsString.includes('Chorus')) {
        console.log('Song doesnt contain Chorus!');
        const NoClue = 'Song doesnt contain this clue!';
        setClue5(NoClue);
      }

      document.getElementById('clue_clicker').disabled = 'disabled';
      document.getElementById('clue_clicker').style.background = 'grey';
      document.getElementById('clue_clicker').innerText = '';

      // const button = document.getElementById('clue_clicker');
      // button.parentNode.removeChild(button);
    }
  }

  function giveup() {
    console.log('giveup');
  }

  // !THIS NEEDS UPDATING AS STATE ISSUE

  // function AutocorrectSong() {
  //   getSong(guessAutoCorrect).then((song) =>
  //     console.log(
  //       'this is the autocorrected song title',
  //       `
  //     ${song.title}
  //     `
  //     )
  //   );
  // }

  let shake = document.getElementById('guesstext');
  let renderSongInfo = document.getElementById('song-info');
  // Event Listener For Enter Key On Text Field.
  const handleKeyDownOnTextField = (event) => {
    const newGuess = document.getElementById('guess_field').value;
    setGuess(newGuess);
    if (event.key === 'Enter') {
      document.body.scrollTop;
      checkGuess();
      document.getElementById('guess_field').value = '';
      //This part of the function checks to see if the submitted answer matches the song title.
      if (submittedGuess == songTitle) {
        console.log('CORRECT THE SONG WAS', songTitle, 'you scored', i);
        document.getElementById('guesstext').style.color = 'outdoorsgreen';
        // document.getElementById('guesstext').style.background = 'darkgrey';
        document.getElementById('guesstext').style.width = 'auto';
        shake.classList.toggle('shakeSuccess');

        document.getElementById('guess_field').readOnly = true;
        const disabledValue = document.getElementById('clue_clicker');

        // const disabledValue = document.getElementById('clue_clicker');

        // NEED TO DO A TERNARY HERE TO SAY IF NO DATA ETC

        disabledValue.setAttribute('class', 'disabled'),
          (document.getElementById('clue_clicker').style.background = 'grey'),
          (document.getElementById('clue_clicker').innerText = '');
        document.getElementById('song-info').style.display = 'block';

        renderSongInfo.classList.toggle('shakeSuccess');

        // setTimeout(function () {
        //   shake.classList.toggle('shakeSuccess'), 1001;
        // });
      } else if (submittedGuess !== songTitle && i <= 4) {
        click();
        setTimeout(function () {
          shake.classList.toggle('shake');
        }, 1000);
        setTimeout(function () {
          shake.classList.toggle('shake'), 1001;
        });
        // document.getElementById('guesstext').classList.toggle('shake');
        document.getElementById('guesstext').style.color = '#ff0000';
      } else {
        console.log('No More Guesses');
      }
    }
  };

  return (
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile is-multiline is-centered">
            <div id="clue_fields_wrapper">
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
            </div>

            <div className="song-info" id="song-info">
              {!fetchedSongInfo ? (
                <p></p>
              ) : (
                <>
                  {' '}
                  <img src={fetchedSongInfo.song_art_image_url} alt="" />
                </>
              )}
            </div>
            <input
              type="text"
              id="guesstext"
              className="guess_rendered_field has-text-centered"
              value={submittedGuess}
              readOnly
            />
            <div className="song-info" id="song-info">
              {!fetchedSongInfo ? (
                <p></p>
              ) : (
                <>
                  {' '}
                  <p>{fetchedSongInfo.release_date_for_display}</p>
                </>
              )}
            </div>
            <Spotify wide link={spotifySongLink} />
            <input
              type="text"
              id="guess_field"
              className="guess_typed_field has-text-centered"
              onKeyDown={handleKeyDownOnTextField}
            />
          </div>

          <div id="keyboard">
            <div className="row">
              <button id="giveup_clicker" onClick={giveup}>
                Give up ?
              </button>
              <button id="clue_clicker" onClick={click}>
                Click for Song Lyrics{' '}
                <i className="fa fa-circle-chevron-right "></i>
              </button>
            </div>
          </div>

          <div id="the-final-countdown">
            <p>Next Lyricle: {countdown}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Play;
