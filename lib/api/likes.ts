import clientApi from "./axiosClient.client";

export interface Like {
  id: number;
  createdAt: string;
  mover: {
    id: number;
    name: string;
    img: string;
    nickname: string;
    career: string;
    introduction: string;
    description: string;
    averageRating: number;
    totalReviews: number;
    isActive: boolean;
    deleted: boolean;
    moverRegions: { region: string }[];
    moverServiceTypes: { serviceType: string }[];
    _count: {
      reviews: number;
      quotes: number;
      likes: number;
    };
  };
}

// 고객의 좋아요 목록 조회
export async function getCustomerLikes(): Promise<Like[]> {
  const response = await clientApi.get("/likes/customer");
  return response.data.data;
}

// 좋아요 토글 (추가/삭제)
export async function toggleLike(moverId: number) {
  const response = await clientApi.post("/likes/toggle", {
    moverId,
  });
  return response.data;
}

// 좋아요 상태 확인
export async function checkLikeStatus(moverId: number) {
  const response = await clientApi.get(`/likes/status/${moverId}`);
  return response.data.data;
}
