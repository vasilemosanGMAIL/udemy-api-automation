import controller from '@controller/upload.controller';

describe('Upload File', () => {
  it('POST /upload/single', async () => {
    const res = await controller.postUploadSingle('data/subzero.jpg');
    expect(res.body.filename).toEqual('subzero.jpg');
  });

  it('POST /upload/multiple', async () => {
    const files = ['data/subzero.jpg', 'data/scorpion.jpg'];
    const res = await controller.postUploadMultiple(files);
    expect(res.body.length).toBe(2);
    expect(res.body[0].filename).toEqual('subzero.jpg');
    expect(res.body[1].filename).toEqual('scorpion.jpg');
  });
});
