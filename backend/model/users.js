const faker = require("faker");
const loki = require("lokijs");
const _ = require('lodash');

const db = new loki("MSTS");
const users = db.addCollection("users", { indices: ["id"] });

const AMOUNT_OF_USERS_TO_GENERATE = 100;

const generateRandomAddress = () => ({
  country: faker.address.country(),
  streetName: faker.address.streetName(),
  streetNumber: faker.random.number().toString(),
  city: faker.address.city(),
  postalCode: faker.address.zipCode(),
  phone: faker.phone.phoneNumber(),
});

users.insert(
  _.range(AMOUNT_OF_USERS_TO_GENERATE).map(i => ({
    id: i.toString(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    shippingAddress: generateRandomAddress(),
    billingAddress: generateRandomAddress(),
  }),
));

module.exports = {
  getById: id => users.findOne({ id }),
  update: user => {
    const { id } = user;
    users.updateWhere(() => ({ $id: id }), user);
  },
};
