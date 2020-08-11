import React from 'react';
import {connect} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import contactsSelectors from '../../redux/selectors/contactsSelectors';

import ContactItem from '../ContactItem/ContactItem';

import animation from './Animation.module.css';
import s from './ContactList.module.css';

const ContactList = ({contacts}) => {
  return (
    <TransitionGroup component="ul" className={s.list}>
      {contacts.map(({id}) => {
        return (
          <CSSTransition key={id} timeout={250} classNames={animation}>
            <ContactItem id={id} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getVisibleContacts(state),
});

export default connect(mapStateToProps)(ContactList);
