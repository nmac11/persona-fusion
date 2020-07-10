export interface GameSettings {
  id?: number;
  name: string;
  values: { [key: string]: boolean };
}
