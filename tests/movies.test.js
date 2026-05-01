import request from 'supertest';
import app from '../src/app.js';
import { disconnectDB } from '../src/config/db.js';

// Runs once after all tests finish — closes the Prisma DB connection
// so Jest can exit cleanly instead of hanging
afterAll(async () => {
  await disconnectDB();
});

// ─── Movies ───────────────────────────────────────────────────────────────────

describe('GET /movies', () => {
  it('returns 200 and a movies array', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(Array.isArray(res.body.data.movies)).toBe(true);
  });
});

describe('POST /movies', () => {
  it('returns 401 when no auth token is provided', async () => {
    const res = await request(app)
      .post('/movies')
      .send({ title: 'Test Movie', releaseYear: 2024 });
    expect(res.status).toBe(401);
  });

  it('returns 401 when an invalid Bearer token is provided', async () => {
    const res = await request(app)
      .post('/movies')
      .set('Authorization', 'Bearer this-is-not-a-real-token')
      .send({ title: 'Test Movie', releaseYear: 2024 });
    expect(res.status).toBe(401);
  });
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

describe('POST /auth/logout', () => {
  it('returns 200 even without being logged in', async () => {
    const res = await request(app).post('/auth/logout');
    expect(res.status).toBe(200);
  });
});

// ─── Watchlist ────────────────────────────────────────────────────────────────

describe('GET /watchlist', () => {
  it('returns 401 when no auth token is provided', async () => {
    const res = await request(app).get('/watchlist');
    expect(res.status).toBe(401);
  });
});
