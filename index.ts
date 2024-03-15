import axios from "axios";

// Helper function to format a Date object as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Helper function to find the most recent Sunday from a given date
function findMostRecentSunday(date: Date): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - result.getDay());
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

// Function to get weekly downloads from Sunday to Sunday for the past 6 weeks for a given npm package
async function getWeeklyDownloadsSundayToSunday(
  packageName: string
): Promise<number[]> {
  const today = new Date();
  const mostRecentSunday = findMostRecentSunday(today);
  const weeklyDownloads = [];

  for (let i = 0; i < 6; i++) {
    // Calculate the start and end dates for each week (Sunday to Sunday)
    const start = new Date(mostRecentSunday);
    start.setDate(mostRecentSunday.getDate() - i * 7);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

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
    const weeklyDownloads = await getWeeklyDownloadsSundayToSunday(packageName);
    for (let i = 0; i < weeklyDownloads.length; i++) {
      weeklyTotalDownloads[i] += weeklyDownloads[i];
    }
  }

  console.log("\nWeekly Total Downloads for All Packages:");
  weeklyTotalDownloads.forEach((total, index) => {
    console.log(`Week ${index + 1}: ${total}`);
  });

  const totalDownloads = weeklyTotalDownloads.reduce(
    (acc, val) => acc + val,
    0
  );
  console.log(`\nTotal Downloads for All Packages: ${totalDownloads}`);
}

getD();
