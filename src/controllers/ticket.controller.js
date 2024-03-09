// ticket.controller.js
import { ticketDAO } from "../dao/ticket/index.js";

// Controlador para obtener todos los tickets
export const getTickets = async (req, res, next) => {
    try {
        const tickets = await ticketDAO.getTickets(); 
        res.json({ tickets }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

// Controlador para obtener un ticket por su ID
export const getTicketById = async (req, res, next) => {
    try {
        const { ticketId } = req.params; 
        const ticket = await ticketDAO.getTicketById(ticketId); 
        if (!ticket) {
            throw new Error('TICKET NOT FOUND'); 
        }
        res.json({ ticket }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

// Controlador para agregar un nuevo ticket
export const addTicket = async (req, res, next) => {
    try {
        // Lógica para obtener los datos del ticket desde la solicitud (req.body)
        const ticketData = req.body; 

        const newTicket = await ticketDAO.addTicket(ticketData); 
        res.json({ message: 'Successfully add ticket', ticket: newTicket }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

export const deleteTicket = async (req, res, next) => {
    try {
        const { ticketId } = req.params; 
        const deletedTicket = await ticketDAO.deleteTicket(ticketId); 
        if (!deletedTicket) {
            throw new Error('TICKET NOT FOUND'); 
        }
        res.json({ message: 'Successfully delete ticket' }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

