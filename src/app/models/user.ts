export class User {
  name: string;
  age: number;
  weight: number;
  friends: Array<number>;
  id: number;

  constructor(jsonObject: any = {}) {
    Object.assign(this, jsonObject);
  }

}
