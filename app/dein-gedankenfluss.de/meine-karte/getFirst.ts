export function getFirst(param: string | string[] | undefined | null) {
  return (Array.isArray(param) ? param[0] : param) || "";
}
