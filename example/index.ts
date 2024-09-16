import DownloadTracker from '../packages/core/controllers/DownloadTrackerController';

const packages = ['@sd-jwt/core'];

const numberOfWeeks = 10;

async function measurePerformance(callback) {
  const startTime = Date.now();
  await callback();
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: ${executionTime / 1000} seconds`);
}

(async () => {
  await measurePerformance(async () => {
    const tracker = new DownloadTracker(packages, numberOfWeeks);
    const datas = await tracker.start();
    console.log(datas);
  });
})();
