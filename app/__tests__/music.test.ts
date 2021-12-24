// check for different key after changing
// check for different loadout after changing
//

// Importing for the algorithm
import mode from '../src/logic/Mode';
import note from '../src/logic/Note';
import small from '../src/actions/small.action';
import intervals from '../src/logic/Intervals';
import octave from '../src/actions/octave.action';
import harmony from '../src/actions/harmony.action';
import key from '../src/logic/Key';
import transpose from '../src/actions/transpose.action';


// Music algorithm init
note.lastRecorded = "C3"
mode.init();

// This one has been posted on the issues page on the repo
test('check if mode has changed', () =>{
    const currentMode = mode.current;
    mode.change();
    expect(currentMode).toBe(mode.previous);
    expect(currentMode).not.toBe(mode.current);
})

// This one too and there's also an issue open for that
test('check for variation in notes', () =>{
    const lastPlayed = small.onPress();
    expect(lastPlayed).toBe(note.lastAbsolute);

    const newerLastPlayed = small.onPress();
    expect(newerLastPlayed).not.toBe(lastPlayed);
    expect(newerLastPlayed).toBe(note.lastAbsolute);
    expect(lastPlayed).toBe(note.secondToLastRecorded);
});

// If the mode issue gets fixed, this also is able to get fixed
test('check for different intervals loadout', () => {
    mode.change()
    const firstLoadout = intervals.loadout;
    intervals.populate();
    expect(firstLoadout).toBe(intervals.loadout)

    mode.change()
    const newLoadout = intervals.loadout;

    expect(firstLoadout).not.toBe(newLoadout);

})

test('check for different octave', () => {
    small.onPress();
    const firstOctave = octave.playOctave();
    const secondOctave = octave.playOctave();
    expect(firstOctave).not.toBe(secondOctave);
});

test('check for different harmony', () => {
    small.onPress();
    const firstHarmony = harmony.playHarmonyTone();
    const secondHarmony = harmony.playHarmonyTone();
    expect(firstHarmony).not.toBe(secondHarmony);
})
test('check for different everything', () => {
    small.onPress();
    const firstHarmony = harmony.playHarmonyTone();
    const firstOctave = octave.playOctave();
    const currentMode = mode.current;
    const firstLoadout = intervals.loadout;
    const currentKey = key.current[0];

    transpose.onPress()

    const secondtHarmony = harmony.playHarmonyTone();
    const secondOctave = octave.playOctave();
    const newMode = mode.current;
    const newLoadout = intervals.loadout;
    const newKey = key.current[0];

    expect(firstHarmony).not.toBe(secondtHarmony)
    expect(firstOctave).not.toBe(secondOctave)
    expect(currentMode).not.toBe(newMode)
    expect(firstLoadout).not.toBe(newLoadout)
    expect(currentKey).not.toBe(newKey)
})