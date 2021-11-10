import Action from "./action";

class Small extends Action {

  onPress() {
    const note = this.generateNote();
    return note;
  }

  public toString(): string {
    return "Small";
}
}

const small = new Small();
export default small;