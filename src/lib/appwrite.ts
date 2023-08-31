import { Client, Databases, Storage } from 'appwrite';

export const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);