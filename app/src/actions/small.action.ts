import Action from "./action";

class Small extends Action {

  async onPress() {
    console.log('generating small note');
    const note = await this.generateNote();
    console.log('end of fucntion', note);
    
    return note;
  }

  public toString(): string {
    return "Small";
}
}

const small = new Small();
export default small;