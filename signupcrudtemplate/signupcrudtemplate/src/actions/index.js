import {
  deleteData,
  editData,
  getData,
  postData,
  encrypt,
  validatePassword,
} from '../service';

export const getStudentData = () => async (dispatch) => {
  const { data } = await getData('student');
  dispatch({
    type: 'GET_STUDENT_DATA',
    payload: data,
  });
};

export const postStudentData = (data) => async (dispatch) => {
  await postData('student', data);
  dispatch(getStudentData());
};

export const editStudentData = (id) => async (dispatch) => {
  const { data } = await getData(`student/${id}`);
  dispatch({
    type: 'EDIT_STUDENT_DATA',
    payload: data,
  });
};

export const edittedStudentData = (data, id) => async (dispatch) => {
  await editData(`student/${id}`, data);
  dispatch(getStudentData());
};

export const deleteStudentData = (id) => async (dispatch) => {
  await deleteData(`student/${id}`);
  dispatch(getStudentData());
};

export const viewStudentData = (id) => async (dispatch) => {
  const { data } = await getData(`student/${id}`);
  // console.log(data);
  dispatch({
    type: 'VIEW_STUDENT_DATA',
    payload: data,
  });
};

// signUp

export const signUpAction = (credentials, navigate) => async (dispatch) => {
  const { data } = await getData('users');
  const user = data.find((d) => d.email === credentials.email);
  if (user) {
    alert('user already exits');
  } else {
    let { phoneNumber, ...restValues } = credentials;
    phoneNumber = encrypt(phoneNumber);
    restValues = { ...restValues, phoneNumber };
    await postData('users', restValues);
    navigate();
  }
};

// login

export const loginInAction = (credentials, navigate) => async (dispatch) => {
  const { data } = await getData('users');
  const user = data.find((d) => d.email === credentials.email);
  if (!user) {
    alert('user doesnt exist');
  } else {
    if (validatePassword(user.phoneNumber, credentials.phoneNumber)) {
      sessionStorage.setItem(
        'user',
        JSON.stringify({ user: user.email, status: true })
      );
      dispatch({ type: 'LOGIN', payload: { user: user.email, status: true } });
      navigate();
    }
  }
};

// logout

export const logOut = () => async (dispatch) => {
  await sessionStorage.removeItem('user');
  dispatch({ type: 'LOGIN', payload: null });
};
