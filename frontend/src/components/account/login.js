import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  NoDataTextfields,
  HandleClose,
  fetchUsersSuccess,
  fetchUsersFailure,
  ShowMessage,
} from '../../redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Messages from '../common/Message';
import { Signin, UserData } from '../action/action';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © Demo '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [Username, SetUsername] = React.useState('');
  const [Password, SetPassword] = React.useState('');

  //errors
  const [UsernameError, SetUsernameError] = React.useState('');
  const [PasswordError, SetPasswordError] = React.useState('');

  // Toast Notif
  const open = useSelector((state) => state.user.open);
  const message = useSelector((state) => state.user.message);
  const severity = useSelector((state) => state.user.severity);

  //functions
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (localStorage.getItem('token')) {
        UserData(localStorage.getItem('token'))
          .then((res) => {
            res.data.usertype === 'admin'
              ? props.history.push('/1')
              : props.history.push('/3');
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
    return () => {
      console.log('unmounting Login Page');
      isSubscribed = false;
    };
  }, [props, dispatch]);

  function Submit(event) {
    event.preventDefault();

    if (Username.length !== 0 && Password.length !== 0) {
      Signin(Username, Password)
        .then((res) => {
          console.log(res.data);
          dispatch(fetchUsersSuccess(res.data));
          dispatch(ShowMessage(true, 'Successfully Login', 'success'));

          setTimeout(() => {
            localStorage.setItem('token', res.data.token);
            if (res.data.usertype === 'user') {
              props.history.push('/3');
            } else {
              props.history.push('/1');
            }
          }, 1500);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.response.data.error);
          dispatch(fetchUsersFailure(err.response.data.error, true, 'warning'));
        });
    } else {
      dispatch(NoDataTextfields());
      SetUsernameError(true);
      SetPasswordError(true);
    }
  }

  return (
    <>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign In
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
                value={Username}
                error={UsernameError ? true : false}
                onChange={(e) => {
                  e.target.value
                    ? SetUsernameError(false)
                    : SetUsernameError(true);
                  SetUsername(e.target.value);
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={Password}
                error={PasswordError ? true : false}
                onChange={(e) => {
                  e.target.value
                    ? SetPasswordError(false)
                    : SetPasswordError(true);
                  SetPassword(e.target.value);
                }}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={(e) => Submit(e)}
              >
                Sign In
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      <Messages
        open={open}
        message={message}
        severity={severity}
        handleClose={() => {
          dispatch(HandleClose());
        }}
      />
    </>
  );
}
