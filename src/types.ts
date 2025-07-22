export type LeaderboardEntry = { username: string };
export type RatingHistoryPerf = {
  name: string;
  points: [number, number, number, number][]; // [year, month, day, points]
};

enum Title {
  GM = "GM",
  WGM = "WGM",
  IM = "IM",
  WIM = "WIM",
  FM = "FM",
  WFM = "WFM",
  NM = "NM",
  CM = "CM",
  WCM = "WCM",
  WNM = "WNM",
  LM = "LM",
  BOT = "BOT",
}

export type TopPlayer = {
  users: {
    id: string;
    username: string;
    perfs?: any;
    title?: Title;
    patron?: boolean;
    online?: boolean;
  }[];
};
