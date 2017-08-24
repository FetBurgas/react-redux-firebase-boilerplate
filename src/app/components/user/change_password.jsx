import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../actions/firebase_actions';
import {Button} from 'bulma-components';

class ChangePassword extends Component {

  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.state = {
        message: '',
    };
  }

  onFormSubmit(event) {
      event.preventDefault();
      let password = this.refs.password.value;
      let repeatPassword = this.refs.repeatPassword.value;
      if (password !== repeatPassword) {
        this.setState({
          message: 'Lösenorden måste vara lika!',
      });
    } else {
        this.props.changePassword(password).then((data) => {
          if (data.payload.errorCode)
            this.setState({ message: data.payload.errorMessage });
          else
          this.setState({ message: 'Lösenordet är ändrat!' });
      });
    }
  }

    render() {
      return (
      <form id="ChangePassword" role="form" onSubmit={this.onFormSubmit}>
        <h5> {this.state.message} </h5>
        <h2 className="subtitle"> Byt lösenord </h2>
        <div className="field">
          <p className="control has-icons-left">
          <input type="password" className="input" id="password" ref="password" placeholder="Nytt lösenord"
                name="password"/>
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
          <input type="password" className="input" id="repeatPassword" ref="repeatPassword" placeholder="Repetera lösenord"
                name="repeatPassword"/>
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <Button type="submit" icon='save' className='is-primary is-medium'>Byt lösenord</Button>
      </form>
    );
  }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changePassword }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
