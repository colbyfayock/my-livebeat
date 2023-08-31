export interface LiveBeatEvent {
  $id: string;
  name: string;
  location: string;
  date: string;
  imageFileId?: string;
  imageHeight?: number;
  imageWidth?: number;
}