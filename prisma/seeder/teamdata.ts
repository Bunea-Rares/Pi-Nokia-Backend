import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import prisma from "../../src/db";
export const teamData = [
  {
    name: faker.word.adjective(),
    owner: "1" as Prisma.UserCreateNestedOneWithoutUserToTeamInput,
    code: faker.random.alpha(5),
  },
  {
    name: faker.word.adjective(),
    owner: "2" as Prisma.UserCreateNestedOneWithoutUserToTeamInput,
    code: faker.random.alpha(5),
  },
  {
    name: faker.word.adjective(),
    owner: "2" as Prisma.UserCreateNestedOneWithoutUserToTeamInput,
    code: faker.random.alpha(5),
  },
  {
    name: faker.word.adjective(),
    owner: "1" as Prisma.UserCreateNestedOneWithoutUserToTeamInput,
    code: faker.random.alpha(5),
  },
];
