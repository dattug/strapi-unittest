const request = require('supertest');
const { getUsers } = require('./../helpers/load_data');

let users = [];
// user mock data
const mockUserData = {
  username: 'tester',
  email: 'tester@strapi.com',
  provider: 'local',
  password: '1234abc',
  confirmed: true,
  blocked: null,
};

beforeAll(done => {
  users = getUsers();
  done();
});

it('should login user and return jwt token', async () => {
  await request(strapi.server)
    .post('/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: users[0].email,
      password: mockUserData.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body.jwt).toBeDefined();
    });
});

it('should return users data for authenticated user', async () => {
  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
    id: users[1].id,
  });

  await request(strapi.server)
    .get('/users/me')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + jwt)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(users[1].id);
      expect(data.body.username).toBe(users[1].username);
      expect(data.body.email).toBe(users[1].email);
    });
});
