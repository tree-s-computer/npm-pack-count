import axios from 'axios';
import { Packages } from '../models/Package';
import { URL } from '../data';
import { formatDate } from '../util';
import { OutputView } from '../views/OutputView';

export default class DownloadTracker {
  private packages: string[];
  private weekNum: number;
  private weekPacks = [];

  constructor(packages, weekNum) {
    this.packages = packages;
    this.weekNum = weekNum;
  }

  private async getDownloadsForWeek(
    packageName: string,
    start: string,
    end: string,
  ) {
    const url = `${URL}${start}:${end}/${packageName}`;

    try {
      const { data } = await axios.get(url);
      const { downloads, start, end, package: packName } = data;

      if (data.downloads) {
        return new Packages(downloads, start, end, packName);
      }

      return new Packages(0, start, end, packName);
    } catch (error) {
      console.error('Error fetching download stats:', error);
      return new Packages(0, start, end, 'none');
    }
  }

  private setWeekData(startDate, endDate, i) {
    // Calculate the start and end dates for each week (Yesterday to Yesterday)
    const start = new Date(startDate);
    start.setDate(startDate.getDate() - i * 7); // Go back i weeks

    const end = new Date(endDate);
    end.setDate(endDate.getDate() - i * 7); // Go back i weeks

    return { start, end };
  }

  private startSettingDate() {
    // Default
    const today = new Date();

    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1); // Yesterday
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6); // Go back one week

    return { startDate, endDate };
  }

  private async getWeeklyDownloadsDefault(packageName: string) {
    const { startDate, endDate } = this.startSettingDate();

    const promises = Array.from({ length: this.weekNum }).map((_, index) => {
      const { start, end } = this.setWeekData(startDate, endDate, index);

      return this.getDownloadsForWeek(
        packageName,
        formatDate(start),
        formatDate(end),
      );
    });

    try {
      return await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  }

  private async getWeekPacks() {
    const promises = this.packages.map((packageName) => {
      return this.getWeeklyDownloadsDefault(packageName);
    });
    try {
      return await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  }

  private getWeekPackTotal() {
    const totalNums = [];
    this.weekPacks.forEach((weekPack, i) => {
      const weekTotalDownloads = weekPack.reduce(
        (total, e) => total + e.downloads,
        0,
      );
      totalNums.push({
        total: weekTotalDownloads.toLocaleString(),
        packName: weekPack[i].packName,
      });
    });

    return totalNums;
  }

  public async start() {
    const results = await this.getWeekPacks();
    OutputView.printWeekPackageName(results);
    return results;
  }
}
