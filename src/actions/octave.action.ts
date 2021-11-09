import Action from "./action";
import note from "../logic/Note";

class Octave extends Action{

    onPress(): void {
        this.generateNote();
        this.playOctave();
    }

    public async playOctave(){

        let octaveTone:string = "";
        let octaveDownorUp: Array<number> = [-12, 12]

        for (let i = 0; i < note.DATABASE.length; i++) {
            if (note.lastAbsolute == note.DATABASE[i]) {
				while (octaveTone == "" || octaveTone == null) octaveTone = note.DATABASE[i + octaveDownorUp[Math.floor(Math.random() * octaveDownorUp.length)]];
			}
        }
    console.log("Octave tone => ", octaveTone); 
    note.lastOctave = octaveTone;

    return octaveTone;
    }   

    public toString(): string {
        return "Octave";
    }
}

const octave = new Octave();
export default octave;
