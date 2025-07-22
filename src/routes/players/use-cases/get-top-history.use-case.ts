import { fillGaps, getLastDates, makeHistoryMap } from "../utils";
import { getData } from "../../../get-data";
import { RatingHistoryPerf } from "../../../types";
import { GetTopPlayersUseCase } from "./list-top-players.use-case";
import { resolver } from "../../../resolver";

export class GetTopHistoryUseCase {
  async execute() {
    const topPlayerUsername = (
      await resolver(GetTopPlayersUseCase).execute(1)
    )[0];

    const topPlayerProfile = await getData<RatingHistoryPerf[]>(
      `/user/${topPlayerUsername}/rating-history`
    );

    const historyMap = makeHistoryMap(topPlayerProfile);
    const window = getLastDates(30);

    const ratings = fillGaps(historyMap, window);
    const history: Record<string, number> = {};
    window.forEach((d, i) => (history[d] = ratings[i]));
    return { username: topPlayerUsername, history };
  }
}
