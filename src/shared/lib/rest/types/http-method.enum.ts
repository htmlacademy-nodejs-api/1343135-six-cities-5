export const HttpMethod = {
  Get: 'get',
  Post: 'post',
  Delete: 'delete',
  Patch: 'patch',
  Put: 'put',
} as const;

export type HttpMethodValue = typeof HttpMethod[keyof typeof HttpMethod]
