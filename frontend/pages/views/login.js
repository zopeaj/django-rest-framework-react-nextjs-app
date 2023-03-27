import { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { useRouter } from 'next/router'
import { login } from "../../data/user/service/api/UserApi"


const mapStateToProps = state => {
  let errors = [];
  if(state.user.errors) {
    errors = Object.keys(state.user.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.user.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    return {
      login: (username, password) => {
        dispatch(login(username, password));
      }
    }
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.username === '' || this.state.username === null) {
      this.state.usernameError = 'username required'
    }
    if(this.state.password === '' || this.state.password === null) {
      this.state.passwordError = 'password required'
    }
    this.props.login(this.state.username, this.state.password);
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const router = useRouter();

    if(this.props.isAuthenticated) {
      router.push('/views/main/account/user-account');
    }

    // if(this.props.isAuthenticated) {
    //   return <Redirect to="/account" />
    // }

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Login</legend>
           {this.props.errors.length > 0 && (
             <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{ error.message }</li>
              ))}
            </ul>
           )}
          <div>
            <label>Username: </label>
            <input type="text" placehoder="username" onChange={this.onUsernameChange} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placehoder="password" onChange={this.onPasswordChange} />
          </div>
          <button type="submit">Login</button>
        </fieldset>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
