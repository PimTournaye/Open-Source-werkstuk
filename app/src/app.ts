// Express setup
import express from "express";
const app = express()

// Importing for the algorithm
import mode from './logic/Mode';
import note from './logic/Note';
import key from "./logic/Key";
import chord from './actions/chord.action';
import vamp from './actions/vamp.action';
import small from './actions/small.action';
import transpose from './actions/transpose.action';
import octave from './actions/octave.action';
import harmony from './actions/harmony.action';
import { createTable } from "./table-creation";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const pg = require('knex')({
  client: 'pg',
  searchPath: ['knex', 'public'],
  connection: process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgres://user:pass@localhost:5432/db'
});

createTable(pg);

app.use(express.json());


/////////////////////////////////////////////
// Database routes with KNEX.JS /////////////
/////////////////////////////////////////////

/**
 * GET Route - gets music stats from the current session
 * @param user_id
 * @returns Your session stats
 */
 app.get('/stats', async (req, res) => {
  const dbTest = await pg.select().table('stats');
  res.json(dbTest)
});

/**
 * PUT Route - updates the stats from the current session
 */
app.put('/sessions', async (req, res) => {
  const dbTest = await pg('sessions').where({id: 1}).update('initial', 'C3')
  res.json(dbTest)
});

// Session table endpoints

/**
 * POST Route - Creates a new row when a session starts
 */
app.post('/sessions', async (req, res) => {
  const data = req.body;
  console.log(data);
  if(!data) return res.sendStatus(400);

  const add = await pg('sessions').insert(data);
  console.log(add);

  //const createSession = await pg('sessions').insert();
  //const getId = await pg('sessions')
  res.sendStatus(200)//.json(createSession)

});

/** 
 * DELETE Route - Deletes the given row in the sessions table, along with it's stats
 */
app.delete('/sessions', async (req, res) => {
  const dbTest = await pg('sessions').where('id', 1).del();
  res.json(dbTest)
});


////////////////////////////////////////////////////////////////////////
// GET endpoints, giving back various combinations of sounds. //////////
////////////////////////////////////////////////////////////////////////

/**
 * GET Route - Note
 * Generates a note in the current key and mode.
 * @returns a single note in the form of a string, ie. "C3"
 */
app.get('/note', async (req, res) => {
  console.log('start');
  const note = await small.onPress()
  
  res.send(note)
  update(req.body.id, req.body.user_id)
})

/**
 * GET Route - Chord
 * Generates a 3-note or 4-note chord in  the current key, while also changing the music's mode.
 * @returns an array of 3 or 4 strings
 */
app.get('/chord',  (req, res) => {
  const notes =  chord.onPress()
  res.send(notes)

  update(req.body.id, req.body.user_id)
})

/**
 * GET Route - Vamp
 * Generates a 3-note or 4-note chord in the current key and mode.
 * @returns an array of 3 or 4 strings
 */
app.get('/vamp', async (req, res) => {
  const notes = vamp.onPress()
  res.send(notes)

  update(req.body.id, req.body.user_id)
})

/**
 * GET Route - Octave
 * Generates a note and an additional one an octave higher or lower
 * @returns an array of two strings
 */
app.get('/octave', async (req, res) => {
  const notes = octave.onPress()
  res.send(notes)

  update(req.body.id, req.body.user_id)
})

/**
 * GET Route - Octave
 * Generates a note and an additional one that is the first one's harmonic.
 * @returns an array of two strings
 */
app.get('/harmony', (req, res) => {
  const notes = harmony.onPress()
  res.send(notes)

  update(req.body.id, req.body.user_id)
})

/**
 * GET Route - Transpose
 * Changes the whole feel of the generated music. Changes the current key and mode and then generates a chord, an octave tone and an harmony tone. Big sound boom. Yay!
 * @returns an array of 5-6 strings.
 */
app.get('/transpose', (req, res) => {
  const notes = transpose.onPress()
  res.status(200).json(notes)

  update(req.body.id, req.body.user_id)
})

async function update(id: number, user_id: number):Promise<void> {
  const data = {
      id: id,
      last_harmony: note.lastHarmony,
      last_octave: note.lastOctave,
      initial: "C3",
      current_key: key.current,
      current_mode: mode.current,
      user_id: user_id
  }

  await pg("sessions").where({id: id}).update(data)
  
}

export default app;