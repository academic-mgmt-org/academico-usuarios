# academico-usuarios

Microservicio de gestion de usuarios del Sistema de Gestion Academica.

## Rol en la arquitectura

Este servicio queda reservado para la gestion del ciclo de vida de usuarios:

- Consulta de usuarios.
- Creacion y actualizacion de usuarios.
- Activacion y desactivacion de usuarios.
- Datos basicos de identidad y perfil.

No implementa login, emision JWT, validacion JWT ni whitelist. Esa responsabilidad pertenece a `academico-login`.

## Documentacion transversal

La documentacion canonica del flujo web -> gateway -> login -> JWT -> gateway -> servicio esta en:

- `academico-gateway/docs/architecture/gateway-auth-routing.md`
- `academico-gateway/docs/adr/0001-gateway-auth-jwt-routing.md`

En Azure DevOps, publicar `academico-gateway/docs` como Wiki del proyecto para que esta documentacion quede visible para todos los repositorios participantes.

## Configuracion

Ver [.env.example](.env.example).

Variables principales:

- `PORT`
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
