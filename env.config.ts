export const ENV = {
  BASE_URL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  HEADLESS: false,
  SLOW_MO: Number(process.env.SLOW_MO ?? 2000),
  TIMEOUT: Number(process.env.TIMEOUT ?? 30_000),
 
  CREDENTIALS: {
    username: 'standard_user',
    password:  'secret_sauce',
  },
 
  CHECKOUT: {
    firstName: process.env.FIRST_NAME ?? 'Parveen',
    lastName: process.env.LAST_NAME ?? 'Khan',
    zipCode: process.env.ZIP_CODE ?? '75001',
  },
 
  TAX_RATE: 0.08,
};