const faker = require('faker');

const database = { users: [], contacts: [] };

for(let i=1; i<=200; i++) {
  database.users.push({
    id: i,
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email()
  });

  database.contacts.push({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
    country: faker.address.country(),
    title: faker.name.title()
  })
}

console.log(JSON.stringify(database));