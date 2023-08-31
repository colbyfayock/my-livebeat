import { Models, ID } from 'appwrite';
import { databases } from '@/lib/appwrite';
import { deleteFileById } from '@/lib/storage';
import { LiveBeatEvent } from '@/types/events';

export async function getEvents() {
  const { documents } = await databases.listDocuments(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID);
  return {
    events: documents.map(mapDocumentToEvent)
  }
}

export async function getEventById(eventId: LiveBeatEvent['$id']) {
  const document = await databases.getDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID, eventId);
  return {
    event: mapDocumentToEvent(document)
  }
}

export async function deleteEventById(eventId: LiveBeatEvent['$id']) {
  const { event } = await getEventById(eventId);
  if ( event.imageFileId ) {
    await deleteFileById(event.imageFileId)
  }
  await databases.deleteDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID, eventId);
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
    imageHeight: document.imageHeight,
    imageFileId: document.imageFileId,
    imageWidth: document.imageWidth,
  }
  return event;
}