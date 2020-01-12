import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import PlantPassportForm from './PlantPassportForm'

export class DefaultPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="plant-passports-default-page">
        <header className="app-header">
          <h1 className="app-title">Welcome to the Plant Passport issuing office!</h1>
          <h6>Please repot any unattended saplings</h6>
          <div class="introduction">
          <p>
          This is a simple website to generate a
          <a href="https://www.gov.uk/guidance/issuing-plant-passports-to-trade-plants-in-the-eu"
          > plant passport </a> which you can download and print off on a domestic printer.
          </p>
          <ul>
          <li>
          Only the latest version of <a href="https://www.google.com/chrome/">Google Chrome </a>
          is supported, if it ever works properly on Internet Explorer, it will be by god's own
          intervention.
          </li>
          <li>
          Please check your plant passport very carefully for errors before using them.
          </li>
          <li>Contact: <a href="mailto: plantpassports@cosmicjellyfish.io">plant.passport@cosmicjellyfish.io</a></li>
          </ul>
          </div>
        </header>
        <div className="app-intro">
        <PlantPassportForm/>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
