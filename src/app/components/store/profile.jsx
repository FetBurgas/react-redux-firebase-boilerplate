import React, { Component } from 'react';
import {Button} from 'bulma-components';

class StoreProfile extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            message: '',
        };
    }
    
    onFormSubmit(event) {
        event.preventDefault();
        console.log("Yohoo");
    }
    
    render() {
    
    const {myStore, ...props} = this.props;
    
    if (!myStore) {
        return "Loading";
    }

    return (
        <div className="StoreProfile" {...props}>
            <div className="columns is-mobile is-centered">
                <div className="column is-half is-narrow">
                    <section className="section">
                        <div className="container">
                            <div className="box">
                    <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
                    <p>
                        {this.state.message}
                    </p>
                    <h1 className="title">Inloggning</h1>
                    <h2 className="subtitle">Logga in med ett klick</h2>
                    
                    <div className="field">
                        <div className="control">
                            <input className="input" id="title" ref="title" type="text" placeholder="Butiksnamn" defaultValue={this.props.myStore.title} />
                        </div>
                    </div>

                    <Button type="submit" className="button is-primary">Logga in</Button>
                </form>
                </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
  }
}

export default StoreProfile;
