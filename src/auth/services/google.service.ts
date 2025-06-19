import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleService {
  async validateToken(token: string): Promise<string | null> {
    const client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
    });

    const ticket = await client.verifyIdToken({
      idToken: token,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    if (!payload) {
      return null;
    }

    const email = payload.email;

    if (!email) {
      return null;
    }

    return email;
  }
}
