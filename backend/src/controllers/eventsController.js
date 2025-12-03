import pool from '../config/database.js'
import { getCache, setCache, deleteCache, invalidateCachePattern } from '../utils/cache.js'

// Get all events
export const getEvents = async (req, res) => {
  try {
    // Try to get from cache
    const cacheKey = 'events:upcoming'
    const cached = await getCache(cacheKey)
    if (cached) {
      return res.json(cached)
    }

    // Fetch from database using prepared statement
    const [events] = await pool.execute(
      'SELECT * FROM events WHERE date >= CURDATE() ORDER BY date ASC'
    )

    // Cache for 30 minutes
    await setCache(cacheKey, events, 1800)

    res.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}

// Get a single event
export const getEvent = async (req, res) => {
  try {
    const { id } = req.params
    const [events] = await pool.execute('SELECT * FROM events WHERE id = ?', [id])

    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json(events[0])
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({ error: 'Failed to fetch event' })
  }
}

// Create a new event
export const createEvent = async (req, res) => {
  try {
    // Validation handled by middleware
    const { title, date, location, image, description } = req.body

    // Sanitize inputs
    const sanitizedTitle = title.trim().substring(0, 200)
    const sanitizedLocation = location.trim().substring(0, 200)
    const sanitizedDescription = description ? description.trim().substring(0, 2000) : null

    // Use prepared statements
    const [result] = await pool.execute(
      'INSERT INTO events (title, date, location, image, description) VALUES (?, ?, ?, ?, ?)',
      [sanitizedTitle, date, sanitizedLocation, image || null, sanitizedDescription]
    )

    const [newEvent] = await pool.execute('SELECT * FROM events WHERE id = ?', [
      result.insertId,
    ])

    // Invalidate cache
    await invalidateCachePattern('events:*')

    res.status(201).json(newEvent[0])
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({ error: 'Failed to create event' })
  }
}

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const { title, date, location, image, description } = req.body

    // Sanitize inputs
    const sanitizedTitle = title ? title.trim().substring(0, 200) : null
    const sanitizedLocation = location ? location.trim().substring(0, 200) : null
    const sanitizedDescription = description ? description.trim().substring(0, 2000) : null

    // Use prepared statements with parameterized query
    const [result] = await pool.execute(
      'UPDATE events SET title = ?, date = ?, location = ?, image = ?, description = ? WHERE id = ?',
      [sanitizedTitle, date, sanitizedLocation, image || null, sanitizedDescription, parseInt(id, 10)]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const [updatedEvent] = await pool.execute('SELECT * FROM events WHERE id = ?', [parseInt(id, 10)])
    
    // Invalidate cache
    await invalidateCachePattern('events:*')

    res.json(updatedEvent[0])
  } catch (error) {
    console.error('Error updating event:', error)
    res.status(500).json({ error: 'Failed to update event' })
  }
}

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    
    // Use prepared statement with parameterized query
    const [result] = await pool.execute('DELETE FROM events WHERE id = ?', [parseInt(id, 10)])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    // Invalidate cache
    await invalidateCachePattern('events:*')

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({ error: 'Failed to delete event' })
  }
}

