import React, {Component} from 'react';
import {connect} from 'react-redux';
import operations from '../../redux/actions/operations';
import {CSSTransition} from 'react-transition-group';

import InputMask from 'react-input-mask';
import AlertSameName from './AlertSameName';

import s from './ContactForm.module.css';
import fadeStyle from './Fade.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
  alert: false,
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleSubmit = e => {
    e.preventDefault();
    const {name} = this.state;
    const {items} = this.props.contacts;
    const {onAddName} = this.props;
    const isSameName = items.find(
      item => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (!isSameName) {
      onAddName(this.state);
      this.setState({
        ...INITIAL_STATE,
      });
    } else {
      this.setState(
        {
          ...INITIAL_STATE,
          alert: true,
        },
        () => setTimeout(this.handleAlertOfSameName, 2000),
      );
    }
  };

  handleChange = ({target}) => {
    const {name, value} = target;
    this.setState({
      [name]: value,
    });
  };

  handleAlertOfSameName = () => {
    this.setState({
      alert: false,
    });
  };

  render() {
    const {themeColor} = this.props.theme;
    const {name, number, alert} = this.state;
    return (
      <>
        <CSSTransition
          in={alert}
          classNames={fadeStyle}
          timeout={250}
          unmountOnExit
        >
          <AlertSameName name={name} />
        </CSSTransition>
        <form className={s[`form${themeColor}`]} onSubmit={this.handleSubmit}>
          <label className={s[`label${themeColor}`]}>
            Name
            <input
              className={s.input}
              type="text"
              value={name}
              name="name"
              onChange={this.handleChange}
            />
          </label>
          <label className={s[`label${themeColor}`]}>
            Number
            <InputMask
              className={s.input}
              mask="999-99-99"
              maskChar=" "
              value={number}
              name="number"
              onChange={this.handleChange}
            />
          </label>
          <button className={s[`btnForm${themeColor}`]} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  onAddName: operations.addName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
