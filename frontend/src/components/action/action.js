import axios from 'axios';

export const Signin = async (username, password) => {
  return new Promise((resolve) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // request body object
    const body = JSON.stringify({ username, password });
    console.log(body);
    setTimeout(() => {
      resolve(axios.post(`/api/login`, body, config));
    }, 1000);
  });
};

export const UserData = async (token) => {
  return new Promise((resolve) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers['Authorization'] = `token ${token}`;
    }

    setTimeout(() => {
      resolve(axios.get(`/api/profile`, config));
    }, 1000);
  });
};

export const AccountList = async (token) => {
  return new Promise((resolve) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers['Authorization'] = `token ${token}`;
    }

    setTimeout(() => {
      resolve(axios.get(`/api/account`, config));
    }, 1000);
  });
};

export const Register = async (
  username,
  email,
  password,
  firstname,
  middlename,
  lastname,
  usertype
) => {
  return new Promise((resolve) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // request body object
    const body = JSON.stringify({
      username,
      email,
      password,
      firstname,
      middlename,
      lastname,
      usertype,
    });
    console.log(body);
    setTimeout(() => {
      resolve(axios.post(`/api/register`, body, config));
    }, 1000);
  });
};

export const UpdateUser = async (
  token,
  username,
  email,
  password,
  firstname,
  middlename,
  lastname,
  usertype,
  id
) => {
  return new Promise((resolve) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers['Authorization'] = `token ${token}`;
    }

    // request body object
    const body = JSON.stringify({
      username,
      email,
      password,
      firstname,
      middlename,
      lastname,
      usertype,
      id,
    });
    console.log(body);

    setTimeout(() => {
      resolve(axios.patch(`/api/account`, body, config));
    }, 1000);
  });
};

export const DeleteUser = async (token, id) => {
  return new Promise((resolve) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers['Authorization'] = `token ${token}`;
    }

    setTimeout(() => {
      resolve(axios.delete(`/api/account/${id}`, config));
    }, 1000);
  });
};
