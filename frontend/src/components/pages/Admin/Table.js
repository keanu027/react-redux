import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Loader from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';

import Messages from '../../common/Message';

import {
  AccountList,
  Register,
  UpdateUser,
  DeleteUser,
} from '../../action/action';

import {
  HandleClose,
  fetchUsersRequest,
  fetchUsersFailure,
  ShowMessage,
  FetchUsersListSuccess,
} from '../../../redux';

export default function TableList() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const data = useSelector((state) => state.user.data);

  // Toast Notif
  const open = useSelector((state) => state.user.open);
  const message = useSelector((state) => state.user.message);
  const severity = useSelector((state) => state.user.severity);

  const [state] = React.useState({
    columns: [
      {
        title: 'Firstname',
        field: 'firstname',
        validate: (rowData) =>
          rowData.firstname === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
      {
        title: 'Middle Name',
        field: 'middlename',
        validate: (rowData) =>
          rowData.middlename === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
      {
        title: 'Last Name',
        field: 'lastname',
        validate: (rowData) =>
          rowData.lastname === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
      {
        title: 'Email Address',
        field: 'email',
        validate: (rowData) =>
          rowData.email === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
      {
        title: 'Type',
        field: 'usertype',
        lookup: { admin: 'admin', user: 'user' },
        validate: (rowData) =>
          rowData.usertype === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
      {
        title: 'Username',
        field: 'username',
        validate: (rowData) =>
          rowData.username === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
      {
        title: 'Password',
        field: 'password',
        validate: (rowData) =>
          rowData.password === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
    ],
    data: [],
  });

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      AccountList(localStorage.getItem('token'))
        .then((res) => {
          console.log('Already Load the data');
          console.log(res.data);
          dispatch(FetchUsersListSuccess(res.data));
          dispatch(fetchUsersRequest());
        })
        .catch((err) => {
          console.log(err);
          dispatch(fetchUsersFailure(err.response.data.error, true, 'warning'));
        });
    }
    return () => {
      console.log('unmounting Account List Page');
      isSubscribed = false;
    };
  }, [dispatch]);

  function AddRow(arg) {
    console.log(arg);
    Register(
      arg.username,
      arg.email,
      arg.password,
      arg.firstname,
      arg.middlename,
      arg.lastname,
      arg.usertype
    )
      .then((res) => {
        console.log('Successfully Added');
        console.log(res.data);

        let messageinfo = `Successfully Added!`;

        dispatch(ShowMessage(true, messageinfo, 'success'));

        const newdata = [...data];
        newdata.push({
          id: res.data.id,
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          firstname: res.data.firstname,
          middlename: res.data.middlename,
          lastname: res.data.lastname,
          usertype: res.data.usertype,
        });

        console.log(newdata);

        dispatch(FetchUsersListSuccess(newdata));
      })
      .catch((err) => {
        console.log(err.response.data.error ? 'true' : 'false');

        let errormessage = err.response.data.error
          ? err.response.data.error
          : 'Incorrect Credentials';

        dispatch(fetchUsersFailure(errormessage, true, 'warning'));
      });
  }

  function UpdateRow(newarg, oldarg) {
    console.log(newarg);
    UpdateUser(
      localStorage.getItem('token'),
      newarg.username,
      newarg.email,
      newarg.password,
      newarg.firstname,
      newarg.middlename,
      newarg.lastname,
      newarg.usertype,
      newarg.id
    )
      .then((res) => {
        console.log('Successfully Updated');
        console.log(res);

        let messageinfo = `Successfully Updated!`;

        dispatch(ShowMessage(true, messageinfo, 'success'));

        if (oldarg) {
          const newdata = [...data];
          if (res.data[0].usertype === 'user') {
            const updateddata = {
              id: res.data[0].id,
              username: res.data[0].username,
              email: res.data[0].email,
              password: res.data[0].password,
              firstname: res.data[0].firstname,
              middlename: res.data[0].middlename,
              lastname: res.data[0].lastname,
              usertype: res.data[0].usertype,
            };

            newdata[newdata.indexOf(oldarg)] = updateddata;
          } else if (res.data[0].usertype === 'admin') {
            newdata.splice(newdata.indexOf(oldarg), 1);
          }
          newdata.sort(function (a, b) {
            return a.id - b.id;
          });

          console.log(newdata);

          dispatch(FetchUsersListSuccess(newdata));
        }
      })
      .catch((err) => {
        console.log(err.response.data.error ? 'true' : 'false');
        let errormessage = err.response.data.error
          ? err.response.data.error
          : 'Incorrect Credentials';

        dispatch(fetchUsersFailure(errormessage, true, 'warning'));
      });
  }

  function DeleteRow(arg) {
    console.log(arg);
    DeleteUser(localStorage.getItem('token'), arg.id)
      .then((res) => {
        console.log('Successfully Deleted');
        console.log(res);

        let messageinfo = `Successfully Deleted!`;

        dispatch(ShowMessage(true, messageinfo, 'success'));

        const newdata = [...data];
        newdata.splice(newdata.indexOf(arg), 1);

        newdata.sort(function (a, b) {
          return a.id - b.id;
        });

        console.log(newdata);

        dispatch(FetchUsersListSuccess(newdata));
      })
      .catch((err) => {
        console.log(err.response.data.error ? 'true' : 'false');

        let errormessage = err.response.data.error
          ? err.response.data.error
          : 'Incorrect Credentials';

        dispatch(fetchUsersFailure(errormessage, true, 'warning'));
      });
  }

  return (
    <React.Fragment>
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            height: '50vh',
          }}
        >
          <Loader
            type='Grid'
            color='#529A96'
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      ) : (
        <MaterialTable
          title='Account List'
          columns={state.columns}
          data={data}
          options={{
            exportButton: true,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                AddRow(newData);
                setTimeout(() => {
                  resolve();
                }, 3800);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                UpdateRow(newData, oldData);
                setTimeout(() => {
                  resolve();
                }, 2000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                DeleteRow(oldData);
                setTimeout(() => {
                  resolve();
                }, 1500);
              }),
          }}
        />
      )}
      <Messages
        open={open}
        message={message}
        severity={severity}
        handleClose={() => {
          // setopen(false);
          setTimeout(() => {
            dispatch(HandleClose());
          }, 500);
        }}
      />
    </React.Fragment>
  );
}
