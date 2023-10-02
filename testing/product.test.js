import request from 'supertest';
import { app } from '../src/app.js';

let lastCreatedProductId;

test('GET /api/products should return a list of products', async () => {
  const response = await request(app).get('/api/products');
  expect(response.status).toBe(200);

  expect(Array.isArray(response.body)).toBe(true);

  response.body.forEach((product) => {
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('brandId');
    expect(product).toHaveProperty('userId');
  });
});

test('POST /api/products should create a new product', async () => {
  const productData = { 
    title: 'New Product',
    price: 100,
    description: 'new description',
  };

  const response = await request(app)
    .post('/api/products')
    .send(productData);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id');
  expect(response.body.title).toBe(productData.title);
  expect(response.body.price).toBe(productData.price);
  expect(response.body.description).toBe(productData.description);
  expect(response.body.brandId).toBe(productData.brandId);
  expect(response.body.userId).toBe(productData.userId);


  lastCreatedProductId = response.body.id;
});

test('GET /api/products/:id should return a product by ID', async () => {

  if (!lastCreatedProductId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  const response = await request(app)
    .get(`/api/products/${lastCreatedProductId}`); 

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id');
  expect(response.body).toHaveProperty('title');
  expect(response.body).toHaveProperty('price');
  expect(response.body).toHaveProperty('description');
});

test('PUT /api/products/:id should update a product', async () => {

  if (!lastCreatedProductId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  const updatedProductData = {
    title: 'Updated product title',
    price: 200,
    description: 'updated description',
  };

  const response = await request(app)
    .put(`/api/products/${lastCreatedProductId}`)
    .send(updatedProductData);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id', lastCreatedProductId); 
  expect(response.body).toHaveProperty('title', updatedProductData.title);
  expect(response.body).toHaveProperty('price', updatedProductData.price);
  expect(response.body).toHaveProperty('description', updatedProductData.description);
});

test('should delete the last created product', async () => {

  if (!lastCreatedProductId) {
    throw new Error('No se ha creado ningún producto para este test.');
  }

  const response = await request(app)
    .delete(`/api/products/${lastCreatedProductId}`);

  expect(response.status).toBe(204);
});
