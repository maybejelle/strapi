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
  const response = await axios.get(`${BASE_URL}/user`, {
    headers: {
      Authorization: `${cookie}`,
    },
  });
  response.data.families = getFamilies(response.data);
  return response;
};

export const getFamilyData = async (cookie,id) => {
  const APIResponse = await axios.get(`${BASE_URL}/family/${id}`, {
    headers: {
      Authorization: `${cookie}`,
    },
  });
  const response = {
    familyId : APIResponse.data.documentId,
    familyName : APIResponse.data.name,
    owner : APIResponse.data.owner.username,
    members : APIResponse.data.members.map(member => member.username),
  };
  return response;
};


function getFamilies(data) {
  let families = [];
  if(data.family_owner !== null) {
    families.push(data.family_owner);
  }
  if(data.families_member.length !== 0) {
    families.push(...data.families_member);
  }
  return families;
}

export const getLogs = async (cookie) => {
  return axios.get(`${BASE_URL}/logs`, {
    headers: {
      Authorization: `${cookie}`,
    },
  });
};