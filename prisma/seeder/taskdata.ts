import { faker } from "@faker-js/faker";
import { PRIORITY, STATUS } from "@prisma/client";

export const taskdata = [
  {
    title: faker.random.alpha(5),
    description: faker.word.verb(10),
    authorId: 1,
    teamId: 1,
    priority: "LOW",
    status: "NOT_ASSIGNED",
  },
  {
    title: faker.random.alpha(5),
    description: faker.word.verb(10),
    authorId: 1,
    teamId: 1,
    priority: PRIORITY.LOW,
    status: STATUS.NOT_ASSIGNED,
  },
  {
    title: faker.random.alpha(5),
    description: faker.word.verb(10),
    authorId: 1,
    teamId: 1,
    priority: "LOW",
    status: "NOT_ASSIGNED",
  },
  {
    title: faker.random.alpha(5),
    description: faker.word.verb(10),
    authorId: 2,
    teamId: 2,
    priority: "LOW",
    status: "NOT_ASSIGNED",
  },
  {
    title: faker.random.alpha(5),
    description: faker.word.verb(10),
    authorId: 2,
    teamId: 2,
    priority: "LOW",
    status: "NOT_ASSIGNED",
  },
  {
    title: faker.random.alpha(5),
    description: faker.word.verb(10),
    authorId: 1,
    teamId: 2,
    priority: "LOW",
    status: "NOT_ASSIGNED",
  },
  {
    title: faker.random.alpha(5),
    description: faker.word.verb(10),
    authorId: 1,
    teamId: 2,
    priority: "LOW",
    status: "NOT_ASSIGNED",
  },
];
