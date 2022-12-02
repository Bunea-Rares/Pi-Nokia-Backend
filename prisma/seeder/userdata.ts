import { faker } from "@faker-js/faker";

export const userData = [
  {
    username: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  },
  {
    username: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  },
  {
    username: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  },
  {
    username: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  },
  {
    username: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  },
];
