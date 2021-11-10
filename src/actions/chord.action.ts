import Action from "./action";
import mode from "../logic/Mode";

class Chord extends Action {

    onPress() {
        let notes = [];

        mode.change();
        notes = [...this.playChord()];

        return notes;
    }

    public toString(): string {
        return "Chord";
    }
}

const chord = new Chord();
export default chord;