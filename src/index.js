import React, { PureComponent, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style/AudioPlayer.css';
import ParserUtil from './util/parserUtil.js';
import FetchUtil from './util/fetchUtil.js';
import DecryptUtil from './util/decryptUtil.js';
import HashUtil from './util/hashUtil';

class AudioPlayer extends PureComponent {
  userId = 1;
  userAlreadyInteract = false;

  static propTypes = {
    songs: PropTypes.array.isRequired,
    autoplay: PropTypes.bool,
    onTimeUpdate: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
  };

  static defaultProps = {
    onTimeUpdate: () => { },
    onEnded: () => { },
    onError: () => { },
    onPlay: () => { },
    onPause: () => { },
    onPrevious: () => { },
    onNext: () => { },
  };

  constructor(props) {
    super(props);

    this.state = {
      active: props.songs[0],
      songs: props.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!props.autoplay,
      repeat: false,
      mute: false,
    };

    this.usageLicense = {};
    this.chorus = {};
    this.audio = document.createElement('audio');
    this.audio.src = -1;

    this.audio.addEventListener('timeupdate', e => {
      this.updateProgress();
      props.onTimeUpdate(e);
    });

    this.audio.addEventListener('ended', e => {
      if (this.state.songs.length > 1 || this.state.repeat) {
        this.next();
      } else {
        this.setState({ playing: false, progress: 0 });
      }
      props.onEnded(e);
    });

    this.audio.addEventListener('error', e => {
      this.next();
      props.onError(e);
    });

    document.addEventListener('mousemove', event => {
      this.userAlreadyInteract = true;
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.songs[0],
      songs: nextProps.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!nextProps.autoplay,
      repeat: false,
      mute: false,
    });
  }

  shuffle = arr => arr.sort(() => Math.random() - 0.5);

  updateProgress = () => {
    const { duration, currentTime } = this.audio;
    const progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress,
    });
  };

  setProgress = e => {
    if (this.usageLicense.canSeek === false) {
      return;
    }
    const target =
      e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = this.audio.duration;
    const currentTime = (duration * offsetX) / width;
    if (this.usageLicense.listenChorusOnly === true && (currentTime * 1000 < this.chorus.startChorus || currentTime * 1000 > this.chorus.endChorus)) {
      return;
    }
    const progress = (currentTime * 100) / duration;

    this.audio.currentTime = currentTime;

    this.setState({
      progress: progress,
    });

    this.play();
  };

  play = () => {
    this.setState({
      playing: true,
    });
    this.audio.play();
    this.props.onPlay();
  };

  pause = () => {
    this.setState({
      playing: false,
    });

    this.audio.pause();

    this.props.onPause();
  };

  toggle = () => (this.state.playing ? this.pause() : this.play());

  next = async () => {
    const { repeat, current, songs } = this.state;
    const total = songs.length;
    const newSongToPlay = repeat
      ? current
      : current < total - 1
        ? current + 1
        : 1;
    const active = songs[newSongToPlay];

    this.setState({
      current: newSongToPlay,
      active: active,
      progress: 0,
      repeat: false,
    });

    this.audio.src = await this.getDecryptedMediaUrl(active.mediaId, this.userId);
    if (this.userAlreadyInteract){
      this.play();
    }
    this.props.onNext();
  };

  previous = async () => {
    const { current, songs } = this.state;
    const total = songs.length;
    const newSongToPlay = current > 0 ? current - 1 : total - 1;
    const active = songs[newSongToPlay];

    this.setState({
      current: newSongToPlay,
      active: active,
      progress: 0,
    });

    this.audio.src = await this.getDecryptedMediaUrl(active.mediaId, this.userId);
    this.play();
    this.props.onPrevious();
  };

  randomize = () => {
    const { random, songs } = this.state;
    const shuffled = this.shuffle(songs.slice());

    this.setState({
      songs: !random ? shuffled : songs,
      random: !random,
    });
  };

  repeat = () =>
    this.setState({
      repeat: !this.state.repeat,
    });

  toggleMute = () => {
    const { mute } = this.state;

    this.setState({
      mute: !mute,
    });

    this.audio.volume = !!mute;
  };

  render() {
    const {
      active: currentSong,
      progress,
      active,
      playing,
      mute,
      random,
      repeat,
    } = this.state;

    const coverClass = classNames({
      'player-cover': true,
      'no-height': !!active.cover === false,
    });

    const playPauseClass = classNames({
      fa: true,
      'fa-play': !playing,
      'fa-pause': playing,
    });

    const volumeClass = classNames({
      fa: true,
      'fa-volume-up': !mute,
      'fa-volume-off': mute,
    });

    const randomClass = classNames({
      'player-btn small random': true,
      active: random,
    });

    const repeatClass = classNames({
      'player-btn small repeat': true,
      active: repeat,
    });

    return (
      <div className="player-container">
        <div
          className={coverClass}
          style={{
            backgroundImage: `url(${currentSong.cover || ''})`,
          }}
        ></div>

        <div className="artist-info">
          <h2 className="artist-name">{currentSong.artist.name}</h2>
          <h3 className="artist-song-name">{currentSong.artist.song}</h3>
        </div>

        <div
          className="player-progress-container"
          onClick={e => this.setProgress(e)}
        >
          <span
            className="player-progress-value"
            style={{ width: progress + '%' }}
          ></span>
        </div>

        <div className="player-options">
          <div className="player-buttons player-controls">
            <button
              onClick={this.toggle}
              className="player-btn big"
              title="Play/Pause"
            >
              <i className={playPauseClass}></i>
            </button>
            <button
              onClick={this.previous}
              className="player-btn medium"
              title="Previous Song"
            >
              <i className="fa fa-backward"></i>
            </button>
            <button
              onClick={this.next}
              className="player-btn medium"
              title="Next Song"
            >
              <i className="fa fa-forward"></i>
            </button>
          </div>

          <div className="player-buttons">
            <button
              className="player-btn small volume"
              onClick={this.toggleMute}
              title="Mute/Unmute"
            >
              <i className={volumeClass}></i>
            </button>
            <button
              className={repeatClass}
              onClick={this.repeat}
              title="Repeat"
            >
              <i className="fa fa-repeat"></i>
            </button>
            <button
              className={randomClass}
              onClick={this.randomize}
              title="Shuffle"
            >
              <i className="fa fa-random"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  getDecryptedMediaUrl = async (mediaId, userId) => {
    const bytesBuffer = await FetchUtil.fetchBytesOfStaticMedia(mediaId);
    const wrmHeader = ParserUtil.getWRMHeaderFromBuffer(bytesBuffer, 0, ParserUtil.WRMHEADER_BYTES_SIZE);
    const keyId = ParserUtil.getKeyIdFromWRMHeader(wrmHeader);
    const laUrl = ParserUtil.getLaUrlFromWRMHeader(wrmHeader);
    const encryptedContent = ParserUtil.getEncryptedContentFromBuffer(bytesBuffer, ParserUtil.WRMHEADER_BYTES_SIZE, bytesBuffer.length);
    const usageLicense = await FetchUtil.fetchUsageLicense(laUrl, userId, keyId);
    if (usageLicense.data && usageLicense.data.item) {
      this.bindingUsageLicense(usageLicense.data.item);
      this.bindingMediaChorus(usageLicense.data.item);
      const contentKey = usageLicense.data.item.contentKey;
      if (!contentKey) {
        return "";
      }
      // Hash content key
      const sha256HashContentKey = await HashUtil.sha256HashContentKey(contentKey);
      const rawContentBytes = await DecryptUtil.decryptMediaContent(encryptedContent, sha256HashContentKey);
      const mediaBlob = new Blob([rawContentBytes], { type: "audio/mpeg" });
      const blobUrl = window.URL.createObjectURL(mediaBlob);
      return blobUrl;
    }
    else {
      return "";
    }
  }

  bindingUsageLicense = usageLicenseDataItem => {
    const { canPlayVip, canSeek, canSkipAds, listenChorusOnly } = usageLicenseDataItem;
    this.usageLicense = { canPlayVip, canSeek, canSkipAds, listenChorusOnly };
  }

  bindingMediaChorus = usageLicenseDataItem => {
    this.chorus.startChorus = usageLicenseDataItem["startChorus"];
    this.chorus.endChorus = usageLicenseDataItem["endChorus"];
  }
}

export default AudioPlayer;
