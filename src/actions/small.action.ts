import Action from "./action";

class Small extends Action {

  async onPress() {
    const note = this.generateNote();
     console.log('GENERATED: ', note);
    
    return note;
  }

  public toString(): string {
    return "Small";
}
}

const small = new Small();
export default small;