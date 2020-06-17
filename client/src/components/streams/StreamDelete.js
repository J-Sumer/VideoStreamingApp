import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  
// instead of <React.Fragment> we can simply use <> and </>
// but some code checkers will think that it is not a valid syntax
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }


  renderActions() {
    const { id } = this.props.match.params;
    // we are destructuring here
    // const id = this.props.match.params.id;
    
    return (
      <React.Fragment>
        <button onClick={()=> {this.props.deleteStream(id)}} className="ui button negative">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    )
  }

  renderContent() {
    if(!this.props.stream){
      return 'Are you sure you want to delete this stream?'
    }
    return `Are you sure you want to delte the stream: ${this.props.stream.title}`
  }
  render(){
// Here we have used React.Fragemnt
// It is used instead of div.  At some placed we should to use <div> tags
// But in react we cannot return multiple components with out wrapping up in <div>
// therefore we use React.Fragment.  It is like <div> tag but will not have <div> tag in the DOM
    return(
        <Modal
          title="Delete Stream" 
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
    )
  }  
}
const mapStateToProps = (state, ownProps) => {
  return{ stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)


// we dont need a <div> aroung <Modal>. Since it is already a react component
