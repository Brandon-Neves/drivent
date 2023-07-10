import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';
import { Response, Request } from 'express';
import httpStatus from 'http-status';

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketService.getTicketUserId(userId);
    res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(console.log(error));
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT).send(console.log(error));
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.body;
  const { userId } = req;

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const ticket = await ticketService.createTicket(userId, ticketId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(console.log(error));
  }
}
