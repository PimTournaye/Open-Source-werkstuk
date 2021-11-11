import Action from "./action";
import Key from "../logic/Key";
import mode  from "../logic/Mode";
import harmony from "./harmony.action";

class Transpose extends Action {

    /**
     * This changes the mode and key that are currently being used, as well as playing a note, a harmonic note and a chord at the same time.
     * @returns An array of strings containing note names
     */
    onPress() {
        
        // Array to get every note that is being generated
        const notes = []; 

        // Changing up the sound
        mode.change();
        Key.change();

        // Single notes
        notes.push(this.generateNote());
        notes.push(harmony.playHarmonyTone());

        // Merging two arrays
        
        const chordTones = this.playChord();

        const tranposeNotes = [...notes, ...chordTones]

        
        return tranposeNotes;

    }

    public toString(): string {
        return "Transpose";
    }
}

const transpose = new Transpose();
export default transpose;
