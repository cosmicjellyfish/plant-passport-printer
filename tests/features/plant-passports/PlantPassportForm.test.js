import React from 'react';
import { shallow } from 'enzyme';
import { PlantPassportForm } from '../../../src/features/plant-passports/PlantPassportForm';

describe('plant-passports/PlantPassportForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      plantPassports: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PlantPassportForm {...props} />
    );

    expect(
      renderedComponent.find('.plant-passports-plant-passport-form').length
    ).toBe(1);
  });
});
