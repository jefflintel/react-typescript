export async function get(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("oh no :( suspicous lack of data");
  }

  const data = await response.json() as unknown;
  return data;
}
