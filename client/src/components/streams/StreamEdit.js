import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm  from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id , formValues)
  }

  render(){
    if(!this.props.stream){
      return <div>Loading...</div>
    }
    // console.log(this.props)  //--->  here props are sent from react-router-dom .  It will have details of the :id --> id value ( params value )
    // "initialValues" is keyword in redux-form.  We cannot change this value( we cannot change it to initValue etc.,), an object should be passed to this. 
    return(
      <div>
        <h3>Edit a stream</h3>
        <StreamForm 
        initialValues={_.pick(this.props.stream, 'title' , 'description')} 
        onSubmit={this.onSubmit}/>        
      </div>
    )
  }  
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit)




// When directly /streams/edit/3 is loaded then props will 
// not have "stream" as undefined
// this is because we are fetching data from state.steams
// and when we directly hit that route then state will not 
// have streams defined. we have that only when all streams 
// are loaded first.

// therefore we used componentDidMount() function and we get the details of the steam and load it to state.
// therefore next time when rerendered state will have that property.

// ------******  With React-Router, each component needs to be designed to work in isolation (fetch its own data!)   ***********-----------