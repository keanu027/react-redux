import axios from 'axios';

export const SubtractionList = async (token) => {
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
      resolve(axios.get(`/api/subtraction`, config));
    }, 1000);
  });
};

export const Register = async (token, firstnum, secondnum) => {
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
      firstnum,
      secondnum,
    });

    console.log(body);

    setTimeout(() => {
      resolve(axios.post(`/api/subtraction`, body, config));
    }, 1000);
  });
};

export const UpdateUserSub = async (token, firstnum, secondnum, id) => {
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
      firstnum,
      secondnum,
      id,
    });

    console.log(body);

    setTimeout(() => {
      resolve(axios.patch(`/api/subtraction`, body, config));
    }, 1000);
  });
};

export const DeleteUserSub = async (token, id) => {
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
      resolve(axios.delete(`/api/subtraction/${id}`, config));
    }, 1000);
  });
};
