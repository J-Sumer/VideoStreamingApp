// copied this from StreamCreaate and made some changes


import React from 'react';
import { Field , reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ error , touched }) { // here we are destructoring the meta property
    if( touched && error ){
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    } 
  }

// here first renderInput was not a arrow fucntion.
// it threw an error -- Cannot read property 'renderError' of undefined --
// this is because renderInput fn is not an arrow fn and we are calling another function from here.
// We are expected to bind the function
// therefore it is changed to arrow funciton

// ****************  Mostly use arrow functions ****************


  renderInput = ({ input, label, meta }) => {  // here we are destructuring the formProps
  // renderInput(formProps) {
    return (
      <div className="field">
        <label>{label}: </label>
        <input {...input} // since we destructured the formProps we dont need to give ...formProps.input
        // <input {...formProps.input}
        // onChange={formProps.input.onChange} 
        // value={formProps.input.value} 
        />
        {this.renderError(meta)}
      </div>   
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }
  render(){
    return( // herre this.props.handleSubmit is provided by reactForm.  We have to pass our call back function to this property
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
        <Field label="Enter Title" name="title" component={this.renderInput} />
        <Field label="Enter Description" name="description" component={this.renderInput} />
        <button className="ui button" >Submit</button>
      </form>
      
    )
  }
}

const validate = (formValues) => {
  const errors = {};
  if(!formValues.title){
    errors.title = 'You must enter a title';
  }
  if(!formValues.description){
    errors.description = 'You must enter a description'
  }
  return errors
}



export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
