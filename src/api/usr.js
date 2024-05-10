import Service from "./config";

export const allUserURL = "/api/usr";

export function getUsrList() {
  return Service.get(allUserURL);
}

export const getUserURL = "/api/usr/{id}";

export function getUsrById(id) {
  return Service.get(getUserURL.replace("{id}", id));
}

export const addUserURL = "/api/usr/create";

export function addUsr(data) {
  return Service.post(addUserURL, data);
}

export const updateUserURL = "/api/usr/{id}";

export function updateUsr(id, data) {
  return Service.patch(updateUserURL.replace("{id}", id), data);
}

export const delUserURL = "/api/usr/{id}";

export function delUsr(id) {
  return Service.delete(delUserURL.replace("{id}", id));
}
