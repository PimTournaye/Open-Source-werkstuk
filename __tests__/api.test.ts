// check if string
//check if array

//check knex endpoints

import supertest from "supertest";

// Express setup
import express from "express";
const app = express()
const PORT = 3000

const request = supertest(app);

// Importing for the algorithm
import mode from '../src/logic/Mode';
import note from '../src/logic/Note';

// Music algorithm init
note.lastRecorded = "C3"
mode.init();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('knex')({
    client: 'pg',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://user:pass@localhost:5432/db'
});







app.get('/users', async (req, res) => {
    const dbTest = await pg.select().table('stats');
    res.json(dbTest)
})

app.post('/users', async (req, res) => {

    const dbTest = await pg('users').insert([{
        username: 'test'
    }], {
        session_stat: 2
    })
    res.status(200).json(dbTest)
})

app.delete('/users', async (req, res) => {
    const dbTest = await pg('stats').where('id', 1).del();
    res.json(dbTest)
})

app.put('/users', async (req, res) => {
    const dbTest = await pg('stats').where({
        id: 1
    }).update('initial', 'C3')
    res.json(dbTest)
})


describe('GET /users', () => {
    it('should return an id', async () => {

        const res = await request.get(`/users`).expect(200)

        expect(res).toBeInstanceOf(Array)
        //expect(res.id).toBe(1)
    })
})

describe('POST, PUT and DELETE /users', () => {
    it('should post a row', async () => {

        await request.post(`/users`).expect(200)
        const checkPost = await pg.select().table('users');
        expect(checkPost.username).toBe('test');
    });

    it('should change the username in the users table', async () =>{
        await pg('users').where({username: 'test'}).update('username', 'PUTtest').expect(200)
        const checkPost = await pg.select().table('users');
        expect(checkPost.username).not.toBe('test');
        expect(checkPost.username).toBe('PUTtest');
    })

    it('should delete that row', async () => {
        await pg('users').where('username', 'test').del();
        expect( async () => { await pg.from('users').where('username', 'test')}).toThrow()
    });
});