# npm-pack-count

`https://api.npmjs.org/downloads/point/${start}:${end}/${packageName}`
You can use that URL to get the number of npm package downloads.

const packages = ['a', 'b']

# Goal

## Basic functionality

1. make it possible to get the number of downloads for multiple packages instead of just one package (ex: packages a, b)
2. show total weekly and monthly package downloads by package. (ex: weekly package downloads of A, weekly package downloads of B)

## option function

3. shows the total weekly and monthly downloads of packages a and b combined.
4. set the default option (one week from yesterday excluding the current date),
   You can also optionally input the desired weekly unit (ex: Monday-Sunday).
5. Shows the total number of downloads for all packages.

# Example for Use
```javascript
(async () => {
  const tracker = new DownloadTracker(PACKAGES, 12);
  //The first argument is an array of package names, the second argument is the desired number of weeks
  const datas = await tracker.start();
  console.log(datas);
})();
