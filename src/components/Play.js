import React from 'react';
import { getLyrics, getSong } from 'genius-lyrics-api';
import { getKendrick, getPlaylistFromApi } from '../lib/geniusapi';
import { getLyricsFromAPI } from '../lib/api.js';
import axios from 'axios';
import Spotify from 'react-spotify-embed';

let i = 0;
let guessedCorrect = false;
let x = 0;
const Play = () => {
  const [clue5, setClue5] = React.useState('?');
  const [clue4, setClue4] = React.useState('?');
  const [clue3, setClue3] = React.useState('?');
  const [clue2, setClue2] = React.useState('?');
  const [clue1, setClue1] = React.useState('...');
  const [guess, setGuess] = React.useState('');
  const [autoCorrectGuess, setAutoCorectGuess] = React.useState('');
  const [submittedGuess, setSubmittedGuess] = React.useState('');
  const [correctGuess, setCorrectGuess] = React.useState('');
  const [countdown, setCountdown] = React.useState('');
  const [searchForArtist, setSearchForArtist] = React.useState('Harry styles');
  const [searchArtistURI, setSearchArtistURI] = React.useState('');
  const [fullSongInfo, setFullSongInfo] = React.useState('');
  const [fetchedSongInfo, setFetchedSongInfo] = React.useState('');
  const [spotifySongLink, setSpotifySongLink] = React.useState(
    'https://open.spotify.com/track/'
  );
  const [playlistInfo, setPlaylistInfo] = React.useState('');

  const [scrapedLyrics, setScrapedLyrics] = React.useState(null);
  const [songTitle, setSongTitle] = React.useState(null);
  const [artistName, setArtistName] = React.useState(null);
  const songInfo = {
    song_title: `${songTitle}`,
    song_artist: `${artistName}`
  };
  let shake = document.getElementById('guesstext');
  let renderSongInfo = document.getElementById('song-info');

  async function getPlaylistData() {
    try {
      const { data } = await getPlaylistFromApi().then(
        console.log('gotPlaylistData')
      );
      setPlaylistInfo(data);

      (songInfo.song_title = data.tracks.items[0].track.name),
        (songInfo.song_artist = data.tracks.items[0].track.artists[0].name);
      console.log(songInfo);
    } catch (err) {
      console.err(err);
    }
  }
  // !! IF SEARCHING FOR ONE ARTIST UNCOMMENT
  // async function getSongData() {
  //   const disabledValue = document.getElementById('clue_clicker');
  //   try {
  //     const { data } = await getKendrick(searchForArtist).then(
  //       // NEED TO DO A TERNARY HERE TO SAY IF NO DATA ETC
  //       console.log('Success', data),
  //       disabledValue.removeAttribute('disabled'),
  //       (document.getElementById('clue_clicker').style.background =
  //         'rgb(169, 169, 169)'),
  //       (document.getElementById('clue_clicker').innerText = 'START LYRICLE')
  //     );
  //     setFetchedSongInfo(data.response.hits[x].result);
  //     console.log('Song INFO', fetchedSongInfo);
  //     setFullSongInfo(data.response.hits[x].result);
  //     console.log(data.response);
  //     setSongTitle(data.response.hits[x].result.title);
  //     setArtistName(data.response.hits[x].result.artist_names);
  //     console.log(
  //       'HEYHEYHEY',
  //       data.response.hits[x].result.primary_artist.name,
  //       data.response.hits
  //     );
  //     const data2 = await getLyricsFromAPI({
  //       song_title: data.response.hits[x].result.title,
  //       song_artist: data.response.hits[x].result.primary_artist.name
  //     });
  //     console.log('SUCCESS', data2.data);
  //     setScrapedLyrics(data2.data);
  //     if (scrapedLyrics != '') {
  //       setClue1(`Tap 'More Lyrics?' to start! 🥳`);
  //       document.getElementById('clue_clicker').innerText = 'more lyrics?';
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  async function getSongData() {
    const disabledValue = document.getElementById('clue_clicker');
    try {
      const { data } = await getKendrick(searchForArtist).then(
        // NEED TO DO A TERNARY HERE TO SAY IF NO DATA ETC
        console.log('Success', data),
        disabledValue.removeAttribute('disabled'),
        (document.getElementById('clue_clicker').style.background =
          'rgb(169, 169, 169)'),
        (document.getElementById('clue_clicker').innerText = 'START LYRICLE')
      );

      setSongTitle(songInfo.song_title);
      setArtistName(songInfo.song_artist);
      console.log(
        'HEYHEYHEY',
        data.response.hits[x].result.primary_artist.name,
        data.response.hits
      );
      const data2 = await getLyricsFromAPI({
        song_title: data.response.hits[x].result.title,
        song_artist: data.response.hits[x].result.primary_artist.name
      });
      console.log('SUCCESS', data2.data);
      setScrapedLyrics(data2.data);
      if (scrapedLyrics != '') {
        setClue1(`Tap 'More Lyrics?' to start! 🥳`);
        document.getElementById('clue_clicker').innerText = 'more lyrics?';
      }
    } catch (err) {
      console.error(err);
    }
  }

  const clueClicker = document.getElementById('clue_clicker');

  React.useEffect(() => {
    document.getElementById('clue_clicker').disabled = 'disabled';
    document.getElementById('giveup_clicker').disabled = 'disabled';
    document.getElementById('giveup_clicker').style.background = 'grey';
    document.getElementById('clue_clicker').style.background = 'grey';
    document.getElementById('clue_clicker').innerText = 'loading lyricle';

    getPlaylistData();
    getSongData();

    // getData()

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

    if (autoCorrectGuess == songTitle || guess == songTitle) {
      clueClicker.addEventListener('click', resetLyricle);
      document.getElementById('clue_clicker').innerText = 'next song';
      console.log('CORRECT THE SONG WAS', songTitle, 'you scored', i);
      document.getElementById('guesstext').style.color = 'gold';
      // document.getElementById('guesstext').style.background = 'darkgrey';
      document.getElementById('guesstext').style.width = 'auto';
      shake.classList.toggle('shakeSuccess');

      // const disabledValue = document.getElementById('clue_clicker');
      // disabledValue.setAttribute('class', 'disabled'),
      (document.getElementById('clue_clicker').style.background = 'dark grey'),
        (document.getElementById('song-info').style.display = 'flex');
      renderSongInfo.classList.toggle('shakeSuccess');
      console.log('x', x);
    } else if (autoCorrectGuess !== songTitle && i <= 4) {
      setTimeout(function () {
        shake.classList.toggle('shake');
      }, 1000);
      setTimeout(function () {
        shake.classList.toggle('shake'), 1001;
      });
      // document.getElementById('guesstext').classList.toggle('shake');
      document.getElementById('guesstext').style.color = '#ff0000';
    }
  }, [correctGuess]);

  function autoCorrectTheGuess() {
    axios
      .request(options)
      .then(function (response) {
        console.log('autocorrectguess', response.data);
        setSubmittedGuess(response.data.tracks[0].data.name);
        setAutoCorectGuess(response.data.tracks[0].data.name);
        setCorrectGuess(response.data.tracks[0].data.name);
        console.log(
          'THIS IS WHAT SHOULD BE THE AUTOCORRECT GUESS',
          autoCorrectGuess
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getSpotifySongLink() {
    axios
      .request(songSearchOptions)
      .then(function (response) {
        console.log(
          'spotifysonglink',
          response.data.tracks.items[0].external_urls.spotify
        );
        setSpotifySongLink(response.data.tracks.items[0].external_urls.spotify);
      })

      .catch(function (error) {
        console.error(error);
      });
  }

  const getSongs = async () => {
    i = -1;
    if (x == 2) {
      x = 4;
    }
    if (x == 9) {
      document.getElementById('clue_clicker').innerText = 'NO MORE SONGS ';
    }
    document.getElementById('clue_clicker').innerText = 'getting lyrics';
    console.log('x is now=', x);
    try {
      const { data } = await getKendrick(searchForArtist).then(
        (document.getElementById('clue_clicker').innerText = 'more lyrics?')
      );
      setFetchedSongInfo(data.response.hits[x].result);
      console.log('New Song INFO', searchForArtist, getKendrick, data.response);
      setFullSongInfo(data.response.hits[x].result);
      console.log(data.response);
      setSongTitle(data.response.hits[x].result.title);
      setArtistName(data.response.hits[x].result.artist_names);
      console.log(
        'HEYHEYHEY',
        data.response.hits[x].result.primary_artist.name,
        data.response.hits[x].result.title
      );
      const data2 = await getLyricsFromAPI({
        song_title: data.response.hits[x].result.title,
        song_artist: data.response.hits[x].result.primary_artist.name
      });

      console.log('SUCCESS', data2.data);
      setScrapedLyrics(data2.data);
      if (scrapedLyrics != '') {
        setClue1('Click more lyrics...');
      }
    } catch (err) {
      console.error(err);
    }
  };

  function resetLyricle() {
    console.log('YAS BITCh');
    setClue1('Loading...');
    setClue2('?');
    setClue3('?');
    setClue4('?');
    setClue5('?');
    setGuess('');
    setSubmittedGuess('');
    i = 0;

    setScrapedLyrics('');
    clueClicker.removeEventListener('click', resetLyricle);
    x++;
    getSongs();
    document.getElementById('song-info').style.display = 'none';
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
        numberOfTopResults: '5'
      },
      headers: {
        'X-RapidAPI-Key': '6d722cd7d3msha3ef33382ba2326p13605ajsne131a1188a7b',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
      }
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

  const options = {
    method: 'GET',
    url: 'https://spotify81.p.rapidapi.com/search',
    params: {
      q: `${guess},
        ${artistName}`,
      type: 'multi',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5'
    },
    headers: {
      'X-RapidAPI-Key': '6d722cd7d3msha3ef33382ba2326p13605ajsne131a1188a7b',
      'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
  };

  const songSearchOptions = {
    method: 'GET',
    url: `https://api.spotify.com/v1/search?q=track%3A${guess}%2Bartist%3A${artistName}&type=track&market=ES&limit=10&offset=0`,
    headers: {
      authorization:
        'Bearer BQBgDky9r3CAsSBjqgGNOxewwjaRvxhZ7r9IniakNP28tpb8zc4xiFiZ78_s48ROrfLce_lEvqL14mhOirfJ0WEsnrl4LVg3thA3TqDShMhxZRmiJFTGcsyoO6pWmv2_JJsXDE-akXjdfVuWN4x3OjrLJNCrTpdjkg1TA7LU-8PT6w'
    }
  };

  function checkGuess() {
    getArtist();
    let guessField = document.getElementById('guess_field').value;
    setGuess(guessField);
    console.log('GUESSFIELD', guess, artistName);
    autoCorrectTheGuess();
    getSpotifySongLink();
  }

  function click() {
    i++;
    console.log(i);

    const returnSevenWordsAfterFourteen = (s) =>
      s.split(/[]/)[0].split(' ').slice(14, 21).join(' ');
    const returnSevenWordsAfterSeven = (s) =>
      s.split(/[]/)[0].split(' ').slice(7, 14).join(' ');
    const returnSevenWords = (s) =>
      s.split(/[]/)[0].split(' ').slice(0, 7).join(' ');
    const returnFiveWords = (s) =>
      s.split(/[]/)[0].split(' ').slice(0, 5).join(' ');
    const returnThreeWords = (s) =>
      s.split(/[]/)[0].split(' ').slice(0, 5).join(' ');
    const returnFourtyWords = (s) =>
      s.split(/[]/)[0].split(' ').slice(0, 40).join(' ');

    const returnThirtyWords = (s) =>
      s.split(/[]/)[0].split(' ').slice(0, 30).join(' ');
    const returnFiveWordsWithAllSymbols = (s) =>
      s.split(/[]/)[0].split(' ').slice(0, 5).join(' ');

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
      } else if (lyricsString.includes('Verse 3')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse 3'))
        );
        const SevenWordsafter = returnSevenWordsAfterFourteen(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue1(SevenWordsafter);
      } else if (lyricsString.includes('Verse 2')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse 2'))
        );
        const SevenWordsafter = returnSevenWordsAfterFourteen(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue1(SevenWordsafter);
      } else if (lyricsString.includes('Verse 1')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse 1'))
        );
        const SevenWordsafter = returnSevenWordsAfterFourteen(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue1(SevenWordsafter);
      } else if (lyricsString.includes('Verse')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse'))
        );
        const SevenWordsafter = returnSevenWordsAfterFourteen(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue1(SevenWordsafter);
      } else {
        const NoClue = 'Unlucky 🤪 Song doesnt contain this clue!';
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
      } else if (lyricsString.includes('Verse 2')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse 2'))
        );
        const SevenWordsafter = returnSevenWordsAfterSeven(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue2(SevenWordsafter);
      } else if (lyricsString.includes('Verse 1')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse 1'))
        );
        const SevenWordsafter = returnSevenWordsAfterSeven(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue2(SevenWordsafter);
      } else if (lyricsString.includes('Verse')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse'))
        );
        const SevenWordsafter = returnSevenWordsAfterSeven(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue2(SevenWordsafter);
      } else {
        const NoClue = 'Unlucky 🤪 Song doesnt contain this clue!';
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
      } else if (lyricsString.includes('Verse 1')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse 1'))
        );
        const SevenWordsafter = returnSevenWordsAfterSeven(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue3(SevenWordsafter);
      } else if (lyricsString.includes('Verse')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse'))
        );
        const SevenWordsafter = returnSevenWords(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue3(SevenWordsafter);
      } else {
        const NoClue = 'Unlucky 🤪 Song doesnt contain this clue!';
        setClue3(NoClue);
      }
    }
    // CLUE 4 RETURN
    if (i === 4) {
      if (lyricsString.includes('Verse 1')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Verse 1'))
        );
        console.log('PROBLEM AREA', AfterEndingBracket);
        const SevenWordsafter = returnSevenWords(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue4(SevenWordsafter);
      } else if (lyricsString.includes('Intro')) {
        const AfterEndingBracket = returnFourtyWords(
          lyricsString.substring(lyricsString.indexOf('Intro'))
        );
        const SevenWordsafter = returnSevenWordsAfterSeven(
          AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
        )
          .replace(/\r?\n|\r/g, ' ')
          .toLowerCase();
        setClue4(SevenWordsafter);
      } else {
        console.log('Song doesnt contain Verse 1!');
        const NoClue = 'Unlucky 🤪 Song doesnt contain this clue!';
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
        const NoClue = 'Unlucky 🤪 Song doesnt seem to have a chorus!';
        setClue5(NoClue);
      } else {
        console.log('no more lyrics');
      }

      // document.getElementById('clue_clicker').disabled = 'disabled';
      document.getElementById('clue_clicker').style.background = 'grey';
      document.getElementById('clue_clicker').innerText = 'No More Clues';
      const disabledGiveupClicker = document.getElementById('giveup_clicker');
      disabledGiveupClicker.style.background = 'darkgrey';
      disabledGiveupClicker.removeAttribute('disabled');

      // const button = document.getElementById('clue_clicker');
      // button.parentNode.removeChild(button);
    }
  }

  function giveup() {
    document.getElementById('clue_clicker').innerText = songTitle;
  }

  const handleKeyDownOnTextField = (event) => {
    const newGuess = document.getElementById('guess_field').value;
    setGuess(newGuess);

    if (event.key === 'Enter') {
      console.log('guess', guess);
      document.body.scrollTop;
      checkGuess();
      document.getElementById('guess_field').value = '';
      //This part of the function checks to see if the submitted answer matches the song title.
      if (autoCorrectGuess == songTitle) {
        // console.log('CORRECT THE SONG WAS', songTitle, 'you scored', i);
        // document.getElementById('guesstext').style.color = 'outdoorsgreen';
        // // document.getElementById('guesstext').style.background = 'darkgrey';
        // document.getElementById('guesstext').style.width = 'auto';
        // shake.classList.toggle('shakeSuccess');
        // document.getElementById('guess_field').readOnly = true;
        // const disabledValue = document.getElementById('clue_clicker');
        // disabledValue.setAttribute('class', 'disabled'),
        //   (document.getElementById('clue_clicker').style.background = 'grey'),
        //   (document.getElementById('clue_clicker').innerText = '');
        // document.getElementById('song-info').style.display = 'block';
        // renderSongInfo.classList.toggle('shakeSuccess');
        // clueClicker.addEventListener('click', resetLyricle);
      } else if (autoCorrectGuess !== songTitle && i <= 4) {
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
                  <img
                    id="song-image"
                    src={fetchedSongInfo.song_art_image_url}
                    alt=""
                  />
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
            {/* <Spotify wide link={spotifySongLink} /> */}
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
