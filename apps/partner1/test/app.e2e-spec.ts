import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Partner1Module } from './../src/partner1.module';

describe('Partner1Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [Partner1Module],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/events (POST) should be able create a event', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        name: 'New event',
        description: 'Description of the new event',
        date: '2024-06-25T00:00:00',
        price: 100,
      })
      .expect(201);
  });

  it('/events (POST) should not be able create a event without name', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        description: 'Description of the new event',
        date: '2024-06-25T00:00:00',
        price: 100,
      })
      .expect(422);
  });

  it('/events (POST) should not be able create a event without description', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        name: 'New event',
        date: '2024-06-25T00:00:00',
        price: 100,
      })
      .expect(422);
  });

  it('/events (POST) should not be able create a event without date', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        name: 'New event',
        description: 'Description of the new event',
        price: 100,
      })
      .expect(422);
  });

  it('/events (POST) should not be able create a event with invalid date', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        name: 'New event',
        description: 'Description of the new event',
        date: '25-06-2024',
        price: 100,
      })
      .expect(422);
  });

  it('/events (POST) should not be able create a event without price', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        name: 'New event',
        description: 'Description of the new event',
        date: '2024-06-25T00:00:00',
      })
      .expect(422);
  });

  it('/events/[eventId]/spots (POST) should not be able create a spot without name', () => {
    return request(app.getHttpServer())
      .post('/events/1/spots')
      .send({})
      .expect(422);
  });

  it('/events/[eventId]/reserve (POST) should not be able reserve a spot without spots', () => {
    return request(app.getHttpServer())
      .post('/events/1/reserve')
      .set("x-api-token", "123")
      .send({
        spots: [],
        tiket_kind: 'full',
      })
      .expect(422);
  });

  it('/events/[eventId]/reserve (POST) should not be able reserve a spot without ticket kind', () => {
    return request(app.getHttpServer())
      .post('/events/1/reserve')
      .set("x-api-token", "123")
      .send({
        spots: ["A1"],
      })
      .expect(422);
  });

  it('/events/[eventId]/reserve (POST) should not be able reserve a spot with invalid ticket kind', () => {
    return request(app.getHttpServer())
      .post('/events/1/reserve')
      .set("x-api-token", "123")
      .send({
        spots: ["A1"],
        tiket_kind: 'invalid',
      })
      .expect(422);
  });
});
