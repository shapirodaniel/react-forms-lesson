const GET_USER = 'GET_USER';
const UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS';
const ADD_USER_ADDRESS = 'ADD_USER_ADDRESS';

const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

const addUserAddress = (address) => ({
  type: ADD_USER_ADDRESS,
  payload: address,
});

export const thunkGetUser =
  (userId) => async (dispatch, getState, axiosService) => {
    const user = await axiosService.getUserAndAddresses(userId);
    dispatch(getUser(user));
  };

export const thunkUpdateUserAddress =
  (userId, addressId, updateFields) =>
  async (dispatch, getState, axiosService) => {
    const updatedUserInstanceWithAddresses =
      await axiosService.updateUserAddress(userId, addressId, updateFields);
    dispatch(getUser(updatedUserInstanceWithAddresses));
  };

export const thunkAddUserAddress =
  (userId, addressFields) => async (dispatch, getState, axiosService) => {
    const newAddress = await axiosService.addAddressToUser(
      userId,
      addressFields
    );
    dispatch(addUserAddress(newAddress));
  };

const initState = { id: null, username: null, addresses: [] };

export default function (state = initState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return payload;
    case ADD_USER_ADDRESS:
      return { ...state, addresses: [...state.addresses, payload] };
    default:
      return state;
  }
}
