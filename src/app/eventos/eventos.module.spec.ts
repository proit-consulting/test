import { EventosModule } from './eventos.module';

describe('EventosModule', () => {
  let eventosModule: EventosModule;

  beforeEach(() => {
    eventosModule = new EventosModule();
  });

  it('should create an instance', () => {
    expect(eventosModule).toBeTruthy();
  });
});
