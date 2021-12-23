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
 * @returns Your session stats and user info
 */
 app.get('/session', async (req, res) => {
  const userData = req.body.user_id;
  if (!userData) return res.sendStatus(400);
  if (typeof userData != 'number') throw new Error("ID is not a number");
  
  const data = await pg('session').join('users', 'user_id', '=', userData)
  res.json(data)
});



/**
 * PUT Route - updates the stats from the current session
 * @param user_id
 * @returns status code 200
 */
app.put('/sessions', async (req, res) => {
  const userData = req.body.user_id;
  if (!userData) return res.sendStatus(400);
  

  res.sendStatus(200);
});



/**
 * POST Route - Creates a new row when a session starts`
 * @param user_name and email
 * @returns the new user's id
 */
app.post('/users', async (req, res) => {
  const userData = {
    user_name: req.body.user_name,
    email: req.body.email
  }

  if (!userData) return res.sendStatus(400);
  if (typeof userData.user_name != 'string' || typeof userData.email != 'string') throw new Error("New user info can only be strings");
  
  const add = await pg.insert(userData).into('users').returning('id');
  
  const sessionRow = {
    last_harmony: note.lastHarmony,
    last_octave: note.lastOctave,
    initial: "C3",
    current_key: key.current[0],
    current_mode: mode.current.name,
    user_id: add[0]
}
  await pg.insert(sessionRow).into('sessions');


  //update(add[0])

  return res.json(add[0])

});



/** 
 * DELETE Route - Deletes the given row in the sessions table, along with it's stats
 * @param id of user
 */
app.delete('/sessions', async (req, res) => {
  const userData = req.body.id;
  const data = await pg('session').join('users', 'user_id', '=', userData).del()
  res.json(data)
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
})

/**
 * GET Route - Chord
 * Generates a 3-note or 4-note chord in  the current key, while also changing the music's mode.
 * @returns an array of 3 or 4 strings
 */
app.get('/chord',  (req, res) => {
  const notes =  chord.onPress()
  if (req.body.user_id == undefined) {
    res.send(notes)
  } else {
    res.send(notes)
    //update(req.body.user_id)
  }
})

/**
 * GET Route - Vamp
 * Generates a 3-note or 4-note chord in the current key and mode.
 * @returns an array of 3 or 4 strings
 */
app.get('/vamp', async (req, res) => {
  const notes = vamp.onPress()
  res.send(notes)

  //update(req.body.user_id)
});

/**
 * GET Route - Octave
 * Generates a note and an additional one an octave higher or lower
 * @returns an array of two strings
 */
app.get('/octave', async (req, res) => {
  const notes = octave.onPress()
  res.send(notes)

});

/**
 * GET Route - Octave
 * Generates a note and an additional one that is the first one's harmonic.
 * @returns an array of two strings
 */
app.get('/harmony', (req, res) => {
  const notes = harmony.onPress()
  res.send(notes)

  //update(req.body.user_id)
})

/**
 * GET Route - Transpose
 * Changes the whole feel of the generated music. Changes the current key and mode and then generates a chord, an octave tone and an harmony tone. Big sound boom. Yay!
 * @returns an array of 5-6 strings.
 */
app.get('/transpose', (req, res) => {
  const notes = transpose.onPress()
  res.status(200).json(notes)

  //update(req.body.id, req.body.user_id)
})

export default app;