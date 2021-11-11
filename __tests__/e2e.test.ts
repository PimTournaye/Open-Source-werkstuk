import supertest from "supertest";

// Express setup
import express from "express";
const app = express()
const PORT = 3000

const DATABASE = 'testing';

// Importing for the algorithm
import mode from '../src/logic/Mode';
import note from '../src/logic/Note';
/* import chord from '../src/actions/chord.action';
import vamp from '../src/actions/vamp.action';
import small from '../src/actions/small.action';
import transpose from '../src/actions/transpose.action';
import octave from '../src/actions/octave.action';
import harmony from '../src/actions/harmony.action';
 */
// Music algorithm init
note.lastRecorded = "C3"
mode.init();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('knex')({
  client: 'pg',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://user:pass@localhost:5432/db'
});

// Create new table
// try to delete a row
// insert a new row

describe('Postgres testing', () => {
  
  it('should create a new table', async () => {
    await pg.raw(`DROP DATABASE IF EXISTS ${DATABASE}`)
    await pg.raw(`CREATE DATABASE ${DATABASE}`)

  })
})