import axios from "axios";

const BASE_URL = "http://localhost:8081";

export const login = async (identifier, password) => {
  return axios.post(`${BASE_URL}/login`, {
    identifier: identifier,
    password: password,
  });
};

export const register = async (username, email, password) => {
  return axios.post(`${BASE_URL}/register`, {
    username: username,
    email: email,
    password: password,
  });
};

export const getLocations = async (cookie) => {
  return axios.get(`${BASE_URL}/locations`, {
    headers: {
      Authorization: `${cookie}`,
    },
  });
};

export const addLocation = async (name, cookie, id) => {
  return axios.post(
    `${BASE_URL}/locations`,
    {
      data: {
        name: name,
        devices: [],
        user: id,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );
};

export const deleteLocation = async (id, cookie) => {
  return axios.delete(`${BASE_URL}/locations/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
};

export const getDevices = async (id, cookie) => {
  return axios.get(`${BASE_URL}/locations/${id}`, {
    headers: {
      Authorization: `${cookie}`,
    },
  });
};

export const addDevice = async (name, locationId, cookie) => {
  return axios.post(
    `${BASE_URL}/devices`,
    {
      data: {
        name: name,
        location: locationId,
        active: true,
      },
    },
    {
      headers: {
        Authorization: `${cookie}`,
      },
    }
  );
};

export const deleteDevice = async (id, cookie) => {
  return axios.delete(`${BASE_URL}/devices/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
};


export const getPersonalData = async (cookie) => {
  return axios.get(`${BASE_URL}/user`, {
    headers: {
      Authorization: `${cookie}`,
    },
  });
};

export const changePassword = async (oldPassword,password, cookie) => {
  return axios.post(
    `${BASE_URL}/auth/change-password`,
    {
      password: password,
      currentPassword: oldPassword,
      passwordConfirmation: password,
    },
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );
}