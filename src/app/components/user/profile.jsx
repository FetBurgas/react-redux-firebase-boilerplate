import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../../utils/firebase';
import { Button, Tabs, Icon, SelectField } from 'bulma-components';
import { fetchUser, updateUser } from '../../actions/firebase_actions';
import Loading from '../helpers/loading';
import ChangePassword from './change_password';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.props.fetchUser();
        this.state = {
            message: '',
            isLoading: false
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.setState({
            isLoading: true
        });
        const email = this.refs.email.value;
        const displayName = this.refs.displayName.value;
        this.props.updateUser({ email, displayName }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ 
                    message: data.payload.errorMessage,
                    isLoading: false
                });
            } else {
                this.setState({
                    message: 'Sparat!',
                    isLoading: false
                });
            }
        }
    );
    }

    render() {
        if (!this.props.currentUser) {
            return <Loading />;
        }
        let isLoading = this.state.isLoading ? 'is-loading': '';
        let isMessage = this.state.message != 'is-hidden' ? '': '';

        return (
            <div className="profile">
                <div className={`notification is-warning ${isMessage}`}>
                    <button className="delete"></button>
                    <h5> {this.state.message} </h5>
                </div>
                <div className="columns is-mobile is-centered">
                    <div className="column is-half is-narrow">
                        <section className="section">
                            <div className="box">
                                <div className="container">
                                    <form id="frmProfile" role="form" onSubmit={this.onFormSubmit}>
                                        <h2 className="subtitle">Mina uppgifter</h2>
                                        <br />
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input type="text" defaultValue={this.props.currentUser.email} className="input" id="email" ref="email" placeholder="Email" name="email"/>
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-envelope"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fa fa-check"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input type="text" defaultValue={this.props.currentUser.displayName} className="input" ref="displayName" id="displayName" placeholder="Visningsnamn" name="displayName"/>
                                            </p>
                                        </div>
                                        <Button type="submit" icon='save' className={`is-primary is-medium ${isLoading}`}>Spara</Button>
                                    </form>
                                </div>
                            </div>
                        </section>
                        <section className="section">
                            <div className="box">
                                <div className="container">
                                    <ChangePassword />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, updateUser }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
