export const moveRequestsKey = (page: number, pageSize: number) =>
  ["moveRequests", page, pageSize] as const;
