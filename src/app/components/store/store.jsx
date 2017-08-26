import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Orders from './orders';
import StoreProfile from './profile';
import { fetchUser, updateUser, getRekos, getUserStore } from '../../actions/firebase_actions';
import firebase from '../../utils/firebase';
import { Button, Tabs, Icon } from 'bulma-components';
import Slider from 'react-slick';

import Loading from '../helpers/loading';

class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            isLoading: true
        };

        this.props.getRekos();
        this.props.fetchUser().then(() => this.props.getUserStore(this.props.currentUser.uid)).
        then(() => this.setState({isLoading: false}))
        
        this.tabs = ['My Store', 'ProduktMallar', 'Produkter', 'Ordrar']

        this._changeHandler = this._changeHandler.bind(this)
        
    }

    onFormSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const displayName = this.refs.displayName.value;
        this.props.updateUser({ email, displayName }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                this.setState({
                    message: 'Sparat!',
                });
            }
        }
    );
    }

    _changeHandler(state) {
        this.refs.slider.slickGoTo(this.tabs.indexOf(state.active));
    }

    render() {
        const {myStore, ...props} = this.props;

        if (!myStore) {
            return <Loading />;
        }
        
        console.log(this.props.myStore.title);
        
        var settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className="profile">
                <div className="hero-foot">
                    <Tabs
                        elements={this.tabs}
                        className='is-medium is-boxed'
                        container
                        callback={this._changeHandler}
                    />
                </div>
                <Slider ref='slider' {...settings}>
                    <StoreProfile myStore={this.props.myStore} />
                    <Orders index={2} />
                    <Orders index={3} />
                    <Orders index={4} />
                </Slider>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, getUserStore, getRekos }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser, rekos: state.rekos, myStore: state.myStore };
}


export default connect(mapStateToProps, mapDispatchToProps)(Store);
