import axios from "axios";
import { formatDate } from "./util";
import { WEEK_NUM, PACKAGES, URL } from "./data";
import { Packages } from "./models/Package";
class DownloadTracker {
  packages: string[];
  #weekNum: number;
  #weekPacks: Packages[][] = [];

  constructor(packages, weekNum) {
    this.packages = packages;
    this.#weekNum = weekNum;
  }

  async #getDownloadsForWeek(packageName: string, start: any, end: any) {
    const url = `${URL}${start}:${end}/${packageName}`;

    try {
      const { data } = await axios.get(url);
      const { downloads, start, end, package: packName } = data;

      if (data?.downloads) {
        return new Packages(downloads, start, end, packName);
      }

      return new Packages(0, start, end, "none");
    } catch (error) {
      console.error("Error fetching download stats:", error);
      return new Packages(0, start, end, "none");
    }
  }

  #setWeekData(startDate, endDate, i) {
    // Calculate the start and end dates for each week (Yesterday to Yesterday)
    const start = new Date(startDate);
    start.setDate(startDate.getDate() - i * 7); // Go back i weeks
    const end = new Date(endDate);

    return { start, end };
  }

  #startSettingDate() {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1); // Yesterday
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6); // Go back one week

    return { startDate, endDate };
  }

  async #getWeeklyDownloadsFromYesterday(packageName: string) {
    const weekPack: Packages[] = [];
    const { startDate, endDate } = this.#startSettingDate();

    for (let i = 0; i < this.#weekNum; i++) {
      const { start, end } = this.#setWeekData(startDate, endDate, i);

      const pack = await this.#getDownloadsForWeek(
        packageName,
        formatDate(start),
        formatDate(end)
      );

      weekPack.push(pack);
    }

    return weekPack;
  }

  async #getWeekPacks() {
    for (const packageName of this.packages) {
      const weekPack = await this.#getWeeklyDownloadsFromYesterday(packageName);
      this.#weekPacks.push(weekPack);
    }
  }

  async start() {
    await this.#getWeekPacks();
    this.#weekPacks.forEach((weekPack, i) => {
      console.log(`\nPackage Name: ${weekPack[i].packName}`);
      weekPack.forEach(({ downloads }, index) => {
        console.log(`Week ${index + 1}: ${downloads}`);
      });
      console.log("------------------");
    });

    console.log("\nWeekly Total Downloads for All Packages:");
    // weeklyTotalDownloads.forEach((total, index) => {
    //   console.log(`Week ${index + 1}: ${total}`);
    // });
  }
}

const tracker = new DownloadTracker(PACKAGES, WEEK_NUM);
tracker.start();
