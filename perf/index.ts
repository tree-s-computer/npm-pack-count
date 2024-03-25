import { DownloadTracker } from '../src';

const packages = [
  '@sd-jwt/core',
  // '@sd-jwt/decode',
  // '@sd-jwt/utils',
  // '@sd-jwt/types',
  // '@sd-jwt/sd-jwt-vc',
  // '@sd-jwt/present',
  // '@sd-jwt/hash',
  // '@sd-jwt/crypto-nodejs',
  // '@sd-jwt/crypto-browser',
  // '@hopae/sd-jwt',
];

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
