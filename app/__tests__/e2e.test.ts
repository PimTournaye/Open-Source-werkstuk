import { stat } from 'fs';
import supertest from 'supertest';
import small from '../src/actions/small.action';
import transpose from '../src/actions/transpose.action';
import { pg } from '../src/app';
import note from '../src/logic/Note';

// do change this to something else when doing CI, using the URL requires the server to already be running
const SERVER = 'localhost:3000'

const USER = {
  user_name: 'tester',
  email: 'tester@testing.com',
}
let user_id: number;

let firstStats: { id: any; last_harmony?: any; last_octave?: any; last_note?: any; initial?: any; current_key?: any; current_mode?: any; user_id?: number; };


test('create a row in users and sessions', async () => {
    await supertest(SERVER)
      .post("/users")
      .send(USER)
      .expect(200)
      .then(async (res: any) => {
        expect(typeof res.body).toBe('number');
        user_id = res.body
      });
});

test('getting our stats from db', async () => {

    small.onPress();
    transpose.onPress();
    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: user_id
      })
      .expect(200)
      .then(async (res) => {
        let stats = res.body[0];
        expect(stats.last_harmony).not.toBeNull();
        expect(stats.last_octave).not.toBeNull();
        expect(stats.last_note).not.toBeNull();
        expect(stats.initial).toBe('C3');

        firstStats = {
            id: stats.id,
            last_harmony: stats.last_harmony,
            last_octave: stats.last_octave,
            last_note: stats.last_note,
            initial: stats.initial,
            current_key: stats.current_key,
            current_mode: stats.current_mode,
            user_id: user_id
        }
      })
  });

test('updating our stats on db',async () => {
    
    transpose.onPress();
    await supertest(SERVER)
      .put("/sessions")
      .send({
        user_id: user_id
      })
      .expect(200)
}
)

test('verifying difference between old and new stats',async () => {

    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: user_id
      })
      .expect(200)
      .then(async (res) => {
        let stats = res.body[0];
        
        expect(firstStats.id).toBe(stats.id)
        expect(firstStats.last_harmony).not.toBe(stats.last_harmony)
        expect(firstStats.last_octave).not.toBe(stats.last_octave)
        expect(firstStats.last_note).not.toBe(stats.last_note)
        expect(firstStats.initial).toBe(stats.initial)
        expect(firstStats.current_key).not.toBe(stats.current_key)
        expect(firstStats.current_mode).not.toBe(stats.current_mode)
        expect(firstStats.user_id).toBe(stats.user_id)
       
      })
  })

test('deleting our profile',async () => {
    await supertest(SERVER)
      .delete("/sessions")
      .send({
        id: user_id
      })
      .expect(200)
});

test('getting stats after deleting', () => {
    
    async function deletedGETTest() {
        await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: user_id
      })
    }
    expect( () => deletedGETTest()).toThrow()

    async function deletedPUTTest() {
        await supertest(SERVER)
      .put("/sessions")
      .send({
        user_id: user_id
      })
    }
    expect(() => deletedPUTTest()).toThrow()

    async function deletedDELETETest() {
        await supertest(SERVER)
      .delete("/sessions")
      .send({
        id: user_id
      })
    }
    expect(() => deletedDELETETest()).toThrow()
      
})

