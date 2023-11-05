import convict from 'convict';
import formats from 'convict-format-with-validator';

convict.addFormats(formats);

export const restConfigSchema = convict({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 3000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: ''
  },
  DB_USERNAME: {
    doc: 'Database server username',
    format: String,
    env: 'DB_USERNAME',
    default: ''
  },
  DB_PASSWORD: {
    doc: 'Database server password',
    format: String,
    env: 'DB_PASSWORD',
    default: ''
  },
  DB_HOST: {
    doc: 'Database server hostname',
    format: String,
    env: 'DB_HOST',
    default: ''
  },
  DB_PORT: {
    doc: 'Database server port',
    format: 'port',
    env: 'DB_PORT',
    default: ''
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
  UPLOAD_DIR: {
    doc: 'Upload directory path',
    format: String,
    env: 'UPLOAD_DIR',
    default: '',
  },
  JWT_SECRET: {
    doc: 'JWT secret',
    format: String,
    env: 'JWT_SECRET',
    default: '',
  },
});

export type RestConfigSchema = ReturnType<typeof restConfigSchema.getProperties>;
