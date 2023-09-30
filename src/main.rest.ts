import { RestApplication } from './rest/rest.application.js';
import { PinoLogger } from './shared/lib/logger/pino.logger.js';

function bootstrap() {
  const logger = new PinoLogger();
  const application = new RestApplication(logger);
  application.init();
}

bootstrap();
