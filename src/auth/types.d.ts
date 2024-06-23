import { Request } from 'express';
import { User } from './auth/user.entity/user.entity'; // Importe seu modelo de usuário

export interface RequestWithUser extends Request {
  user?: User; // Defina o tipo do usuário aqui
}

declare module 'express' {
  interface Request {
    session: Express.Session; // Defina o tipo da sessão aqui
    user?: User; // Defina o tipo do usuário aqui
  }
}
