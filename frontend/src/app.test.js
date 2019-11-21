import React from 'react';
import renderer, { act } from 'react-test-renderer';
import wait from 'waait';
import App from './app';
import { fetchUserData as mockFetchUserData, postUserData as mockPostUserData } from './helpers/requests/users';


jest.mock('./helpers/requests/users', () => ({
  fetchUserData: jest.fn(),
  postUserData: jest.fn(),
}));

const getAddress = () => ({
  country: 'country',
  streetName: 'streetName',
  streetNumber: 'streetNumber',
  city: 'city',
  postalCode: 'postalCode',
  phone: 'phone'
});

const user = {
  id: '1',
  firstName: 'firstName',
  lastName: 'lastName',
  shippingAddress: getAddress(),
  billingAddress: getAddress(),
};

describe('App', () => {
  let rendered;

  describe('When network finishes succesfully', () => {
    beforeEach(async () => {
      mockFetchUserData.mockResolvedValue(user);
      mockPostUserData.mockResolvedValue();
      await act(async () => {
        rendered = renderer.create(<App />);
        await wait(0);
      });
    });

    it('Should render correctly', () => {
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });

  describe('When network finishes with error', () => {
    beforeEach(async () => {
      mockFetchUserData.mockRejectedValue();
      mockPostUserData.mockRejectedValue();
      await act(async () => {
        rendered = renderer.create(<App />);
        await wait(10);
      });
    });

    it('Should render error', () => {
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });

});
