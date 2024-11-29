export async function getUrl() {
  return process.env.EXPO_MANAGER_URL;
}

export async function getUsername() {
  return process.env.EXPO_MANAGER_USERNAME;
}

export async function getPassword() {
  return process.env.EXPO_MANAGER_PASSWORD;
}

export async function getBackendUrl() {
  return process.env.EXPO_BACKEND_URL;
}