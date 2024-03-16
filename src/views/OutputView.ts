export class OutputView {
  static printWeekPackageName(weekPacks) {
    weekPacks.forEach((weekPack, i) => {
      console.log(`\nPackage Name: ${weekPack[i].packName}`);
      weekPack.forEach(({ downloads }, index) => {
        console.log(`Week ${index + 1}: ${downloads}`);
      });
      console.log("------------------");
    });
  }
}
