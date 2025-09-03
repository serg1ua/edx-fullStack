import 'dotenv/config';

export enum CarApiEnvironment {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'production',
}

type Configuration = {
  NODE_ENV: string;
  PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
};

export default (): Configuration => ({
  NODE_ENV: process.env.NODE_ENV || CarApiEnvironment.DEV,
  PORT: Number(process.env.PORT || 3000),

  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT || 5432),
  POSTGRES_USER: process.env.POSTGRES_USER || '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
  POSTGRES_DB: process.env.POSTGRES_DB || '',
});
