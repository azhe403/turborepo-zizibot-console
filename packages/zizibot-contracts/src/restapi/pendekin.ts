export interface CreatePendekinRequest {
  originalUrl: string;
  shortPath: string;
}

export interface PendekinItem {
  pendekinId: string;
  shortPath: string;
  originalUrl: string;
  createdDate: Date;
  updatedDate: Date;
}
