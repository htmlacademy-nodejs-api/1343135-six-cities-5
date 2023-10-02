export interface Config<T> {
  get<K extends keyof T>(name: K): T[K]
}
