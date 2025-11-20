export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON format' })
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
}

export const notFound = (req, res) => {
  res.status(404).json({ error: 'Route not found' })
}

