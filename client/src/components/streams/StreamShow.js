import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component {
  constructor(props){
    super(props);

    this.videoRef = React.createRef();
    // this is to create a refference to the DOM
    // can be used simillar to document.getElementById()
  }

//   <script src="https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"></script>
// <video id="videoElement"></video>
// <script>
//     if (flvjs.isSupported()) {
//         var videoElement = document.getElementById('videoElement');
//         var flvPlayer = flvjs.createPlayer({
//             type: 'flv',
//             url: 'http://localhost:8000/live/STREAM_NAME.flv'
//         });
//         flvPlayer.attachMediaElement(videoElement);
//         flvPlayer.load();
//         flvPlayer.play();
//     }
// </script>

// the above code is used for normal html and js pages
// we converted that to our react requirement

// here we are creatting a flvjs file and assigning to flvPlayer
// and attaching that to the document (const  obtained from document.getElementById())

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);    
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  } 

  componentWillUnmount() {
    this.player.destroy();

    // this will make sure that when compnent is unmounted then streamiing will stop
  }

  buildPlayer() {
    if(this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current)
    // this.videoRef.current is equal to the const obtained from document.getElementById()
    this.player.load();
  }

  render(){
    if(!this.props.stream){
      return <div>Loading...</div>
    }

    const { title , description } = this.props.stream

    return(
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h1>{description}</h1>
      </div>
    )
  }

  // here when page loads for first time <div>Loading...</div> will be mounted
  // therefor ref={this.videoRef} will not be initialized.  So this.videoRef.current will be "null"
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id]}
} 

export default connect(mapStateToProps , { fetchStream })(StreamShow)


// testing git commit