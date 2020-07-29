import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    let day20Appointments: Promise<Appointment>[] = [];

    const hourStart = 8;

    day20Appointments = Array.from({ length: 10 }, (_, index) => {
      return fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: '123123',
        date: new Date(2020, 4, 20, index + hourStart, 0, 0),
      });
    });

    Promise.all(day20Appointments);

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
