import axios from 'axios';

export const MultiplicationList = async (token) => {
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
      resolve(axios.get(`/api/multiplication`, config));
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
      resolve(axios.post(`/api/multiplication`, body, config));
    }, 1000);
  });
};

export const UpdateUserMulti = async (token, firstnum, secondnum, id) => {
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
      resolve(axios.patch(`/api/multiplication`, body, config));
    }, 1000);
  });
};

export const DeleteUserMulti = async (token, id) => {
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
      resolve(axios.delete(`/api/multiplication/${id}`, config));
    }, 1000);
  });
};
