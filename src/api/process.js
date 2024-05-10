import Service from "./config";

export const allProcessURL = "/api/process";

export function getProcessList() {
  return Service.get(allProcessURL);
}

export function getProcessById(id) {
  return Service.get(allProcessURL + "/" + id);
}

export const createProcessURL = "/api/process/create";

export function addProcess(data) {
  return Service.post(createProcessURL, data);
}

export const updateProcessURL = "/api/process/{id}";

export function updateProcess(id, data) {
  return Service.patch(updateProcessURL.replace("{id}", id), data);
}

export const deleteProcessURL = "/api/process/{id}";

export function delProcess(id) {
  return Service.delete(deleteProcessURL.replace("{id}", id));
}
