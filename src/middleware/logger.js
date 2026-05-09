import pinoHttp from 'pino-http';
import pretty from 'pino-pretty';

const stream = pretty();

export const logger = pinoHttp({ stream });
