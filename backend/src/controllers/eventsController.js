import pool from '../config/database.js'

// Get all events
export const getEvents = async (req, res) => {
  try {
    const [events] = await pool.execute(
      'SELECT * FROM events WHERE date >= CURDATE() ORDER BY date ASC'
    )
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
    const { title, date, location, image, description } = req.body

    // Validation
    if (!title || !date || !location) {
      return res.status(400).json({ error: 'Title, date, and location are required' })
    }

    const [result] = await pool.execute(
      'INSERT INTO events (title, date, location, image, description) VALUES (?, ?, ?, ?, ?)',
      [title, date, location, image || null, description || null]
    )

    const [newEvent] = await pool.execute('SELECT * FROM events WHERE id = ?', [
      result.insertId,
    ])

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

    const [result] = await pool.execute(
      'UPDATE events SET title = ?, date = ?, location = ?, image = ?, description = ? WHERE id = ?',
      [title, date, location, image || null, description || null, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const [updatedEvent] = await pool.execute('SELECT * FROM events WHERE id = ?', [id])
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
    const [result] = await pool.execute('DELETE FROM events WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({ error: 'Failed to delete event' })
  }
}

