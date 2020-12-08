import axios from 'axios';

export const DivisionList = async (token) => {
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
      resolve(axios.get(`/api/division`, config));
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
      resolve(axios.post(`/api/division`, body, config));
    }, 1000);
  });
};

export const UpdateUserDivide = async (token, firstnum, secondnum, id) => {
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
      resolve(axios.patch(`/api/division`, body, config));
    }, 1000);
  });
};

export const DeleteUserDivide = async (token, id) => {
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
      resolve(axios.delete(`/api/division/${id}`, config));
    }, 1000);
  });
};
