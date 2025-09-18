"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  // 임시
  const [role, setRole] = useState<"guest" | "user" | "driver">("guest");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [role]);
  return (
    // 임시용 밑줄
    <header className="border-b">
      <nav className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8 pl-[160px]">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="무빙 로고"
              width={116}
              height={44}
            />
          </Link>

          <ul className="flex gap-6 text-md text-black font-bold">
            {role === "guest" && (
              // 임시로 일반유저 , 기사 로그인 넣음 테스트용
              <>
                <li>
                  <Link href="/search">기사님 찾기</Link>
                </li>
                <li>
                  <button
                    onClick={() => setRole("user")}
                    className="text-blue-600"
                  >
                    일반유저 로그인
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setRole("driver")}
                    className="text-blue-600"
                  >
                    기사님 로그인
                  </button>
                </li>
              </>
            )}

            {role === "user" && (
              <>
                <li>
                  <Link href="/estimate">견적 요청</Link>
                </li>
                <li>
                  <Link href="/search">기사님 찾기</Link>
                </li>
                <li>
                  <Link href="/myEstimates">내 견적 관리</Link>
                </li>
              </>
            )}

            {role === "driver" && (
              <>
                <li>
                  <Link href="/requests">받은 요청</Link>
                </li>
                <li>
                  <Link href="/myEstimates">내 견적 관리</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex pr-[160px]">
          {role === "guest" ? (
            <Link
              href="/login"
              className="px-6 py-1.5 bg-orange-600 text-white rounded-lg"
            >
              로그인
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Image
                src="/icons/ic_alarm.svg"
                alt="알람"
                width={30}
                height={30}
              />

              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/icons/ic_profile.svg"
                    alt="프로필"
                    width={36}
                    height={36}
                  />
                  <span className="text-black font-bold ">
                    {role === "driver" ? "김코드 기사님" : "김가나"}
                  </span>
                </button>
                {open && (
                  <div className="absolute left-0 top-full mt-2 w-45 rounded-lg shadow-lg border border-gray-200 bg-white">
                    {role === "user" && (
                      <>
                        <div className="px-4 py-4 font-bold text-sm text-gray-800">
                          김가나 고객님
                        </div>
                        <ul className="text-sm text-gray-700">
                          <li className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer">
                            프로필 수정
                          </li>
                          <li className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer">
                            찜한 기사님
                          </li>
                          <li className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer">
                            이사 리뷰
                          </li>
                        </ul>
                      </>
                    )}

                    {role === "driver" && (
                      <>
                        <div className="px-4 py-4 font-bold text-sm text-gray-800">
                          김코드 기사님
                        </div>
                        <ul className="text-sm text-gray-700">
                          <li className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer">
                            마이페이지
                          </li>
                        </ul>
                      </>
                    )}
                    <button
                      onClick={() => setRole("guest")}
                      className="w-full border-t border-gray-100 px-4 py-2 text-gray-400 text-center text-sm cursor-pointer"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
