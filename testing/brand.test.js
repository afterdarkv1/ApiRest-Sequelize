import request from 'supertest';
import { app } from '../src/app.js';

let lastCreatedBrandId; 

test('GET /api/brands should return a list of brands', async () => {
  const response = await request(app).get('/api/brands');
  expect(response.status).toBe(200);

  expect(Array.isArray(response.body)).toBe(true);

  response.body.forEach((brand) => {
    expect(brand).toHaveProperty('id');
    expect(brand).toHaveProperty('name');
  });
});

test('POST /api/brands should create a new brand', async () => {
  const brandData = { name: 'New Brand' };

  const response = await request(app)
    .post('/api/brands')
    .send(brandData);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id');
  expect(response.body.name).toBe(brandData.name);

  lastCreatedBrandId = response.body.id;
});

test('GET /api/brands/:id should return a brand by ID', async () => {

  if (!lastCreatedBrandId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  const response = await request(app)
    .get(`/api/brands/${lastCreatedBrandId}`);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id');
  expect(response.body).toHaveProperty('name');
});

test('PUT /api/brands/:id should update a brand', async () => {

  if (!lastCreatedBrandId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  const updatedBrandData = {
    name: 'Updated Brand Name',
    description: 'Updated Description',
  };

  const response = await request(app)
    .put(`/api/brands/${lastCreatedBrandId}`)
    .send(updatedBrandData);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id', lastCreatedBrandId);
  expect(response.body).toHaveProperty('name', updatedBrandData.name);
});


test('GET /api/brands/:id/products should return products by brand ID', async () => {
  if (!lastCreatedBrandId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }
  const response = await request(app)
    .get(`/api/brands/${lastCreatedBrandId}/products`);

  expect(response.status).toBe(200);

  expect(Array.isArray(response.body)).toBe(true);

});

test('should delete a brand', async () => {
  if (!lastCreatedBrandId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  const response = await request(app)
    .delete(`/api/brands/${lastCreatedBrandId}`);

  expect(response.status).toBe(204);
  
});
