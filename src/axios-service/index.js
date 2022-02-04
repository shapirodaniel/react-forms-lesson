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
    await axios.patch(
      `/api/users/${userId}/addresses/${addressId}`,
      updateFields
    );

    const updatedUser = await this.getUserAndAddresses(userId);
    return updatedUser;
  }
}

export default new AxiosService();
