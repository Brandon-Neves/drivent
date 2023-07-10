import { TicketStatus, Ticket } from '@prisma/client';
import enrollmentsService from '../enrollments-service';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getTicketTypes() {
  const ticket = await ticketRepository.findAllTicketTypes();
  if (!ticket) throw notFoundError;

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketObject = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  const ticket = await ticketRepository.createTicket(ticketObject);

  return ticket;
}

async function getTicketUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
}

const ticketService = { createTicket, getTicketUserId, getTicketTypes };

export default ticketService;
