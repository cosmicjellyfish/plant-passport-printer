import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class PlantForm extends Component {
  static propTypes = {
    PlantPrinter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="plant-passport-form">
        <form className="plant-passport">
          Part A
          <div className="form-section part-a">
            <label for="botanical-name">
              Botanical name:
            </label>
            <input
              id="botanical-name" 
              name="botanical-name"
              type="text"
              data-lpignore="true"
              required
            />
            <label>Genus:</label>
            <input
              type="text"
              name="genus"
              data-lpignore="true"  
            />
            <label>Species:</label>
              <input
                type="text"
                name="species"
                data-lpignore="true"
              />
          </div>
          <div className="form-section part-b"></div>
          <div className="form-section part-c"></div>
          <div className="form-section part-d"></div>
        </form>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    PlantPrinter: state.PlantPrinter,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlantForm);
