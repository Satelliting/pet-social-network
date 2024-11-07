import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.APPWRITE_API_ENDPOINT)
    .setProject(import.meta.env.APPWRITE_PROJECT_ID);

export const account = new Account(client);

const databases = new Databases(client);

export { client, databases };