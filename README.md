# academico-usuarios

Microservicio de gestion de usuarios y autenticacion del Sistema de Gestion Academica.

## Rol en la arquitectura

Este servicio es la autoridad de autenticacion para el flujo usado por `academico-gateway`:

- Valida credenciales de usuario.
- Emite `accessToken` y `refreshToken` JWT.
- Valida JWT mediante `POST /api/v1/auth/validate-token-2`.
- Publica la whitelist de rutas publicas mediante `GET /api/v1/whitelist/all`.
- Protege llamadas internas con `USUARIOS_API_KEY`.

## Documentacion transversal

La documentacion canonica del flujo gateway -> usuarios -> JWT -> gateway -> servicio esta en:

- `academico-gateway/docs/architecture/gateway-auth-routing.md`
- `academico-gateway/docs/adr/0001-gateway-auth-jwt-routing.md`

En Azure DevOps, publicar `academico-gateway/docs` como Wiki del proyecto para que esta documentacion quede visible para todos los repositorios participantes.

## Configuracion

Ver [.env.example](.env.example).

Variables principales:

- `PORT`
- `USUARIOS_API_KEY`
- `JWT_SECRET`
- `JWT_DOC_SECRET`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USER`
- `DB_PASSWORD`

## Ejecucion local

```bash
npm install
npm run start:dev
```

## Pruebas

```bash
npm test
```
