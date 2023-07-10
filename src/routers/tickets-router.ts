import { Router } from 'express';
import { createTicket, getTickets, getTicketsTypes } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/tickets/types', getTicketsTypes)
  .get('/tickets', getTickets)
  .post('/tickets', createTicket);

export { ticketsRouter };
