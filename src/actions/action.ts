import key from '../logic/Key';
import note from '../logic/Note';
import mode  from '../logic/Mode';
import intervals from '../logic/Intervals';

abstract class Action {

	public playsNote: boolean = false;
	public noteName: string = 'n/a';

	public type: string = "";
    private static lastSoundtype: string;

	abstract onPress(): any;
	abstract toString():string;

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	// MUSIC FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	/** Play a note! Takes in an array of classes, and will pick one randomly. */
    protected play(options: string[]): string{
		let noteName = this.noteAdjustments(options);
		console.log("This is the note that is going to be played => ", noteName);
		

		note.secondToLastRecorded = note.lastRecorded;
		note.lastRecorded = noteName;
		note.lastAbsolute = note.lastRecorded;

		return noteName;
	}
	/** Play a three or four notes! Takes in an array of classes, and will pick one combination randomly. */
	protected playChord(): (string | undefined)[]{

		// DETERMINE CHORD TONES
		let chord = mode.current.chords[Math.floor(Math.random() * mode.current.chords.length)];

		let note_1 =  intervals.loadout.get(chord[0]);
		let note_2 = intervals.loadout.get(chord[1]);
		let note_3 = intervals.loadout.get(chord[2]);

		let chordNotenames = [note_1, note_2, note_3];

		if (chord.length > 3 && intervals.loadout.get(chord[3]) != null) {
			let note_4 = intervals.loadout.get(chord[3])
			chordNotenames.push(note_4);
		};

		return chordNotenames;
		}
	

	////////////////////////////////////////////////////////////////////////////////////////////////////
	// MODE FUNCTIONS //////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////


	/** Uses the option sets of the current mode to choose which note to generate. */
    protected generateNote(){

        let played: boolean = false;
		
		
		let optionSets = mode.current.logic;
		//console.log(intervals.loadout)

		intervals.DATABASE.forEach((databaseElement,index) =>{			
			if(note.lastRecorded == intervals.loadout.get(databaseElement)){				
				let note = this.play(optionSets[index])
				played = true;
				return note;
			}
		});
        
		if (played = false){ //edge case 
			console.log('whoops, edge case');
			let note = this.play(optionSets[22]);
			return note;
		};
    }

	// Edge cases and preventing chromatism hell
    protected noteAdjustments(options: Array<string>):string {
			let newNote: any = "";
			let random: number = 0;
			
			// NOTE PREVENTIONS
			random = Math.floor(Math.random()* options.length);
			newNote = intervals.loadout.get(options[random]);
			
			// Halve Probability of Trills and Repeats
			/* if (newNote == note.secondToLastRecorded || newNote == note.lastAbsolute){
				console.log("halving probability of Trills and Repeats")
				random = Math.random()* options.length;
				newNote = intervals.loadout.get(options[random]);
			} */
			
			let g = 0;		
			while (g < 100 && (note == null
				|| (newNote == note.lastHarmony && Action.lastSoundtype == "Harmony")
				|| (newNote == note.lastOctave && Action.lastSoundtype == "Octave")
				//|| (this.type == "Octave" && (note == intervals.loadout.get("for1") || note == intervals.loadout.get("for2") || note == intervals.loadout.get("for3")))
				))
			{
				random = Math.random() * options.length - 1;
				newNote = intervals.loadout.get(options[random]);
				g++;
			}				
			
			// Prevent certain tensions from triggering on record mode key changes
		 if (key.justChanged && mode.current != mode.MIXOLYDIAN
			&& (newNote == intervals.loadout.get("two1") ||
				newNote == intervals.loadout.get("for1") ||
				newNote == intervals.loadout.get("six1") ||
				newNote == intervals.loadout.get("for2") ||
				newNote == intervals.loadout.get("six2") ||
				newNote == intervals.loadout.get("for3") ||
				newNote == intervals.loadout.get("six3")) ) {

			for (let desc in intervals.loadout.keys()) {
				if (newNote == intervals.loadout.get(desc)) {
					for (let j = 0; j < intervals.DATABASE.length - 1; j++) {
						if (intervals.loadout.get(desc) == intervals.DATABASE[j]) {
							// change new note to be +/- 1 interval if the key just changed.
							newNote = intervals.loadout.get(intervals.DATABASE[j + Math.random() < 0.5 ? -1 : 1]);
							break;
						}
					}
				}
			}
			key.justChanged = false;
		}
		
	return newNote;
	
	}	
}

export default Action;
