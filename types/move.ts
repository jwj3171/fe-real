export type ServiceType = "SMALL" | "FAMILY" | "OFFICE";
export type MoveRequestStatus = "ACTIVE" | "COMPLETED" | "FINISHED";
export type QuoteStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
export type QuoteType = "NORMAL" | "DIRECT";

export type MoveRequest = {
  id: number;
  serviceType: ServiceType;
  moveDate: string; // ISO
  departure: string;
  departureRegion: string;
  destination: string;
  destinationRegion: string;
  status: MoveRequestStatus;
  customerId: number;
  createdAt: string;
  updatedAt: string;
};

export type Quote = {
  id: number;
  price: number;
  comment: string;
  moveRequestId: number;
  moverId: number;
  status: QuoteStatus;
  type: QuoteType;
  createdAt: string;
  updatedAt: string;
};

export type QuoteWithMover = Omit<Quote, never> & {
  mover?: {
    id: number;
    nickname: string;
    career: string;
    averageRating: number;
    totalReviews: number;
    img: string;
    _count?: { likes: number };
  };
};
