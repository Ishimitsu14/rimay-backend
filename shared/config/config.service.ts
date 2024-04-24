import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService<ConfigScheme extends { [key: string]: any }> {
  private readonly _envConfig: ConfigScheme;
  private readonly _serviceName: string;

  static _toString(value: string) {
    return String(value);
  }

  static _toNumber(value: string): number {
    return Number(value);
  }

  static _toArray(value: string[], type: 'number' | 'string') {
    return value.map((v) => (type === 'number' ? Number(v) : String(v)));
  }

  constructor(serviceName: string) {
    this._envConfig = dotenv.parse(
      fs.readFileSync(path.join(__dirname, '../../.env')),
    );
    this._serviceName = serviceName;
  }

  get(key: keyof ConfigScheme) {
    return this._envConfig[`${this._serviceName}_${key as string}`];
  }
}
