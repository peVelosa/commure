import { Router } from "express";
import { GetTopPlayersUseCase } from "./use-cases/list-top-players.use-case";
import { GetTopHistoryUseCase } from "./use-cases/get-top-history.use-case";
import { GetPlayersCsvUseCase } from "./use-cases/get-players-csv.use-case";
import { resolver } from "../../resolver";

const router = Router();

router.get("/players", async (req, res) => {
  const topPlayers = await resolver(GetTopPlayersUseCase).execute(50);
  return res.json(topPlayers);
});

router.get("/players/top/history", async (req, res) => {
  const history = await resolver(GetTopHistoryUseCase).execute();
  return res.json(history);
});

router.get("/players/csv", async (req, res) => {
  const csv = await resolver(GetPlayersCsvUseCase).execute();

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="ratings.csv"`);

  return res.send(csv);
});

export { router as playersRouter };
