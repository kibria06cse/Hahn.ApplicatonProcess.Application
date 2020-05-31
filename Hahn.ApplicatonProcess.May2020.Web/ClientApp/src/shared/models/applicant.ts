export class Applicant {
  iD: any;
  name: string;
  familyName: string;
  address: string;
  countryOfOrigin: string;
  eMailAddress: string;
  age: number;
  hired: boolean;
  public constructor(init?: Partial<Applicant>) {
    Object.assign(this, init);
  }
}
