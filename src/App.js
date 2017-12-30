import React, { Component } from 'react';
import style from './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      videos: []
    }
  }

  componentDidMount() {
    fetch('https://api.twitch.tv/kraken/channels/dreadztv/videos?client_id=wt6vvhrwve79m4b77zgykz7aurtj2p&broadcast_type=archive')
      .then(data => data.json() )
      .then(data => {this.setState({ videos: data.videos })} )
  }

  // "https://static-cdn.jtvnw.net/s3_vods/6a28518d3eed73f2ee6a_dreadztv_27109690096_763025801//thumb/thumb213786509-320x240.jpg"
  getStreamLinkFromPreview(previewLink) {
    const id = previewLink.split('/')[4];
    return `https://vod-secure.twitch.tv/${id}/chunked/index-dvr.m3u8`
  }

  StreamPreview(video) {
    const link = this.getStreamLinkFromPreview(video.preview);
    return (
      <div style={{marginBottom: '25px'}}>
        <a
          href={link}
          className={style.StreamPreview}
          style={
            {
              backgroundImage: `url(${video.preview})`,
              display: `block`,
              height: `180px`,
              width: `320px`,
            }
          } > </a>
        <div>{video.created_at}</div>
      </div>
    )
  }

  render() {
    const {videos} = this.state;
    return(
      <div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>{videos.map(video => this.StreamPreview(video))}</div>
        <video id="video"></video>
      </div>
    )
  }
}

export default App;