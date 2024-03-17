import { WEEK_NUM, PACKAGES } from './data';
import DownloadTracker from './controllers/DownloadTrackerController';

const tracker = new DownloadTracker(PACKAGES, WEEK_NUM);
tracker.start();
