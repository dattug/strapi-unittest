const request = require('supertest');
const { grantPrivilege } = require("../helpers/strapi");


beforeAll(async () => {
  await grantPrivilege(2, "permissions.application.controllers.book.find");  // Gives Public access to endpoint
});


it('should return This is my first blog', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .get('/books')
    .expect(200) // Expect response http code 200
    .then(data => {
      expect(data.text).toEqual("[]"); // expect the response text
    });
});