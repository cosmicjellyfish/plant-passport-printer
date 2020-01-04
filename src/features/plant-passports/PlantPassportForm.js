import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Document, Page, Text, Image, View, StyleSheet, Font } from '@react-pdf/renderer';
import euFlagBlack from './images/eu-flag-black.png';
import euFlagWhite from './images/eu-flag-white.png';
import { PDFViewer } from '@react-pdf/renderer';

const PART_A = 'partA';
const PART_B = 'partB';
const PART_C = 'partC';
const PART_D = 'partD';
const PROTECTED_ZONE = 'protectedZone';
const META = 'meta';

const DEFAULT_PLANT_PASSPORT_TITLE = 'Plant Passport';
const DEFAULT_PZ_PLANT_PASSPORT_TITLE = 'Plant Passport – PZ';

const metaShape = {
  plantPassportTitle: PropTypes.string.isRequired,
};
const partAShape = {
  geniusName: PropTypes.string.isRequired,
  speciesName: PropTypes.string,
  varietyName: PropTypes.string,
};

const partBShape = {
  operatorCountryCode: PropTypes.string.isRequired,
  nationalRegistrationNumber: PropTypes.string.isRequired,
};

const partCShape = {
  traceabilityCode: PropTypes.string.isRequired,
};

const partDShape = {
  countryOfOrigin: PropTypes.string.isRequired,
};

const protectedZoneShape = {
  PZCode: PropTypes.string,
  scientificName: PropTypes.string,
  EPPOCode: PropTypes.string,
};

const passportDataShape = {
  [META]: PropTypes.shape(metaShape),
  [PART_A]: PropTypes.shape(partAShape),
  [PART_B]: PropTypes.shape(partBShape),
  [PART_C]: PropTypes.shape(partCShape),
  [PART_D]: PropTypes.shape(partDShape),
  [PROTECTED_ZONE]: PropTypes.shape(protectedZoneShape),
};

Font.register({
  family: 'Roboto',
  fontStyle: 'normal',
  fonts: [
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
  ],
});

class PassportDocument extends Component {
  static propTypes = passportDataShape;

  static styles = StyleSheet.create({
    heading: {
      flex: 1,
      flexDirection: 'row',
    },
    headingText: {
      flexDirection: 'column',
      marginLeft: '15px',
    },
    headingTitle: {
      fontSize: '16pt',
      marginTop: '5px',
      maxWidth: '200px',
    },
    protectedZone: {
      paddingLeft: '0px',
      marginLeft: '0px',
      fontSize: '16pt',
    },
    flag: {
      height: 80,
      borderStyle: 'solid',
      borderRightWidth: '1',
      borderBottomWidth: '1',
      borderTopWidth: '0',
      borderLeftWidth: '0',
      borderColor: 'black',
      marginBottom: '5px',
    },
    pzItem: {},
    part: {
      marginLeft: '20px',
      marginBottom: '5px',
    },
    partLetter: {
      fontFamily: 'Roboto',
      fontWeight: 700,
    },
    container: {
      fontSize: '20',
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'black',
      margin: '30px',
      paddingRight: '20px',
      paddingBottom: '5px',
    },
    wrapper: {
      flexDirection: 'row',
    },
  });
  constructor(props) {
    super(props);
    this.renderBotanicalName = this.renderBotanicalName.bind(this);
  }

  renderBotanicalName() {
    const name = `${this.props[PART_A].genusName} ${this.props[PART_A].speciesName}`;
    const varietyName = this.props[PART_A].varietyName;
    if (!!varietyName) {
      return name + ` (${varietyName})`;
    }
    return name;
  }

  renderIssuerDetails() {
    const cc = this.props[PART_B].operatorCountryCode;
    const nrn = this.props[PART_B].nationalRegistrationNumber;
    if (!nrn && !cc) {
      return '';
    }
    return `${cc} - ${nrn}`;
  }

  renderProtectedZone() {
    const { includePZ, PZCode, scientificName, EPPOCode } = { ...this.props[PROTECTED_ZONE] };

    if (!includePZ) {
      return;
    }
    return (
      <View style={PassportDocument.styles.protectedZone}>
        <Text style={PassportDocument.styles.pzItem}>{PZCode}</Text>
        <Text style={PassportDocument.styles.pzItem}>{scientificName}</Text>
        <Text style={PassportDocument.styles.pzItem}>{EPPOCode}</Text>
      </View>
    );
  }

  renderFlag() {
    var flag = euFlagBlack;
    if (this.props[META].flagColor === 'white') {
      flag = euFlagWhite;
    }
    return <Image src={flag} alt="eu flag" style={PassportDocument.styles.flag} />;
  }

  render() {
    return (
      <PDFViewer width="600" height="600">
        <Document>
          <Page size={this.props[META].pageSize} orientation={this.props[META].pageOrientation}>
            <View style={PassportDocument.styles.wrapper}>
              <View style={PassportDocument.styles.container}>
                <View style={PassportDocument.styles.heading}>
                  {this.renderFlag()}
                  <View style={PassportDocument.styles.headingText}>
                    <Text style={PassportDocument.styles.headingTitle}>
                      {this.props[META].plantPassportTitle}
                    </Text>
                    {this.renderProtectedZone()}
                  </View>
                </View>
                <Text style={PassportDocument.styles.part}>
                  <Text style={PassportDocument.styles.partLetter}>A:&nbsp;&nbsp;</Text>
                  {this.renderBotanicalName()}
                </Text>
                <Text style={PassportDocument.styles.part}>
                  <Text style={PassportDocument.styles.partLetter}>B:&nbsp;&nbsp;</Text>
                  {this.renderIssuerDetails()}
                </Text>
                <Text style={PassportDocument.styles.part}>
                  <Text style={PassportDocument.styles.partLetter}>C:&nbsp;&nbsp;</Text>
                  {this.props[PART_C].traceabilityCode}
                </Text>
                <Text style={PassportDocument.styles.part}>
                  <Text style={PassportDocument.styles.partLetter}>D:&nbsp;&nbsp;</Text>
                  {this.props[PART_D].countryOfOrigin}
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
}

export class PlantPassportForm extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      [META]: {
        flagColor: 'black',
        plantPassportTitle: DEFAULT_PLANT_PASSPORT_TITLE,
        pageSize: 'A4',
        pageOrientation: 'portrait',
      },
      [PART_A]: {
        genusName: '',
        speciesName: '',
        varietyName: '',
      },
      [PART_B]: {
        nationalRegistrationNumber: '',
        operatorCountryCode: '',
      },
      [PART_C]: {
        traceabilityCode: '',
      },
      [PART_D]: {
        countryOfOrigin: '',
      },
      [PROTECTED_ZONE]: {
        includePZ: false,
        PZCode: '',
        scientificName: '',
        EPPOCode: '',
      },
    };

    this.getHandleChange = this.getHandleChange.bind(this);
    this.inputElement = this.inputElement.bind(this);
    this.togglePZTitle = this.togglePZTitle.bind(this);
  }

  getHandleChange(part) {
    return event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const newPart = { ...this.state[part], [target.name]: value };
      const newState = { ...this.state, [part]: newPart };
      console.log('Updating ' + target.name + 'to ' + value);
      console.log('Old state ->', this.state);
      this.setState(newState, () => console.log('new state ->', this.state));
    };
  }

  inputElement(part, id, name, label, extra = {}) {
    const _type = extra['type'] || 'text';
    const onChange = extra['onChange'] || this.getHandleChange(part);
    const callbackFunction = extra['callback']
      ? e => {
          onChange(e);
          extra['callback'](e);
        }
      : onChange;

    const acceptedInputProps = ['maxLength', 'style'];
    const inputProps = {};
    for (var i = 0; i < acceptedInputProps.length; i++) {
      var p = acceptedInputProps[i];
      inputProps[p] = extra[p];
    }
    return (
      <div class="input-row">
        <label htmlFor={id}>{label}:</label>
        <input
          id={id}
          name={name}
          data-lpignore="true"
          type={_type}
          value={this.state[part][name]}
          onChange={callbackFunction}
          {...inputProps}
        />
      </div>
    );
  }

  togglePZTitle(e) {
    var newTitle;
    const oldTitle = this.state[META].plantPassportTitle;
    if (oldTitle !== DEFAULT_PLANT_PASSPORT_TITLE && oldTitle !== DEFAULT_PZ_PLANT_PASSPORT_TITLE) {
      return;
    }
    if (e.target.checked) {
      if (oldTitle === DEFAULT_PLANT_PASSPORT_TITLE) {
        newTitle = DEFAULT_PZ_PLANT_PASSPORT_TITLE;
      }
    } else if (oldTitle === DEFAULT_PZ_PLANT_PASSPORT_TITLE) {
      newTitle = DEFAULT_PLANT_PASSPORT_TITLE;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        [META]: {
          ...prevState[META],
          plantPassportTitle: newTitle,
        },
      };
    });
  }

  renderFlagColorCheckbox() {
    return (
      <div class="input-row flag-color">
        <label class="flag-color" htmlFor="flag-color">
          Flag color
        </label>
        <div class="input-block">
          <div class="nested-input-block">
            <input
              id="flag-color-black"
              type="radio"
              class="flag-color"
              name="flagColor"
              value="black"
              onChange={this.getHandleChange(META)}
              checked={this.state[META].flagColor === 'black'}
            ></input>
            <label class="flag-color" htmlFor="flag-color-black">
              Black
            </label>
            <br />
          </div>
          <div class="nested-input-block">
            <input
              id="flag-color-white"
              type="radio"
              class="flag-color"
              name="flagColor"
              value="white"
              onChange={this.getHandleChange(META)}
              checked={this.state[META].flagColor === 'white'}
            ></input>
            <label htmlFor="flag-color-white">White</label>
            <br />
          </div>
        </div>
      </div>
    );
  }

  renderPageSizeCheckbox() {
    return (
      <div class="input-row page-size">
        <label class="page-size" htmlFor="page-size">
          Page Size
        </label>
        <div class="input-block">
          <div class="nested-input-block">
            <input
              id="page-size-A4"
              type="radio"
              class="page-size"
              name="pageSize"
              value="A4"
              onChange={this.getHandleChange(META)}
              checked={this.state[META].pageSize === 'A4'}
            ></input>
            <label class="page-size" htmlFor="page-size-A4">
              A4
            </label>
            <br />
          </div>
          <div class="nested-input-block">
            <input
              id="page-size-A5"
              type="radio"
              class="page-size"
              name="pageSize"
              value="A5"
              onChange={this.getHandleChange(META)}
              checked={this.state[META].pageSize === 'A5'}
            ></input>
            <label htmlFor="page-size-A5">A5</label>
            <br />
          </div>
          <div class="nested-input-block">
            <input
              id="page-size-A6"
              type="radio"
              class="page-size"
              name="pageSize"
              value="A6"
              onChange={this.getHandleChange(META)}
              checked={this.state[META].pageSize === 'A6'}
            ></input>
            <label htmlFor="page-size-A6">A6</label>
            <br />
          </div>
        </div>
      </div>
    );
  }

  renderPageOrientationCheckbox() {
    return (
      <div class="input-row page-orientation">
        <label class="page-orientation" htmlFor="page-orientation">
          Page orientation
        </label>
        <div class="input-block">
          <div class="nested-input-block">
            <input
              id="page-orientation-portrait"
              type="radio"
              class="page-orientation"
              name="pageOrientation"
              value="portrait"
              onChange={this.getHandleChange(META)}
              checked={this.state[META].pageOrientation === 'portrait'}
            ></input>
            <label class="page-orientation" htmlFor="page-orientation-portrait">
              Portrait
            </label>
            <br />
          </div>
          <div class="nested-input-block">
            <input
              id="page-orientation-landscape"
              type="radio"
              class="page-orientation"
              name="pageOrientation"
              value="landscape"
              onChange={this.getHandleChange(META)}
              checked={this.state[META].pageOrientation === 'landscape'}
            ></input>
            <label htmlFor="page-orientation-landscape">Landscape</label>
            <br />
          </div>
        </div>
      </div>
    );
  }

  renderPassportForm() {
    const pzFlag = { disabled: !this.state[PROTECTED_ZONE].includePZ };
    return (
      <form className="plant-passport-form">
        <fieldset className="form-section meta">
          <legend className="section-title">Passport Information</legend>
          {this.inputElement(
            META,
            'plant-passport-title',
            'plantPassportTitle',
            'Plant Passport Title',
          )}
          {this.renderFlagColorCheckbox()}
          {this.renderPageSizeCheckbox()}
          {this.renderPageOrientationCheckbox()}
        </fieldset>
        <fieldset className="form-section part-a">
          <legend className="section-title">Part A: Botanical Name</legend>
          {this.inputElement(PART_A, 'genus-name', 'genusName', 'Genus Name')}
          {this.inputElement(PART_A, 'species-name', 'speciesName', 'Species Name')}
          {this.inputElement(PART_A, 'variety-name', 'varietyName', 'Variety Name')}
        </fieldset>
        <fieldset className="form-section part-b">
          <legend className="section-title">Part B: Operator details</legend>
          {this.inputElement(
            PART_B,
            'operator-country-code',
            'operatorCountryCode',
            'Operator Country Code',
            {
              maxLength: 2,
              style: { textTransform: 'uppercase' },
              onChange: e => {
                e.target.value = e.target.value.toUpperCase();
                this.getHandleChange(PART_B)(e);
              },
            },
          )}
          {this.inputElement(
            PART_B,
            'national-registration-number',
            'nationalRegistrationNumber',
            'National Registration Number',
          )}
        </fieldset>
        <fieldset className="form-section part-c">
          <legend className="section-title">Part C: Traceability</legend>
          {this.inputElement(PART_C, 'traceability-code', 'traceabilityCode', 'Traceability Code')}
        </fieldset>
        <fieldset className="form-section part-d">
          <legend className="section-title">Part D: Origin</legend>
          {this.inputElement(PART_D, 'country-of-origin', 'countryOfOrigin', 'Country of Origin')}
        </fieldset>
        <fieldset className="form-section protected-zone">
          <legend className="section-title">Protected Zone</legend>
          {this.inputElement(PROTECTED_ZONE, 'include-pz', 'includePZ', 'Protected Zone section', {
            type: 'checkbox',
            callback: this.togglePZTitle,
          })}
          {this.inputElement(PROTECTED_ZONE, 'PZ-code', 'PZCode', 'Protected Zone Code', pzFlag)}
          {this.inputElement(
            PROTECTED_ZONE,
            'scientific-name',
            'scientificName',
            'Scientific Name',
            pzFlag,
          )}
          {this.inputElement(PROTECTED_ZONE, 'EPPO-code', 'EPPOCode', 'EPPO code', pzFlag)}
        </fieldset>
      </form>
    );
  }

  render() {
    return (
      <div className="plant-passport-container">
        <div clasName="form-container">{this.renderPassportForm()}</div>
        <div className="pp-preview">
          <PassportDocument
            meta={this.state[META]}
            partA={this.state[PART_A]}
            partB={this.state[PART_B]}
            partC={this.state[PART_C]}
            partD={this.state[PART_D]}
            protectedZone={this.state[PROTECTED_ZONE]}
          />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    plantPassportForm: state.plantPassportForm,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlantPassportForm);
