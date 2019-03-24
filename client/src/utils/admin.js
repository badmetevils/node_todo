const baseUrl = process.env.API_URL;
const SuperUser = {
  validate(token) {
    return fetch(`${baseUrl}/api/users/info`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
  },
  getUserList(token) {
    return fetch(`${baseUrl}/api/admin/get_user_details`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
  },
  deleteUser(id, token) {
    return fetch(`${baseUrl}/api/admin/delete_user/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
  },
};

export default SuperUser;
