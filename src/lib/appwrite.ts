import { Client, Databases, Storage, Account, Teams } from 'appwrite';

export const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export const teams = new Teams(client);

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);