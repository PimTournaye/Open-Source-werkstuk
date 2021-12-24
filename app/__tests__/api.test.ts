import supertest from 'supertest';
import mode from '../src/logic/Mode';
import note from '../src/logic/Note';
import { pg } from "../src/app";

const SERVER = 'localhost:3000'

const user = {
  user_name: 'tester',
  email: 'tester@testing.com'
}
let user_id;

test('POST /users without data', async () => {

  await supertest(SERVER)
    .post("/users")
    .expect(400);
  
})
test('GET /sessions without login', async () => {

  await supertest(SERVER)
    .get("/sessions")
    .expect(400);
  
})
test('PUT /sessions without login', async () => {

  await supertest(SERVER)
    .put("/sessions")
    .expect(400);
  
})
test('DELETE /sessions without login', async () => {

  await supertest(SERVER)
    .delete("/sessions")
    .expect(400);
  
})


test('POST /users with data', async () => {

  await supertest(SERVER)
    .post("/users")
    .send(user)
    .expect(200)
    .then(async (res:any) => {
      expect(res.body).toBe(typeof 'number');
      user_id = res.body

    })
  
})

