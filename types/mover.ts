import type { ServiceType } from "@/types/move";

export type MyQuoteLite = {
  id: number;
  price: number;
  comment: string | null;
  moverId: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  type: "NORMAL" | "DIRECT";
  createdAt: string;
};

export type MoveRequestForMover = {
  id: number;
  serviceType: ServiceType;
  moveDate: string;
  departure: string;
  departureRegion: string;
  destination: string;
  destinationRegion: string;
  status: "ACTIVE" | "COMPLETED" | "FINISHED";
  customerId: number;
  createdAt: string;
  updatedAt: string;
  myQuote: MyQuoteLite | null;
};

export type Paginated<T> = {
  meta: { page: number; pageSize: number; total: number; totalPages: number };
  data: T[];
};

export type DirectRequestRow = MoveRequestForMover & {
  direct_request_id: number;
  direct_request_status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  direct_request_created_at: string;
  customer_email: string | null;
  customer_phone: string | null;
  customer_region: string | null;
};
