export class OutputView {
  static printTotalDownloads(weekTotalNums) {
    console.log('┌───────────────────────────────┬─────────────────┐');
    console.log('│ Package Name                  │ Total Downloads │');
    console.log('├───────────────────────────────┼─────────────────┤');

    weekTotalNums.forEach(({ total, packName }) => {
      console.log(
        `│ ${packName.padEnd(30)} │ ${total.toLocaleString().padStart(15)} │`,
      );
    });

    console.log('└───────────────────────────────┴─────────────────┘');
  }

  static printWeekPackageName(weekPacks) {
    console.log(
      '┌───────────────────────────────┬─────────────────────────────────────┬─────────────────────────────────────┐',
    );
    console.log(
      '│ Package Name                  │ Week                                │ Downloads                           │',
    );
    console.log(
      '├───────────────────────────────┼─────────────────────────────────────┼─────────────────────────────────────┤',
    );

    weekPacks.forEach((weekPack, i) => {
      console.log(
        `│ ${weekPack[i].packName.padEnd(30)} │`.slice(0, 32) +
          ' '.repeat(15) +
          '│',
      );
      weekPack.forEach(({ downloads, start, end }, index) => {
        console.log(
          `│                               │ Week ${
            index + 1
          } (${start} - ${end}) │ ${downloads.toLocaleString().padStart(35)} │`,
        );
      });
      console.log(
        '├───────────────────────────────┼─────────────────────────────────────┼─────────────────────────────────────┤',
      );
    });

    console.log(
      '└───────────────────────────────┴─────────────────────────────────────┴─────────────────────────────────────┘',
    );
  }
}
