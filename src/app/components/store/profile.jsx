import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../../utils/firebase';
import { Button, Tabs, Icon } from 'bulma-components';


import { fetchUser, updateUser } from '../../actions/firebase_actions';
import Loading from '../helpers/loading';

class StoreProfile extends Component {

    constructor(props) {
        super(props);
        this.props.fetchUser();
        this.state = {
            message: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
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

    render() {
        if (!this.props.currentUser) {
            return <Loading />;
        }

        return (
            <div className="profile">
            <Tabs
active={shop}
container='true'
  elements={[
    {
      label: 'Shop',
      content: (<a>
        <span>Shop</span>
      </a>)
    },
    {
      label: 'Produkter',
      content: (<a>
        <span>Produkter</span>
      </a>)
    },
    {
      label: 'Orders',
      content: (<a>
        <span>Orders</span>
      </a>)
    }
  ]}
/>
    <div className="columns is-mobile is-centered">
      <div className="column is-half is-narrow">
        <section className="section" id="">
            <div className="container">
            
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


export default connect(mapStateToProps, mapDispatchToProps)(StoreProfile);
