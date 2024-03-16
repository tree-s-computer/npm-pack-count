import axios from "axios";
import { Packages } from "../models/Package";
import { URL } from "@/data";
import { formatDate } from "@/util";
import { OutputView } from "@/views/OutputView";

export default class DownloadTracker {
  packages: string[];
  private weekNum: number;
  private weekPacks: Packages[][] = [];

  constructor(packages, weekNum) {
    this.packages = packages;
    this.weekNum = weekNum;
  }

  private async getDownloadsForWeek(
    packageName: string,
    start: string,
    end: string
  ) {
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

  private setWeekData(startDate, endDate, i) {
    // Calculate the start and end dates for each week (Yesterday to Yesterday)
    const start = new Date(startDate);
    start.setDate(startDate.getDate() - i * 7); // Go back i weeks
    const end = new Date(endDate);

    return { start, end };
  }

  private startSettingDate() {
    const today: any = new Date();
    const endDate: any = new Date(today);
    endDate.setDate(today.getDate() - 1); // Yesterday
    const startDate: any = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6); // Go back one week

    return { startDate, endDate };
  }

  private async getWeeklyDownloadsFromYesterday(packageName: string) {
    const weekPack: Packages[] = [];
    const { startDate, endDate } = this.startSettingDate();

    for (let i = 0; i < this.weekNum; i++) {
      const { start, end } = this.setWeekData(startDate, endDate, i);

      const pack = await this.getDownloadsForWeek(
        packageName,
        formatDate(start),
        formatDate(end)
      );

      weekPack.push(pack);
    }

    return weekPack;
  }

  private async getWeekPacks() {
    for (const packageName of this.packages) {
      const weekPack = await this.getWeeklyDownloadsFromYesterday(packageName);
      this.weekPacks.push(weekPack);
    }
  }

  public async start() {
    await this.getWeekPacks();
    OutputView.printWeekPackageName(this.weekPacks);
    console.log("\nWeekly Total Downloads for All Packages:");
  }
}
