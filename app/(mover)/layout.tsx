import ClientProviders from "@/components/ClientProviders";

export default function MoverSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 상위(app/layout.tsx)의 Header는 그대로 사용됨.
  return <ClientProviders>{children}</ClientProviders>;
}
