import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('reporta el servicio academico-usuarios como saludable', () => {
    const controller = new HealthController();
    const response = controller.health();

    expect(response.status).toBe('healthy');
    expect(response.service).toBe('academico-usuarios');
    expect(response.timestamp).toBeDefined();
    expect(response.uptime).toBeGreaterThanOrEqual(0);
  });
});
