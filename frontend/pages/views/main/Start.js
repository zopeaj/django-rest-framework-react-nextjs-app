import React, { Component, Fragment } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return null;
}

const mapDispatchToProps = dispatch => {
  return null;
}

class Start extends Component {
  render() {
    return (
     <Fragment>
       <AppBar>
         <Toolbar class="app-header-bar">
           Start App
         </Toolbar>
       </AppBar>
       <div>
         <Button routerLink="/views/login" component={Link}>
           Login
         </Button>
         |
         <Button routerLink="/views/register" component={Link}>
           Register
         </Button>
       </div>
     </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)
