import axios from 'axios';

class AxiosService {
  async getUserAndAddresses(userId) {
    const { data: userAndAddresses } = await axios.get(`/api/users/${userId}`);
    return userAndAddresses;
  }

  async addAddressToUser(userId, addressFields) {
    const { data: newAddress } = await axios.post(
      `/api/users/${userId}/addresses`,
      addressFields
    );
    return newAddress;
  }

  async updateUserAddress(userId, addressId, updateFields) {
    const { data: updatedAddress } = await axios.patch(
      `/api/users/${userId}/addresses/${addressId}`,
      updateFields
    );
    return updatedAddress;
  }
}

export default new AxiosService();
