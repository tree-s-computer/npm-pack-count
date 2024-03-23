import { WEEK_NUM, PACKAGES } from './data';
import DownloadTracker from './controllers/DownloadTrackerController';

export default DownloadTracker;

// (async () => {
//   const tracker = new DownloadTracker(PACKAGES, 2);
//   const datas = await tracker.start();
//   console.log(datas);
// })();
