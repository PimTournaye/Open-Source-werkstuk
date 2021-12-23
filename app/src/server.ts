import app from './app';
import mode from './logic/Mode';
import note from './logic/Note';
const PORT = 3000;

// Music algorithm init
note.lastRecorded = "C3"
mode.init();

app.listen(3000, () => `Listening on port ${PORT}`);