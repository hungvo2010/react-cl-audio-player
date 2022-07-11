import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AudioPlayer from '../../src';

// const songs = [
//   {
//     url: 'http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3',
//     cover:
//       'http://www.nossoarmario.com/blog/wp-content/uploads/2015/01/redfoo.jpg',
//     artist: {
//       name: 'Redfoo',
//       song: 'New Thang',
//     },
//   },
//   {
//     url: 'http://a.tumblr.com/tumblr_lpoc6cHNDP1r0jthjo1.mp3',
//     cover:
//       'http://www.cmchatlive.com/scenic/wp-content/uploads/2015/05/hugo-99-problems-country-that.jpg',
//     artist: {
//       name: 'Hugo',
//       song: '99 Problems',
//     },
//   },
//   {
//     url: 'http://claymore.france.free.fr/momo/summer love.mp3',
//     cover:
//       'http://myuvn.com/wp-content/uploads/2015/07/justin-timberlake-pusher-love-girl.jpg',
//     artist: {
//       name: 'Justin Timberlake',
//       song: 'Summer Love',
//     },
//   },
//   {
//     url: 'http://a.tumblr.com/tumblr_mlyactVSyX1qejx3lo1.mp3',
//     cover:
//       'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2015/06/daft-punk.jpg',
//     artist: {
//       name: 'Daft Punk',
//       song: 'Get Lucky',
//     },
//   },
//   {
//     url: 'http://a.tumblr.com/tumblr_lxe7hpIUPA1r3ne4ro1.mp3',
//     artist: {
//       name: 'Michael Buble',
//       song: 'Feeling Good',
//     },
//   },
//   {
//     url:
//       'http://dl.tak3da.com/download/1394/03/The Weeknd - Can t Feel My Face [320].mp3',
//     cover:
//       'http://www.clickgratis.com.br/fotos-imagens/the-weekend/aHR0cDovL3d3dy5iaWxsYm9hcmQuY29tL2ZpbGVzL3N0eWxlcy9wcm9tb182NTAvcHVibGljL21lZGlhL3RoZS13ZWVrZW5kLXRoZS1oaWxscy12aWRlby1iaWxsYm9hcmQtNjUwLmpwZw==.jpg',
//     artist: {
//       name: 'The Weekend',
//       song: "Can't Fell My Face",
//     },
//   },
//   {
//     url:
//       'http://midnightoilco.net/sitebuildercontent/sitebuilderfiles/metallicafuel.mp3',
//     cover: 'http://imagens.ailhadometal.com/2015/03/Metallica3.png',
//     artist: {
//       name: 'Metallica',
//       song: 'Fuel',
//     },
//   },
// ];

const songs = [
  {
    mediaId: 76,
    cover:
      'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2015/06/daft-punk.jpg',
    artist: {
      name: 'Daft Punk',
      song: 'Get Lucky',
    },
  },
  {
    mediaId: 77,
    cover:
      'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2015/06/daft-punk.jpg',
    artist: {
      name: 'Daft Punk',
      song: 'Get Lucky',
    },
  },
  {
    mediaId: 78,
    cover:
      'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2015/06/daft-punk.jpg',
    artist: {
      name: 'Daft Punk',
      song: 'Get Lucky',
    },
  },
  {
    mediaId: 79,
    cover:
      'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2015/06/daft-punk.jpg',
    artist: {
      name: 'Daft Punk',
      song: 'Get Lucky',
    },
  },
];

ReactDOM.render(
  <div className="container">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,400,700"
      rel="stylesheet"
      type="text/css"
    />

    <h1>CLAudioPlayer</h1>
    <h2>
      <a href="https://github.com/cezarlz/react-cl-audio-player">
        View project on GitHub
      </a>
    </h2>
    <AudioPlayer songs={songs} />

    <div class="footer">Copyright &copy; 2018 Cezar Luiz.</div>
  </div>,
  document.querySelector('#demo')
);
