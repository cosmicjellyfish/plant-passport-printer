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
          <h6>Please repot any unattented saplings</h6>
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
