import { Client, Account, Databases } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_API_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);

const databases = new Databases(client);

export { client, databases };