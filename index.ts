import axios from "axios";

// Helper function to format a Date object as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Helper function to find the most recent Sunday before or on the given date
function findMostRecentSunday(date: Date): Date {
  const currentDayOfWeek = date.getDay();
  const daysToAdd = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
  const result = new Date(date);
  result.setDate(result.getDate() - daysToAdd + 1);
  return result;
}

// Function to get downloads for a given npm package and date range
async function getDownloadsForWeek(
  packageName: string,
  start: string,
  end: string
): Promise<number> {
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

// Function to get weekly downloads from yesterday to yesterday for the past 6 weeks for a given npm package
async function getWeeklyDownloadsFromYesterday(
  packageName: string
): Promise<number[]> {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() - 1); // Yesterday
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 6); // Go back one week

  const weeklyDownloads = [];

  for (let i = 0; i < 6; i++) {
    // Calculate the start and end dates for each week (Yesterday to Yesterday)
    const start = new Date(startDate);
    start.setDate(startDate.getDate() - i * 7); // Go back i weeks

    const end = new Date(endDate);
    end.setDate(endDate.getDate() - i * 7); // Go back i weeks

    const downloads = await getDownloadsForWeek(
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

async function getD() {
  const packages = [
    "@sd-jwt/crypto-nodejs",
    "@sd-jwt/crypto-browser",
    "@sd-jwt/core",
    "@sd-jwt/sd-jwt-vc",
    "@sd-jwt/utils",
    "@sd-jwt/types",
    "@sd-jwt/decode",
    "@sd-jwt/present",
    "@sd-jwt/hash",
  ];

  const weeklyTotalDownloads = Array(6).fill(0);

  for (const packageName of packages) {
    console.log(`\nPackage: ${packageName}`);
    const weeklyDownloads = await getWeeklyDownloadsFromYesterday(packageName);
    for (let i = 0; i < weeklyDownloads.length; i++) {
      weeklyTotalDownloads[i] += weeklyDownloads[i];
    }
  }

  console.log("\nWeekly Total Downloads for All Packages:");
  weeklyTotalDownloads.forEach((total, index) => {
    console.log(`Week ${index + 1}: ${total}`);
  });
}

getD();
