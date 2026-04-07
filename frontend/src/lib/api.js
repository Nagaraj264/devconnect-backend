const BASE_URL = import.meta.env.VITE_API_URL;

const api = {
  post: async (endpoint, data) => {
    const isFormData = data instanceof FormData;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Signal transmission failed.');
    return result;
  },

  put: async (endpoint, data) => {
    const isFormData = data instanceof FormData;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: isFormData ? data : JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Update failed.');
    return result;
  },

  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch signal.');
    return result;
  }
};

export default  api;
