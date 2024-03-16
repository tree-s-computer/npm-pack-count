export class Packages {
  downloads: number;
  start: string;
  end: string;
  packName: string;

  constructor(downloads: number, start: string, end: string, packName: string) {
    this.downloads = downloads;
    this.start = start;
    this.end = end;
    this.packName = packName;
  }

  // get downloads(): number {
  //   return this.#downloads;
  // }

  // get start(): string {
  //   return this.#start;
  // }

  // get end(): string {
  //   return this.#end;
  // }

  // get packName(): string {
  //   return this.#packName;
  // }
}
