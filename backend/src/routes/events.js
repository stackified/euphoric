import express from 'express'
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

export default router

