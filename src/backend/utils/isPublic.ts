export function isPublic(path: string) {
  return path === "/" || path.startsWith("/guest/");
}

