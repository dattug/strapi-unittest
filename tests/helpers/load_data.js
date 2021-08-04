// user mock data
const mockUserData = {
  username: 'tester',
  email: 'tester@strapi.com',
  provider: 'local',
  password: '1234abc',
  confirmed: true,
  blocked: null,
};

const users = [];

const loadUsers = async () => {
  /** Creates a new user and save it to the database */
  const user1 = await strapi.plugins['users-permissions'].services.user.add({
    ...mockUserData,
  });

  /** Gets the default user role */
  const defaultRole = await strapi.query('role', 'users-permissions').findOne({}, []);

  const role = defaultRole ? defaultRole.id : null;

  /** Creates a new user an push to database */
  const user2 = await strapi.plugins['users-permissions'].services.user.add({
    ...mockUserData,
    username: 'tester2',
    email: 'tester2@strapi.com',
    role,
  });

  users.push(user1);
  users.push(user2);
};

const getUsers = () => users;

module.exports = {
  loadUsers,
  getUsers
}