export const normalizeRepoUrl = (value: string) => {
  const url = new URL(value.trim());

  url.hostname = url.hostname.toLowerCase();
  url.pathname = url.pathname.replace(/\/+$/, "").replace(/\.git$/i, "");

  return url.toString().replace(/\/$/, "");
};
