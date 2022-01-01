export interface ICity {
  id?: number;
  name?: string;
  photo?: string;
}

export class City implements ICity {
  constructor(
    public id?: number,
    public name?: string,
    public photo?: string,
  ) {}
}
