import { RestApplication } from './rest/rest.application.js';
import { RestConfig } from './shared/lib/config/rest.config.js';
import { PinoLogger } from './shared/lib/logger/pino.logger.js';

function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);
  const application = new RestApplication(logger, config);
  application.init();
}

bootstrap();
