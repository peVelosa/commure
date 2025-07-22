import { TopPlayer } from "../../../types";
import { getData } from "../../../get-data";

export class GetTopPlayersUseCase {
  async execute(count: number) {
    const data = await getData<TopPlayer>(`/player/top/${count}/classical`);
    const players = data.users.map((e) => e.username);

    return players;
  }
}
