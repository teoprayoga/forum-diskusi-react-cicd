const API_BASE_URL = 'https://forum-api.dicoding.dev/v1';

const getAccessToken = () => localStorage.getItem('accessToken');

const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const fetchWithToken = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

const api = {
  async register({ name, email, password }) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.user;
  },

  async login({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.token;
  },

  async getOwnProfile() {
    return fetchWithToken(`${API_BASE_URL}/users/me`);
  },

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.users;
  },

  async getAllThreads() {
    const response = await fetch(`${API_BASE_URL}/threads`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.threads;
  },

  async createThread({ title, body, category = '' }) {
    return fetchWithToken(`${API_BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
  },

  async getThreadDetail(threadId) {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.detailThread;
  },

  async createComment({ threadId, content }) {
    return fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
  },

  async upVoteThread(threadId) {
    return fetchWithToken(`${API_BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
    });
  },

  async downVoteThread(threadId) {
    return fetchWithToken(`${API_BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
    });
  },

  async neutralVoteThread(threadId) {
    return fetchWithToken(`${API_BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
  },

  async upVoteComment({ threadId, commentId }) {
    return fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
    });
  },

  async downVoteComment({ threadId, commentId }) {
    return fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
    });
  },

  async neutralVoteComment({ threadId, commentId }) {
    return fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
    });
  },

  async getLeaderboards() {
    const response = await fetch(`${API_BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.leaderboards;
  },
};

export {
  api,
  getAccessToken,
  putAccessToken,
  removeAccessToken,
};
