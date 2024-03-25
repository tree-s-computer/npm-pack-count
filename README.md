# npm-pack-count

## How it works?

We use this URL to get the number of npm package downloads.

`https://api.npmjs.org/downloads/point/${start}:${end}/${packageName}`

## Installation

```bash
npm i @yunseorim1116/npm-pack-count
```

```bash
yarn add @yunseorim1116/npm-pack-count
```

```bash
pnpm i @yunseorim1116/npm-pack-count
```

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

# How to Use

```javascript
(async () => {
  const packages = ['axios', '@types/axios'];
  const numberOfWeeks = 6;

  // The first argument is an array of package names, the second argument is the desired number of weeks
  const tracker = new DownloadTracker(packages, numberOfWeeks);
  const datas = await tracker.start();
  console.log(datas);
})();
```
