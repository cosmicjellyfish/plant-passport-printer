import React from 'react';
import { shallow } from 'enzyme';
import { PlantForm } from '../../../src/features/plant-passports/PlantForm';

describe('plant-passports/PlantForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PlantForm {...props} />
    );

    expect(
      renderedComponent.find('.plant-passports-plant-form').length
    ).toBe(1);
  });
});
