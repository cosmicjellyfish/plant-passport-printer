import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/plant-passports/DefaultPage';

describe('plant-passports/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(<DefaultPage {...props} />);

    expect(renderedComponent.find('.plant-passports-default-page').length).toBe(1);
  });
});
