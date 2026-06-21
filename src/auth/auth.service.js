import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@Inject(JwtService) jwtService) {
    this.jwtService = jwtService;
  }

  async login(loginRequest) {
    if (!loginRequest || !loginRequest.username || !loginRequest.password) {
      throw new BadRequestException('Usuario y contraseña son requeridos');
    }

    // Decodificar contraseña en Base64
    let password = loginRequest.password;
    try {
      password = Buffer.from(loginRequest.password, 'base64').toString('utf8');
    } catch (error) {
      throw new BadRequestException('Problema con la codificación de la contraseña');
    }

    // Lógica simplificada de validación
    const email = loginRequest.username.toLowerCase();

    // Generar sesión ID aleatoria
    const sessionId = 'SESSION-' + Math.random().toString(36).substring(2, 15).toUpperCase();

    // Estructura del payload JWT según utn-movil-seguridad
    const payload = {
      identifier: '1000000001', // Identificador de prueba (cédula)
      userStudent: 'E1000000001', // Cuenta estudiante mock
      userProfessor: null,
      userAdministrative: null,
      email: email,
      sessionId: sessionId,
      applications: [
        {
          appName: 'PORTAFOLIO_ESTUDIANTE',
          roles: [
            {
              roleName: 'ESTUDIANTE',
              permissions: ['LEER_NOTAS', 'CONSULTAR_HORARIOS', 'DESCARGAR_DOCUMENTOS']
            }
          ]
        }
      ]
    };

    // Firmamos el token de acceso
    const secret = process.env.JWT_SECRET || process.env.JWT_DOC_SECRET || 'utn-secret-key-123';
    const accessToken = this.jwtService.sign(payload, { secret, expiresIn: '2h' });
    const refreshToken = this.jwtService.sign({
      identifier: payload.identifier,
      email: payload.email,
      sessionId: payload.sessionId,
    }, { secret, expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      mfaRequired: false,
      requiresAppUpdate: false
    };
  }

  async validateToken(token) {
    if (!token) {
      return false;
    }
    try {
      const secret = process.env.JWT_SECRET || process.env.JWT_DOC_SECRET || 'utn-secret-key-123';
      await this.jwtService.verifyAsync(token, { secret });
      return true;
    } catch (error) {
      return false;
    }
  }

  async validateToken2(authorization) {
    if (!authorization) {
      return { isValid: false };
    }

    const [type, token] = authorization.split(' ') ?? [];
    const tokenToVerify = type === 'Bearer' ? token : (token || type);

    if (!tokenToVerify) {
      return { isValid: false };
    }

    try {
      const secret = process.env.JWT_SECRET || process.env.JWT_DOC_SECRET || 'utn-secret-key-123';
      const payload = await this.jwtService.verifyAsync(tokenToVerify, { secret });
      
      return {
        isValid: true,
        identifier: payload.identifier,
        email: payload.email,
        sessionId: payload.sessionId
      };
    } catch (error) {
      return { isValid: false };
    }
  }
}
