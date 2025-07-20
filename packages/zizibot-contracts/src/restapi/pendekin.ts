export interface CreatePendekinRequest {
  originalUrl: string;
  shortPath?: string;
}
export interface PendekinItem {
  pendekinId: string;
  shortPath: string;
  shortUrl: string;
  originalUrl: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface PendekinItemDetail {
  pendekinId: string;
  originalUrl: string;
  createdDate: Date;
  updatedDate: Date;
}
