// Express setup
import express from "express";
const app = express()
const PORT = 3000

// Importing for the algorithm
import mode from './logic/Mode';
import note from './logic/Note';
import chord from './actions/chord.action';
import vamp from './actions/vamp.action';
import small from './actions/small.action';
import transpose from './actions/transpose.action';
import octave from './actions/octave.action';
import harmony from './actions/harmony.action';

// Music algorithm init
note.lastRecorded = "C3"
mode.init();


// GET endpoints, giving back various combinations of sounds.
app.get('/note', (req, res) => {
  const note = small.onPress()
  res.send(note)
})

app.get('/chord', (req, res) => {
  const notes = chord.onPress()
  res.send(notes)
})

app.get('/vamp', (req, res) => {
  const notes = vamp.onPress()
  res.send(notes)
})

app.get('/octave', (req, res) => {
  const notes = octave.onPress()
  res.send(notes)
})

app.get('/harmony', (req, res) => {
  const notes = harmony.onPress()
  res.send(notes)
})

app.get('/transpose', (req, res) => {
  const notes = transpose.onPress()
  res.status(200).json(notes)
})

// POST route 
app.post('/create', (req, res) => {
  res.status(200).send('post submitted')
})

// UPDATE route
app.put('/update', (req, res) => {
  console.log(req.body)
})

// DELETE route
app.delete('/delete', (req, res) => {
  res.status(200).send('deleted the following')

})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
