import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, fetchUser, loginWithProvider } from '../../actions/firebase_actions';
import {Button} from 'bulma-components';


class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.loginWithProvider = this.loginWithProvider.bind(this);
        this.state = {
            message: '',
        };
    }

    onFormSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;
        this.props.loginUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                browserHistory.push('/store/profile');
            }
        }
    );
    }

    loginWithProvider(provider) {
        this.props.loginWithProvider(provider).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                browserHistory.push('/store/profile');
            }
        });
    }

    render() {
        return (
        <div className="login columns is-gapless">
                <div className="column is-8 is-hidden-mobile hero-banner">
                    <section className="hero is-fullheight is-dark">
                        <div className="hero-body">
                            <div className="container section">
                                <div className="has-text-right">
                                    <h1 className="title is-1">Inloggning</h1> <br/>
                                    <p className="title is-3">Säker User Account Login</p>
                                </div>
                            </div>
                        </div>
                        <div className="hero-footer">
                            <p className="has-text-centered">Image © Glenn Carstens-Peters via unsplash</p>
                        </div>
                    </section>
                </div>
                <div className="column is-4">
                <div className="box">
                    <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
                    <p>
                        {this.state.message}
                    </p>
                    <h1 className="title">Inloggning</h1>
                    <h2 className="subtitle">Logga in med ett klick</h2>
                    
                    <div className="field is-grouped">
                    <a className="button is-large" href="#" onClick={() => {
                          this.loginWithProvider('facebook');
                      }} data-provider="facebook">
                        <span className="icon is-large">
                            <i className="fa fa-facebook-official" aria-hidden="true"></i>
                        </span>
                    </a>
                    <a className="button is-large" href="#" onClick={() => {
                          this.loginWithProvider('google');
                      }} data-provider="twitter">
                        <span className="icon is-large">
                            <i className="fa fa-google-plus-official" aria-hidden="true"></i>
                        </span>
                    </a>
                    <a className="button is-large" href="#" onClick={() => {
                          this.loginWithProvider('twitter');
                      }} data-provider="twitter">
                        <span className="icon is-large">
                            <i className="fa fa fa-twitter" aria-hidden="true"></i>
                        </span>
                    </a>
                    <a className="button is-large">
                        <span className="icon is-large">
                            <i className="fa fa fa-github" aria-hidden="true"></i>
                        </span>
                    </a>
                    </div>
                    <h2 className="subtitle">...eller använd</h2>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input type="email" className="input" id="txtEmail" ref="email" placeholder="Ange email" name="email"/>
                            <span className="icon is-small is-left">
                            <i className="fa fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                            <i className="fa fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left"><input
                            type="password" className="input" id="txtPass" ref="password" placeholder="Ange ett lösenord"
                            name="password"
                            />
                        <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                        </span>
                        </p>
                    </div>
                    <Button type="submit" className="button is-primary">Logga in</Button>
                    <br />
                    <h5><Link to="/reset">Glömt lösenord?</Link></h5>
                </form>
                </div>
            </div>
</div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginUser,
        fetchUser,
        loginWithProvider,
    }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
