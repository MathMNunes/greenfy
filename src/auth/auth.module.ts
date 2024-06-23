// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controller/auth.controller';
import { User } from './user.entity/user.entity';
import { UsersService } from './service/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Importa a entidade User do TypeORM
    PassportModule, // Importa o PassportModule para autenticação
    JwtModule.register({
      secret: 'SECRET_KEY', // Chave secreta para assinatura do JWT (mudar em produção)
      signOptions: { expiresIn: '60m' }, // Opções de assinatura do JWT
    }),
  ],
  providers: [
    AuthService, // Serviço de autenticação
    UsersService, // Serviço de usuários
    LocalStrategy, // Estratégia de autenticação local
    JwtStrategy, // Estratégia de autenticação JWT
  ],
  controllers: [AuthController], // Controladores do módulo
})
export class AuthModule {}
