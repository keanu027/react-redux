import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MaterialTable from 'material-table';
import Loader from 'react-loader-spinner';
import Typography from '@material-ui/core/Typography';

import Messages from '../../common/Message';
import {
  DivisionList,
  Register,
  UpdateUserDivide,
  DeleteUserDivide,
} from '../../action/division';

import {
  HandleClose,
  ShowMessage,
  fetchDivideRequest,
  fetchDivideFailure,
  FetchDivideListSuccess,
} from '../../../redux';

export default function Division(props) {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.division.loading);
  const data = useSelector((state) => state.division.data);
  const grandtotal = useSelector((state) => state.division.grandtotal);
  // Toast Notif
  const open = useSelector((state) => state.user.open);
  const message = useSelector((state) => state.user.message);
  const severity = useSelector((state) => state.user.severity);

  const [state] = React.useState({
    columns: [
      {
        title: 'Number X',
        field: 'firstnum',
        validate: (rowData) =>
          rowData.firstnum === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
      {
        title: 'Number Y',
        field: 'secondnum',
        validate: (rowData) =>
          rowData.secondnum === '' || rowData.secondnum === 0
            ? {
                isValid: false,
                helperText:
                  rowData.secondnum === 0
                    ? 'Cant Divide By Zero'
                    : 'Required Field',
              }
            : true,
      },
      {
        title: 'Quotient',
        field: 'total',
        validate: (rowData) =>
          rowData.total === ''
            ? { isValid: false, helperText: 'Required Field' }
            : true,
      },
    ],
    data: [],
  });

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      DivisionList(localStorage.getItem('token'))
        .then((res) => {
          console.log('Loading Division Data...');
          console.log(res.data);
          let total = 0;
          if (res.data.length > 0) {
            total = res.data
              .map((item) => item.total)
              .reduce((prev, next) => prev + next);
          }
          dispatch(FetchDivideListSuccess(res.data, total));

          dispatch(fetchDivideRequest());
        })
        .catch((err) => {
          console.log(err);
          dispatch(
            fetchDivideFailure(err.response.data.error, true, 'warning')
          );
        });
    }

    return () => {
      console.log('unmounting Division Page');
      isSubscribed = false;
    };
  }, [dispatch]);

  function AddRow(arg) {
    console.log(arg);
    let count = 0;
    if (parseFloat(arg.secondnum) <= 0) {
      let messageinfo = `Can't Divide By Zero`;
      dispatch(ShowMessage(true, messageinfo, 'warning'));
    } else {
      Register(localStorage.getItem('token'), arg.firstnum, arg.secondnum)
        .then((res) => {
          console.log('Successfully Added');
          console.log(res);
          let messageinfo = `Successfully Added!`;

          dispatch(ShowMessage(true, messageinfo, 'success'));

          count = parseFloat(arg.firstnum) / parseFloat(arg.secondnum);
          count = parseFloat(count) + parseFloat(grandtotal);

          const newdata = [...data];
          newdata.push({
            firstnum: res.data.firstnum,
            secondnum: res.data.secondnum,
            total: res.data.total,
            userId: res.data.userId,
            id: res.data.id,
          });
          console.log(newdata);

          dispatch(FetchDivideListSuccess(newdata, count));
        })
        .catch((err) => {
          console.log(err.response.data.error ? 'true' : 'false');
          let errormessage = err.response.data.error
            ? err.response.data.error
            : 'Incorrect Credentials';

          dispatch(fetchDivideFailure(errormessage, true, 'warning'));
        });
    }
  }

  function UpdateRow(newarg, oldarg) {
    console.log(newarg);
    let count = 0;
    if (parseFloat(newarg.secondnum) <= 0) {
      let messageinfo = `Can't Divide By Zero`;
      dispatch(ShowMessage(true, messageinfo, 'warning'));
    } else {
      UpdateUserDivide(
        localStorage.getItem('token'),
        newarg.firstnum,
        newarg.secondnum,
        newarg.id
      )
        .then((res) => {
          console.log('Successfully Updated');
          console.log(res);
          let messageinfo = `Successfully Updated!`;

          dispatch(ShowMessage(true, messageinfo, 'success'));

          if (oldarg) {
            count = parseFloat(oldarg.total) - parseFloat(res.data[0].total);
            count = parseFloat(grandtotal) - parseFloat(count);

            const newdata = [...data];
            const updateddata = {
              firstnum: res.data[0].firstnum,
              secondnum: res.data[0].secondnum,
              total: res.data[0].total,
              userId: res.data[0].userId,
              id: res.data[0].id,
            };
            newdata[newdata.indexOf(oldarg)] = updateddata;

            newdata.sort(function (a, b) {
              return a.id - b.id;
            });
            console.log(newdata);

            dispatch(FetchDivideListSuccess(newdata, count));
          }
        })
        .catch((err) => {
          console.log(err.response.data.error ? 'true' : 'false');
          let errormessage = err.response.data.error
            ? err.response.data.error
            : 'Incorrect Credentials';

          dispatch(fetchDivideFailure(errormessage, true, 'warning'));
        });
    }
  }

  function DeleteRow(arg) {
    console.log(arg);
    let count = 0;
    DeleteUserDivide(localStorage.getItem('token'), arg.id)
      .then((res) => {
        console.log('Successfully Deleted');
        console.log(res);
        let messageinfo = `Successfully Deleted!`;

        dispatch(ShowMessage(true, messageinfo, 'success'));

        console.log(arg.total);
        console.log(grandtotal);
        count = parseFloat(grandtotal) - parseFloat(arg.total);

        const newdata = [...data];
        newdata.splice(newdata.indexOf(arg), 1);

        newdata.sort(function (a, b) {
          return a.id - b.id;
        });
        console.log(newdata);

        dispatch(FetchDivideListSuccess(newdata, count));
      })
      .catch((err) => {
        console.log(err.response.data.error ? 'true' : 'false');
        let errormessage = err.response.data.error
          ? err.response.data.error
          : 'Incorrect Credentials';

        dispatch(fetchDivideFailure(errormessage, true, 'warning'));
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
        <>
          <MaterialTable
            title='Division'
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
          <Typography component='h1' variant='h6' color='inherit' noWrap>
            Grand Total : {grandtotal}
          </Typography>
        </>
      )}
      <Messages
        open={open}
        message={message}
        severity={severity}
        handleClose={() => {
          setTimeout(() => {
            dispatch(HandleClose());
          }, 500);
        }}
      />
    </React.Fragment>
  );
}
