import config from '@config/base.config';
import controller from '@controller/categories.controller';
import { getCategoryId, login } from '@utils/helper';

describe('Categories', () => {
  it('GET /categories', async () => {
    const res = await controller.getCategories();
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
  });

  describe('Create Categories', () => {
    let token: string;

    beforeAll(async () => {
      token = await login(config.email, config.password);
    });

    it('POST /categories', async () => {
      const body = { name: 'Vasile Category ' + Math.floor(Math.random() * 10000) };
      const res = await controller.postCategories(body).set('Authorization', 'Bearer ' + token);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(body.name);
    });
  });

  describe('Update Categories', () => {
    let token: string, categoryId: any;

    beforeAll(async () => {
      token = await login(config.email, config.password);
      categoryId = await getCategoryId(token);
    });

    it('PUT /categories/id', async () => {
      const body = { name: 'Vasile Category Updated ' + Math.floor(Math.random() * 10000) };
      const res = await controller.putCategories(categoryId, body).set('Authorization', 'Bearer ' + token);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(body.name);
    });
  });

  describe('Delete Categories', () => {
    let token: string, categoryId: any;
    beforeAll(async () => {
      token = await login(config.email, config.password);
      categoryId = await getCategoryId(token);
    });

    it('DELETE /categories', async () => {
      const res = await controller.deleteCategories(categoryId).set('Authorization', 'Bearer ' + token);

      expect(res.statusCode).toEqual(200);
    });
  });
});
