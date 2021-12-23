// check for different key after changing
// check for different loadout after changing
//

// Importing for the algorithm
import mode from '../src/logic/Mode';
import note from '../src/logic/Note';
import small from '../src/actions/small.action';
import intervals from '../src/logic/Intervals';


// Music algorithm init
note.lastRecorded = "C3"
mode.init();
/*
// This one actually can totally fail
test('check if mode has changed', () =>{
    const currentMode = mode.current;
    mode.change();
    expect(currentMode).toBe(mode.previous);
    expect(currentMode).not.toBe(mode.current);
})

// This one too but there's an issue open for that
test('check for variation in notes', () =>{
    const lastPlayed = small.onPress();
    expect(lastPlayed).toBe(note.lastAbsolute);

    const newerLastPlayed = small.onPress();
    expect(newerLastPlayed).not.toBe(lastPlayed);
    expect(newerLastPlayed).toBe(note.lastAbsolute);
    expect(lastPlayed).toBe(note.secondToLastRecorded);
});

// This can also not be different but hey, most of the time it should pass
test('check for different intervals loadout', () => {
    mode.change()
    const firstLoadout = intervals.loadout;
    intervals.populate();
    expect(firstLoadout).toBe(intervals.loadout)

    mode.change()
    const newLoadout = intervals.loadout;

    expect(firstLoadout).not.toBe(newLoadout);

})*/