import { fillGaps, getLastDates, makeHistoryMap } from "../utils";
import { GetTopPlayersUseCase } from "./list-top-players.use-case";
import { getData } from "../../../get-data";
import { RatingHistoryPerf } from "../../../types";
import { resolver } from "../../../resolver";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class GetPlayersCsvUseCase {
  async execute() {
    const window = getLastDates(30);
    const users = await resolver(GetTopPlayersUseCase).execute(50);
    const rows: string[] = [];

    for (let i = 0; i < users.length; i += 10) {
      const batch = users.slice(i, i + 10);
      const batchRows = await Promise.all(
        batch.map(async (u: string) => {
          const profile = await getData<RatingHistoryPerf[]>(
            `/user/${u}/rating-history`
          );
          const historyMap = makeHistoryMap(profile);
          const ratings = fillGaps(historyMap, window);

          return [u, ...ratings].join(",");
        })
      );
      rows.push(...batchRows);
      if (i + 10 < users.length) {
        await sleep(1000);
      }
    }

    const headers = ["username", ...window].join(",");

    return [headers, ...rows].join("\r\n");
  }
}
