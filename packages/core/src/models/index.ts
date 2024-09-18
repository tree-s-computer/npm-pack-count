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
}
