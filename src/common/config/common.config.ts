import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  admin: {
    key: process.env.ADMIN_KEY,
  },
}));
