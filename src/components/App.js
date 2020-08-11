import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import ThemeButton from './ThemeButton/ThemeButton';
import Wrapper from './Wrapper/Wrapper';
import SectionMainTitle from './Section/SectionMainTitle';
import operations from '../redux/actions/operations';

import fadePhonebookStyle from './Section/FadeTitlePhonebook.module.css';

class App extends Component {
  componentDidMount() {
    this.props.onFetchNamesToProps();
    this.props.onFetchThemeToProps();
  }

  render() {
    const {contacts} = this.props;
    const {theme} = this.props;
    const visibleFilter = contacts.items.length >= 1;
    const visibleList = contacts.items.length > 0;
    return (
      <Wrapper>
        <ThemeButton />
        <Section>
          <CSSTransition
            classNames={fadePhonebookStyle}
            in={true}
            appear={true}
            timeout={500}
            unmountOnExit
          >
            <SectionMainTitle theme={theme.themeColor} title="Phonebook" />
          </CSSTransition>
          <ContactForm />
          {visibleFilter && <Filter />}
        </Section>
        {visibleList && (
          <Section>
            <SectionMainTitle theme={theme.themeColor} title="Contacts" />
            <ContactList />
          </Section>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = {
  onFetchNamesToProps: operations.fetchNames,
  onFetchThemeToProps: operations.fetchTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
