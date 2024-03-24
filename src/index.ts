import { WEEK_NUM, PACKAGES } from './data';
import DownloadTracker from './controllers/DownloadTrackerController';
import { PackagesType, AllPackagesType } from './type/PackageType';

export { DownloadTracker, PackagesType, AllPackagesType };

async function measurePerformance(callback) {
  const startTime = Date.now();
  await callback();
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: ${executionTime / 1000} seconds`);
}

(async () => {
  await measurePerformance(async () => {
    const tracker = new DownloadTracker(PACKAGES, 1);
    const datas = await tracker.start();
    console.log(datas);
  });
})();
