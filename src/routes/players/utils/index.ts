import { RatingHistoryPerf } from "../../../types";

export function fillGaps(
  historyMap: Map<string, number>,
  window: string[]
): number[] {
  const res: number[] = [];
  let last = 0;
  for (const [d, r] of Array.from(historyMap.entries()).sort()) {
    if (d <= window[0]) last = r;
  }
  for (const date of window) {
    if (historyMap.has(date)) last = historyMap.get(date)!;
    res.push(last);
  }
  return res;
}

export function getLastDates(days: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    out.push(`${y}-${mm}-${dd}`);
  }
  return out;
}

export const makeHistoryMap = (userProfile: RatingHistoryPerf[]) => {
  const profile = userProfile.find((p) => p.name === "Classical");
  if (!profile) throw new Error(`No history found`);

  const map = new Map<string, number>();
  for (const [y, m, d, r] of profile.points) {
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    map.set(`${y}-${mm}-${dd}`, r);
  }
  return map;
};
