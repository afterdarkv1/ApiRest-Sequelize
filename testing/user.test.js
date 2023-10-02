import request from 'supertest';
import { app } from '../src/app.js';

let lastCreatedUserId; 


test('POST /api/users should create a new user', async () => {
  const userData = { 
    username: 'Simon',
    gmail:  'simon23@gmail.com'
};

  const response = await request(app)
    .post('/api/users')
    .send(userData);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id');
  expect(response.body.username).toBe(userData.username);
  expect(response.body.gmail).toBe(userData.gmail);
  
  lastCreatedUserId = response.body.id;
});

test('GET /api/users should return a list of users', async () => {
  const response = await request(app).get('/api/users');
  expect(response.status).toBe(200);

  expect(Array.isArray(response.body)).toBe(true);

  response.body.forEach((user) => {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('gmail');
  });
});


test('GET /api/users/:id should return a user by ID', async () => {
  if (!lastCreatedUserId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }


  const response = await request(app)
    .get(`/api/users/${lastCreatedUserId}`);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id');
  expect(response.body).toHaveProperty('username');
  expect(response.body).toHaveProperty('gmail');
});


test('PUT /api/users/:id should update a user', async () => {
  if (!lastCreatedUserId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  
  const updatedUserData = {
    username: 'Updated user Name',
    gmail: 'Updated Description',
  };

  const response = await request(app)
    .put(`/api/users/${lastCreatedUserId}`)
    .send(updatedUserData);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id', lastCreatedUserId);
  expect(response.body).toHaveProperty('username', updatedUserData.username);
  expect(response.body).toHaveProperty('gmail', updatedUserData.gmail);
});

test('should delete a user', async () => {
  if (!lastCreatedUserId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }


  const response = await request(app)
    .delete(`/api/Users/${lastCreatedUserId}`);

  expect(response.status).toBe(204);
  
});

test('GET /api/users/:id/products should return products by user ID', async () => {
  if (!lastCreatedUserId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  const response = await request(app)
    .get(`/api/users/${lastCreatedUserId}/products`);

  expect(response.status).toBe(200);

  expect(Array.isArray(response.body)).toBe(true);

});
