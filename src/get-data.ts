const BASE_URL = "https://lichess.org/api";

export const getData = async <T>(url: string): Promise<T> => {
  try {
    const fullUrl = `${BASE_URL}${url}`;

    const res = await fetch(fullUrl, {
      keepalive: false,
      cache: "force-cache",
    });
    if (!res.ok) throw new Error(`Data fetch failed: ${res.status} ${fullUrl}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
};
