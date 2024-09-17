import DownloadTracker from '@yunseorim1116/core';

(async () => {
  const packages = ['axios', '@types/axios'];
  const numberOfWeeks = 6;

  // The first argument is an array of package names, the second argument is the desired number of weeks
  const tracker = new DownloadTracker(packages, numberOfWeeks);
  const datas = await tracker.start();
  console.log(datas);
})();
