import { prisma } from '@/config';
import { Ticket } from '@prisma/client';

async function findAllTicketTypes() {
  return prisma.ticketType.findMany();
}
type CreateTicket = Omit<Ticket, 'id' | 'updatedAt' | 'createdAt'>;

async function createTicket(ticket: CreateTicket) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function findTicketEnrrolmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  findAllTicketTypes,
  findTicketEnrrolmentId,
  createTicket,
};

export default ticketRepository;
