import { Controller, Post, Req, Res, UseGuards, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../local-auth.guard';
import { HttpStatus } from '@nestjs/common'; // Importe HttpStatus corretamente
import { RequestWithUser } from '../types'; // Importe a interface RequestWithUser

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    if (req.user) {
      const userData = {
        id: req.user.id,
        username: req.user.username,
        // Adicione outros campos conforme necessário
      };

      req.session.user = userData;
      res.send('Login bem-sucedido');
    } else {
      res.status(401).send('Falha na autenticação');
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      await this.authService.register(createUserDto);
      res.status(HttpStatus.CREATED).send('Usuário registrado com sucesso');
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Erro ao registrar usuário');
    }
  }
}
