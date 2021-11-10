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

// Music algo init
note.lastRecorded = "C3"
mode.init();
console.log(small.onPress());

//let test = transpose.onPress();
//console.log(test);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

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
  res.send(notes)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
