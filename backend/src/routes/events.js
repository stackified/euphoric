import express from 'express'
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js'
import { eventValidation, handleValidationErrors } from '../utils/validation.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/:id', getEvent)
router.post('/', eventValidation, handleValidationErrors, createEvent)
router.put('/:id', eventValidation, handleValidationErrors, updateEvent)
router.delete('/:id', deleteEvent)

export default router

