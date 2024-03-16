import axios from "axios";
import { formatDate } from "./util/formatDate";
class DownloadTracker {
  packages: string[];
  weekNum: number;

  constructor(packages, weekNum) {
    this.packages = packages;
    this.weekNum = weekNum;
  }

  async getDownloadsForWeek(packageName, start, end) {
    const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${packageName}`;
    try {
      const response = await axios.get(url);
      const data = await response.data;
      if (data && data.downloads) {
        return data.downloads;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Error fetching download stats:", error);
      return 0;
    }
  }

  async getWeeklyDownloadsFromYesterday(packageName) {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1); // Yesterday
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6); // Go back one week

    const weeklyDownloads = [];

    for (let i = 0; i < this.weekNum; i++) {
      // Calculate the start and end dates for each week (Yesterday to Yesterday)
      const start = new Date(startDate);

      start.setDate(startDate.getDate() - i * 7); // Go back i weeks

      const end = new Date(endDate);
      end.setDate(endDate.getDate() - i * 7); // Go back i weeks

      const downloads = await this.getDownloadsForWeek(
        packageName,
        formatDate(start),
        formatDate(end)
      );
      weeklyDownloads.push(downloads);
      console.log(
        `Week ${i + 1} (${formatDate(start)} to ${formatDate(
          end
        )}): ${downloads} downloads`
      );
    }

    return weeklyDownloads;
  }

  async getTotalDownloads() {
    const weeklyTotalDownloads = Array(this.weekNum).fill(0);

    for (const packageName of this.packages) {
      console.log(`\nPackage: ${packageName}`);
      const weeklyDownloads = await this.getWeeklyDownloadsFromYesterday(
        packageName
      );
      for (let i = 0; i < weeklyDownloads.length; i++) {
        weeklyTotalDownloads[i] += weeklyDownloads[i];
      }
    }

    console.log("\nWeekly Total Downloads for All Packages:");
    weeklyTotalDownloads.forEach((total, index) => {
      console.log(`Week ${index + 1}: ${total}`);
    });
  }
}

const weekNum = 6;
const packages = [
  "@sd-jwt/crypto-nodejs",
  // "@sd-jwt/crypto-browser",
  // "@sd-jwt/core",
  // "@sd-jwt/sd-jwt-vc",
  // "@sd-jwt/utils",
  // "@sd-jwt/types",
  // "@sd-jwt/decode",
  // "@sd-jwt/present",
  // "@sd-jwt/hash",
];

const tracker = new DownloadTracker(packages, weekNum);
tracker.getTotalDownloads();
