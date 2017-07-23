import React from 'react';
import { Field, reduxForm } from 'redux-form';
//Field is a react component
//reduxForm is similar to connect function, allow our component to talk
//directly with redux store we wired in
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends React.Component {

  renderField(field) {
    //this field obj contains info needed for JSX
    //ties this instance to its specific Field component
    //field.input obj contains things like onChange, onFocus, onBlur
    const { touched, error } = field.meta;
    const className=`form-group ${touched && error ? 'has-danger' : ''}`
    return (

      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          { ...field.input }
        />
        <div className='text-help'>
          { touched &&
            error
          }
        </div>
      </div>
    )
    //meta is added automatically by our validate function
  }

  onSubmit(values) {
    this.props.createPost(values)
  }

  render() {
    //when r-f is used as connect on the bottom, it adds many additional props
    //including handleSubmit
    //handleSubmit take care of redux side things,
    //the callback we pass in, once r-f validate the form, will be called
    //and the values from the form will be passed in
    //.bind(this) is to make sure this is the right scope
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name='title'
          component={this.renderField}
        />
        <Field
          label="Categories"
          name='categories'
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

const validate = (values) => {
  //values represents all values entered by the user as an obj, with key = name attribute of input
  const errors = {};
  //validate inputs from values
  //the key after errors needs to match name prop of input field,
  //so this function can communicate with form fields
  if( !values.title) {
    errors.title="Enter a title!";
  }
  if( !values.categories) {
    errors.categories="Enter a category!";
  }
  if( !values.content) {
    errors.content="Enter some content!";
  }

  //this communicates with redux form, if empty, r-f assume fine to submit form
  //if error has property, r-f assume form invalid
  return errors;

}

export default reduxForm({
  validate,  //when user try submit, will be called automatically for us
  form: 'PostsNewForm'
})(
    connect(null, { createPost} )(PostsNew)
  );
//form's value here is the name of the form
//unique string, unique is the only requirement
//ensure handling different forms correctly
//unless want it not be isolated and share state with other components
