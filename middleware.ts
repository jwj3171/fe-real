// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export function middleware(request: NextRequest) {
  const BASIC_REDIRECT_PATH = "/search";
  const pathname = request.nextUrl.pathname;
  const publicPaths = ["/login", "/sign-up", "/landing"];
  const customerPaths = ["/search"];
  const moverPaths = ["/search"];

  // accessToken과 refreshToken 모두 체크
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasValidToken = accessToken || refreshToken;

  const toNext = (userType: "customer" | "mover", hasProfile: boolean) => {
    const response = NextResponse.next();
    response.headers.set("userType", userType);
    response.headers.set("hasProfile", hasProfile.toString());
    return response;
  };

  const toRedirect = (
    path: string,
    userType: "customer" | "mover",
    hasProfile: boolean,
  ) => {
    const response = NextResponse.redirect(new URL(path, request.url));
    response.headers.set("userType", userType);
    response.headers.set("hasProfile", hasProfile.toString());
    return response;
  };

  // 1. 회원 여부에 따라 경로 구분
  // 비회원 접근이 가능한 공개 페이지인지 확인 (하위 경로 포함)
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path),
  );

  const handleRedirect = async () => {
    // 비회원
    if (!hasValidToken) {
      if (!isPublicPath) {
        // 회원 전용 경로에 접근했을 때 리다이렉트
        return NextResponse.redirect(new URL("/login", request.url));
      } else {
        return NextResponse.next();
      }
    } else {
      // 회원
      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
      const decoded = await jose.jwtVerify(accessToken as string, secret);
      const hasProfile = decoded.payload.hasProfile as boolean;
      const userType = (decoded.payload.userType as string).toLowerCase() as
        | "customer"
        | "mover";

      // 회원이 비회원 페이지에 접근한 경우 - search로 리다이렉트
      if (isPublicPath) {
        return toRedirect(BASIC_REDIRECT_PATH, userType, hasProfile);
      } else {
        // 2. 회원 - hasProfile 여부에 따라 경로 구분
        if (!hasProfile) {
          // 프로필이 없는 경우
          // 프로필 없으면 초기 프로필 작성 페이지로 리다이렉트
          if (
            pathname.startsWith("/init-profile") ||
            pathname.startsWith("/auth/success")
          ) {
            return toNext(userType, hasProfile);
          } else {
            return toRedirect(
              `/init-profile/${userType}`,
              userType,
              hasProfile,
            );
          }
        } else {
          // 프로필이 있는 경우
          // 3. 회원 - userType에 따라 경로 구분
          // if (userType === "customer") {
          //   if (customerPaths.includes(pathname)) {
          //     return toNext(userType, hasProfile);
          //   } else {
          //     return toRedirect(BASIC_REDIRECT_PATH, userType, hasProfile);
          //   }
          // }
          // } else if (userType === "mover") {
          //   if (moverPaths.includes(pathname)) {
          //     return toNext(userType, hasProfile);
          //   } else {
          //     return toRedirect(BASIC_REDIRECT_PATH, userType, hasProfile);
          //   }
          // }
        }
      }
    }
    return NextResponse.next();
  };

  return handleRedirect();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
