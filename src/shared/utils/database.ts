export function getMongoUrl({username, password, host, port, databaseName}: { username: string;
  password: string;
  host: string;
  port: string;
  databaseName: string; }) {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
