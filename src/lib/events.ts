import { Models, ID } from 'appwrite';
import { databases } from '@/lib/appwrite';
import { LiveBeatEvent } from '@/types/events';

export async function getEvents() {
  const { documents } = await databases.listDocuments(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID);
  return {
    events: documents.map(mapDocumentToEvent)
  }
}

export async function getEventById(eventId: string) {
  const document = await databases.getDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID, eventId);
  return {
    event: mapDocumentToEvent(document)
  }
}

export async function createEvent(event: Omit<LiveBeatEvent, '$id'>) {
  const document = await databases.createDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID, ID.unique(), event);
  return {
    event: mapDocumentToEvent(document)
  }
}

function mapDocumentToEvent(document: Models.Document) {
  const event: LiveBeatEvent = {
    $id: document.$id,
    name: document.name,
    location: document.location,
    date: document.date,
  }
  return event;
}