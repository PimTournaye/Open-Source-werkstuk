import supertest from 'supertest';
import harmony from '../src/actions/harmony.action';
import mode from '../src/logic/Mode';
import note from '../src/logic/Note';

// do change this to something else when doing CI, using the URL requires the server to already be running
const SERVER = 'localhost:3000'

const user = {
  user_name: 'tester',
  email: 'tester@testing.com'
}

note.lastRecorded = "C3"
note.lastAbsolute = "C3"
mode.init();

let user_id: number

describe('Testing without any login data', () => {

  it('POST /users without data', async () => {

    await supertest(SERVER)
      .post("/users")
      .expect(400);

  })
  it('GET /sessions without login', async () => {

    await supertest(SERVER)
      .get("/sessions")
      .expect(400);

  })
  it('PUT /sessions without login', async () => {

    await supertest(SERVER)
      .put("/sessions")
      .expect(400);

  })
  it('DELETE /sessions without login', async () => {

    await supertest(SERVER)
      .delete("/sessions")
      .expect(400);

  })
})

describe('POST /users security testing', () => {

  it('post with a number as username', async () => {
    await supertest(SERVER)
      .post("/users")
      .send({
        user_name: 1,
        email: 'tester@testing.com'
      })
      .expect(400);
  })

  it('post with a number as email', async () => {
    await supertest(SERVER)
      .post("/users")
      .send({
        user_name: 'tester',
        email: 1
      })
      .expect(400);
  })

  it('post with more bad data', async () => {
    await supertest(SERVER)
      .post("/users")
      .send({
        user_name: undefined,
        email: 'tester@testing.com'
      })
      .expect(400);
  })

  it('post with a bad email', async () => {
    await supertest(SERVER)
      .post("/users")
      .send({
        user_name: 'tester',
        email: 'tester'
      })
      .expect(400);
  })

  it('post with boolean', async () => {
    await supertest(SERVER)
      .post("/users")
      .send({
        user_name: true,
        email: false
      })
      .expect(400);
  })


})

describe('Testing while logged in', () => {

  let stats: any;
  it('create a row in users and sessions', async () => {
    await supertest(SERVER)
      .post("/users")
      .send(user)
      .expect(200)
      .then(async (res: any) => {
        expect(typeof res.body).toBe('number');
        user_id = res.body
      });
  });
  it('should not get our current stats - string', async () => {

    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: user_id.toString()
      })
      .expect(400)
  });
  it('should not get our current stats - null', async () => {

    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: null
      })
      .expect(400)
  });
  it('should not get our current stats - array', async () => {

    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: [user_id]
      })
      .expect(400)
  });
  it('should not get our current stats - object', async () => {

    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: {
          user_id: user_id
        }
      })
      .expect(400)
  });

  let current_harmony: any;

  it('should give our stats', async () => {

    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: user_id
      })
      .expect(200)
      .then(async (res) => {
        stats = res.body[0];
        expect(typeof stats.id).toBe('number');

        //when beginning from a fresh session - in dev this needs a container restart
        current_harmony = stats.last_harmony;
        expect(current_harmony).toBeNull();
      })
  });

  it('should update our stats', async () => { 

    let first_harmony = harmony.playHarmonyTone();
    await supertest(SERVER)
      .put("/sessions")
      .send({
        user_id: user_id
      })
      .expect(200)

    await supertest(SERVER)
      .get("/sessions")
      .send({
        user_id: user_id
      })
      .expect(200)
      .then(async (res) => {
        stats = res.body[0];
        
        let current_harmony = stats.last_harmony;
        expect(current_harmony).not.toBe(first_harmony);
      })
  })

  it('should not get our current stats - string', async () => {

    await supertest(SERVER)
      .delete("/sessions")
      .send({
        user_id: user_id.toString()
      })
      .expect(400)
  });
  it('should not get our current stats - null', async () => {

    await supertest(SERVER)
      .delete("/sessions")
      .send({
        user_id: null
      })
      .expect(400)
  });
  it('should not get our current stats - array', async () => {

    await supertest(SERVER)
      .delete("/sessions")
      .send({
        user_id: [user_id]
      })
      .expect(400)
  });
  it('should not get our current stats - object', async () => {

    await supertest(SERVER)
      .delete("/sessions")
      .send({
        user_id: {
          user_id: user_id
        }
      })
      .expect(400)
  });

  it('should delete current stats', async () => {

    await supertest(SERVER)
      .delete("/sessions")
      .send({
        user_id: user_id
      })
      .expect(400)
  });

});