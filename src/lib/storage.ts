import { ID } from 'appwrite'
import { storage } from '@/lib/appwrite';

export async function uploadFile(file: File) {
  const data = await storage.createFile(import.meta.env.VITE_APPWRITE_EVENTS_BUCKET_IMAGES_ID, ID.unique(), file)
  return data;
}

export async function deleteFileById(fileId: string) {
  const data = await storage.deleteFile(import.meta.env.VITE_APPWRITE_EVENTS_BUCKET_IMAGES_ID, fileId)
  return data;
}

export function getPreviewImageById(fileId: string) {
  return storage.getFilePreview(import.meta.env.VITE_APPWRITE_EVENTS_BUCKET_IMAGES_ID, fileId)
}