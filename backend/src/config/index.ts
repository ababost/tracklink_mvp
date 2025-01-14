import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3001'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  CLAUDE_API_KEY: z.string(),
  CLAUDE_API_URL: z.string(),
  FRONTEND_URL: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  EMAIL_FROM: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string()
});

const env = envSchema.parse(process.env);

export const config = {
  port: parseInt(env.PORT),
  nodeEnv: env.NODE_ENV,
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
  db: {
    url: env.DATABASE_URL
  },
  claude: {
    apiKey: env.CLAUDE_API_KEY,
    apiUrl: env.CLAUDE_API_URL
  },
  frontend: {
    url: env.FRONTEND_URL
  },
  email: {
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT),
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.EMAIL_FROM
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRE
  }
} as const;
