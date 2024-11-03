import axios from "axios";

const BASE_URL = "http://localhost:8888/api";

export const login = async (identifier, password) => {
  return axios.post(`${BASE_URL}/auth/local`, {
    identifier: identifier,
    password: password,
  });
};

export const register = async (username, email, password) => {
  return axios.post(`${BASE_URL}/auth/local/register`, {
    username: username,
    email: email,
    password: password,
  });
};

export const getLocations = async (cookie) => {
  return axios.get(`${BASE_URL}/locations?populate=devices`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
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
  return axios.get(`${BASE_URL}/locations/${id}?populate=devices`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
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
        Authorization: `Bearer ${cookie}`,
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
  return axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
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