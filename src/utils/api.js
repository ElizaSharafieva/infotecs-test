async function api(endpoint, options = {}) {
  const { body } = options
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    headers: {
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(endpoint, config)
    const data = await response.json()

    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message)
  }
}

api.get = function (endpoint) {
  return api(endpoint)
}

api.post = function (endpoint, body) {
  return api(endpoint, { body })
}

export default api