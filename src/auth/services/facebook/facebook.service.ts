import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FacebookService {
  private jwksClient = jwks({
    jwksUri: 'https://limited.facebook.com/.well-known/oauth/openid/jwks',
  });

  constructor(private readonly httpService: HttpService) {}

  async validateIosJwt(token: string): Promise<string | null> {
    //** https://developers.facebook.com/docs/facebook-login/limited-login/token/?locale=es_ES#jwks */

    const appId: string | undefined = process.env.FACEBOOK_APP_ID;
    if (!appId) return null;

    try {
      // Decodificar el encabezado para obtener el `kid`
      const decodedHeader: any = jwt.decode(token, { complete: true });
      const kid = decodedHeader.header.kid;

      // Obtener la clave pública
      const key = await this.jwksClient.getSigningKey(kid);
      const publicKey = key.getPublicKey();

      // Verificar la firma del token
      const decodedToken: jwt.JwtPayload | string = jwt.verify(
        token,
        publicKey,
        {
          algorithms: ['RS256'],
        },
      );

      if (typeof decodedToken === 'string') {
        return null;
      }

      const payload = decodedToken as jwt.JwtPayload;

      const email = payload.email;
      if (!email) {
        return null; // No se encontró el email en el token
      }

      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        //Token has expired
        return null;
      }
      if (payload.iss !== 'https://www.facebook.com') {
        //Invalid token issuer
        return null;
      }
      if (payload.aud !== appId) {
        //Invalid token audience
        return null;
      }

      // Token válido
      return email;
    } catch (error) {
      return null;
    }
  }

  // Función para validar el token estándar en Android
  async validateAndroidToken(accessToken: string): Promise<string | null> {
    //** https://developers.facebook.com/docs/graph-api/overview/ */
    try {
      const appId: string | undefined = process.env.FACEBOOK_APP_ID;
      if (!appId) return null;

      const url = `https://graph.facebook.com/me?fields=email&access_token=${accessToken}`;

      const response = await firstValueFrom(this.httpService.get(url));
      const email: string = response.data.email;
      return email;
    } catch (error) {
      return null;
    }
  }
}
