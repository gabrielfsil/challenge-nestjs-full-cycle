import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from '@app/core/events/events.service';
import { AuthGuard } from '@app/core/auth/auth.guard';
import { PrismaModule } from '@app/core/prisma/prisma.module';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [EventsController],
      providers: [EventsService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an event', async () => {
    const createEventRequest = {
      name: 'Event name',
      date: '2024-06-24',
      description: 'Event description',
      price: 100,
    };

    const event = await controller.create(createEventRequest);

    expect(event).toEqual({
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      date: new Date(createEventRequest.date),
      name: createEventRequest.name,
      description: createEventRequest.description,
      price: createEventRequest.price,
    });
  });
});
