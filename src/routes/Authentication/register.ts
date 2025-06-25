import { z } from 'zod';
import BCrypt from '../../utils/bcrypt';
import prisma from '../../config/prisma-client';
import SafeCallback from '../../utils/safe-callback';
import AppTextDefault from '../DTunnel/AppText/defaults';
import csrfProtection from '../../middlewares/csrf-protection';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

const registerSchema = z.object({
  username: z.string().min(6).max(20),
  password: z.string().min(6).max(20),
  email: z.string().email(),
  access_password: z.string(),
});

export default {
  url: '/register',
  method: 'POST',
  onRequest: [csrfProtection],
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const ACCESS_PASSWORD = "tTv5evdYvv4634"; // Altere esta senha para a sua senha de acesso
    const { username, email, password, access_password } = registerSchema.parse(req.body);

    if (access_password !== ACCESS_PASSWORD) {
      reply.status(403);
      reply.header("csrf-token", req.csrfProtection.generateCsrf());
      throw new Error("Senha de acesso incorreta");
    }

    const usernameAlreadyExists = await SafeCallback(() =>
      prisma.user.findFirst({
        where: { username },
      })
    );

    if (usernameAlreadyExists) {
      reply.status(409);
      reply.header('csrf-token', req.csrfProtection.generateCsrf());
      throw new Error('Nome de usuário já está sendo utilizado');
    }

    const emailAlreadyExists = await SafeCallback(() =>
      prisma.user.findFirst({
        where: { email },
      })
    );

    if (emailAlreadyExists) {
      reply.status(409);
      reply.header('csrf-token', req.csrfProtection.generateCsrf());
      throw new Error('Email já cadastrado');
    }

    const passwordHash = BCrypt.hash(password);

    const user = await SafeCallback(() =>
      prisma.user.create({
        data: {
          email,
          username,
          password: passwordHash,
        },
      })
    );

    if (!user) {
      throw new Error('Não foi possível criar usuário');
    }

    for await (const AppText of AppTextDefault) {
      await SafeCallback(() =>
        prisma.appText.create({
          data: {
            user_id: user.id,
            label: AppText.label,
            text: AppText.text,
          },
        })
      );
    }

    reply.status(201).send();
  },
} as RouteOptions;
