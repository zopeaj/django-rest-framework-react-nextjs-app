import { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { useRouter } from 'next/router'
import { register } from "../../data/user/service/api/UserApi"

const mapStateToProps = state => {
  let errors = [];
  if (state.user.errors) {
    errors = Object.keys(state.user.errors).map(field => {
      return { field, message: state.user.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (data) => dispatch(register(data)),
  }
}

class Register extends Component {

  onSubmit = e => {
    e.preventDefault();


    this.props.register(
       this.state.username,
       this.state.password,
       this.state.email,
       this.state.first_name,
       this.state.last_name
    )
  }

  render() {
    const router = useRouter();

    if(this.props.isAuthenticated) {
      router.push('/views/main/account/user-account');
    }

    return (
      <Fragment>
        <div>
          <form onSubmit={this.onSubmit}>
            <fieldset>
              <legend>Register::</legend>
              {this.props.errors.length > 0 && (
                <ul>
                  {this.props.errors.map(error => (
                    <li key={error.field}>
                      {error.message}
                    </li>
                  ))}
                </ul>
              )}
              <div>
                <label>Username: </label>
                <input type="text" placeholder="username" onChange={this.onUsernameChange} />
              </div>
              <div>
                <label>Email: </label>
                <input type="email" placeholder="email" onChange={this.onEmailChange}/>
              </div>
              <div>
                <label>First Name: </label>
                <input type="text" placeholder="First name" onChange={this.onFirstNameChange} />
              </div>
              <div>
                <label>Last Name: </label>
                <input type="text" placeholder="Last name" onChange={this.onLastNameChange} />
              </div>
              <div>
                <label>Password: </label>
                <input type="password" placeholder="password" onChange={this.onPasswordChange} />
              </div>
              <div>
                <label>Confirm Password: </label>
                <input type="password" placeholder="confirm password" onChange={this.onConfirmPasswordChange} />
              </div>
            </fieldset>
          </form>
        </div>
      </Fragment>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)
