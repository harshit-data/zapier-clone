import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    id?: int; // Add your custom property here
  }
}
