import supertest from 'supertest';

const request = supertest('https://jsonplaceholder.typicode.com');

//describe represents a test suite, that might contain multiple tests inside
describe('GET requests', () => {
  //it represents a test case
  it('responds with json', async () => {
    const response = await request.get('/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toBe(1);
    // console.log(response.body);
  });

  it('GET /comments with query params', async () => {
    //const response = await request.get('/comments?postId=1');
    const response = await request.get('/comments').query({ postId: 1, limit: 10 });
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toBe(1);
    // console.log(response.body);
  });
});

describe('POST requests', () => {
  it('POST /posts', async () => {
    const data = {
      title: 'My favorite animes',
      body: 'Naruto, One Piece, Death Note',
      userId: 1,
    };

    const response = await request.post('/posts').send(data);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('My favorite animes');
    expect(response.body.body).toBe('Naruto, One Piece, Death Note');
    expect(response.body.userId).toBe(1);
  });

  it('POST /posts invalid payload', async () => {
    const data = {
      title: 'My favorite animes',
      body: 'Naruto, One Piece, Death Note',
      userId: 1,
      invalid: 'invalid',
    };

    const response = await request.post('/posts').send(data);
    console.log(response.body);
    expect(response.statusCode).toBe(!201);
  });
});

describe('PUT requests', () => {
  it('PUT /posts/{id}', async () => {
    const data = {
      id: 1,
      title: 'Updated title',
      body: 'Updated body',
      userId: 5,
    };

    const response = await request.put('/posts/1').send(data);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(data.title);
    expect(response.body.body).toBe(data.body);
  });
});

describe('PATCH requests', () => {
  it('PATCH /posts/{id}', async () => {
    const data = { title: 'Patched title' };

    const response = await request.patch('/posts/1').send(data);
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  });
});

describe('DELETE requests', () => {
  it('DELETE /posts/{id}', async () => {
    const response = await request.delete('/posts/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
    console.log(response.body);
  });
});
