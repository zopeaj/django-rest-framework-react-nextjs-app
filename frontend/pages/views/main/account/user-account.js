import { useState, Component, Fragment } from "react";
import styled from "styled-components";
import { logout } from "../../../../data/user/service/api/UserApi";
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    username: state.user.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

class Main extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <h2>Welcome {this.props.username}</h2>
          <hr />
          <div>
            <a onClick={this.props.logout}>
              Logout
            </a>
          </div>
          <div>
            <a href="/views/main/product/product">
              Product
            </a>
          </div>
        </div>
      </Fragment>
    )
  }
}
