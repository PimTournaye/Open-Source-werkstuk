import Action from "./action";

class Vamp extends Action {

    onPress() {
        let notes = [];
        notes = [...this.playChord()];

        return notes;
    }

    public toString(): string {
        return "Vamp";
    }
}

const vamp = new Vamp();
export default vamp;