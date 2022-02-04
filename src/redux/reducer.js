const GET_USER = 'GET_USER';
const UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS';
const ADD_USER_ADDRESS = 'ADD_USER_ADDRESS';

const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

const updateUserAddress = (updateFields) => ({
  type: UPDATE_USER_ADDRESS,
  payload: updateFields,
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
    const updatedUserAddress = await axiosService.updateUserAddress(
      userId,
      addressId,
      updateFields
    );
    dispatch(updateUserAddress(updatedUserAddress));
  };

export const thunkAddUserAddress =
  (userId, addressFields) => async (dispatch, getState, axiosService) => {
    const newAddress = await axiosService.addAddressToUser(
      userId,
      addressFields
    );
    dispatch(addUserAddress(newAddress));
  };

export default function (state = {}, { type, payload }) {
  switch (type) {
    case GET_USER:
      return payload;
    case ADD_USER_ADDRESS:
      return { ...state, addresses: [...state.addresses, payload] };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map((adr) =>
          adr.id === payload.id ? payload : adr
        ),
      };
    default:
      return state;
  }
}
