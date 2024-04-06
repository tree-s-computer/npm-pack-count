export class PackagesType {
  constructor(
    public downloads: number,
    public start: string,
    public end: string,
    public packName: string,
  ) {}
}

export type AllPackagesType = PackagesType[][];
