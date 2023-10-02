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
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
});

export type RestConfigSchema = ReturnType<typeof restConfigSchema.getProperties>;
