'use server'

export async function getUrl() {
  return process.env.EXPO_MANAGER_URL;
}