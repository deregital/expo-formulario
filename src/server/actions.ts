'use server'

export async function getUrl() {
  return process.env.EXPO_MANAGER_URL;
}

export async function getUsername() {
  return process.env.EXPO_MANAGER_USERNAME;
}

export async function getPassword() {
  return process.env.EXPO_MANAGER_PASSWORD;
}