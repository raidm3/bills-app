// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Raphi',
    email: 'didjurgeit.raphael@web.de',
    password: 'poseidoN1!',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Chiara',
    email: 'chiara.rother@web.de',
    password: 'C!nd3r3llA',
  },
];

const bills = [
  {
    user_id: users[0].id,
    title: 'Edeka',
    value: 2193,
    label: 'food',
    date: '2024-07-03',
  },
  {
    user_id: users[1].id,
    title: 'Jadevie',
    value: 4300,
    label: 'dinner',
    date: '2024-07-07',
  },
  {
    user_id: users[0].id,
    title: 'Aldi',
    value: 2972,
    label: 'food',
    date: '2024-07-07',
  },
  {
    user_id: users[1].id,
    title: 'DM',
    value: 981,
    label: 'food',
    date: '2024-07-11',
  },
  {
    user_id: users[0].id,
    title: 'Amazon',
    value: 5599,
    label: 'misc',
    date: '2024-07-17',
  },
  {
    user_id: users[0].id,
    title: 'Kaufland',
    value: 2193,
    label: 'food',
    date: '2024-07-22',
  },
  {
    user_id: users[0].id,
    title: 'Edeka',
    value: 4988,
    label: 'food',
    date: '2024-08-06',
  },
  {
    user_id: users[1].id,
    title: 'Aldi',
    value: 2232,
    label: 'food',
    date: '2024-08-07',
  },
  {
    user_id: users[0].id,
    title: 'Dildoking',
    value: 12332,
    label: 'misc',
    date: '2024-08-10',
  },
  {
    user_id: users[1].id,
    title: 'Aldi',
    value: 3211,
    label: 'food',
    date: '2024-08-11',
  },
  {
    user_id: users[0].id,
    title: 'Pizza',
    value: 2343,
    label: 'dinner',
    date: '2024-08-12',
  },
  {
    user_id: users[0].id,
    title: 'Rewe',
    value: 1321,
    label: 'food',
    date: '2024-08-15',
  },
];

export { users, bills };
