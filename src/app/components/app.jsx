import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, logoutUser } from '../actions/firebase_actions';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tab: 'profile'
        }

        this.props.fetchUser();
        this.logOut = this.logOut.bind(this);
        this.tabChange = this.tabChange.bind(this)
    }
    tabChange (state) {
      this.setState({tab: state.active.label})
    }

    logOut() {
        this.props.logoutUser().then((data) => {
      // reload props from reducer
            this.props.fetchUser();
        });
    }

    renderUserMenu(currentUser) {
    // if current user exists and user id exists than make user navigation
        if (currentUser && currentUser.uid) {
            return (
  <section className="hero is-primary">
  <div className="hero-head">
    <nav className="nav has-shadow" id="top">
    <div className="container">
      <div className="nav-left">
        <a className="nav-item" href="/home">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
        </a>
      </div>
      <span className="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div className="nav-right nav-menu">
        <span className="nav-item">
            <figure className="image is-32x32">
              <Link className="" to="/user/profile"><img src={currentUser.photoURL}/></Link>
            </figure>
        </span>
        <span className="nav-item">
            <Link to="/logout" className="is-active" onClick={this.logOut}>Logga ut</Link>
        </span>
      </div>
    </div>
  </nav>
  </div>
  <div className="hero-body">
    <div className="container has-text-centered">
      <h1 className="title">
        {currentUser.displayName}
      </h1>
      <h2 className="subtitle">
        {currentUser.email}
      </h2>
    </div>
  </div>
</section>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderUserMenu(this.props.currentUser)}
                {this.props.children}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, logoutUser }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
