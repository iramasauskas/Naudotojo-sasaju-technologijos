export class Task {
  id: number;
  text: string;
  type: string;

  constructor(id: number, text: string, type: string) {
    this.id = id;
    this.text = text;
    this.type = type;
  }
}

