interface AuthKakaoPageProps {
  searchParams: {
    code?: string;
  };
}

export default async function AuthKakaoPage({
  searchParams,
}: AuthKakaoPageProps) {
  const { code } = await searchParams;
  return (
    <div>
      <span>code: {code}</span>
    </div>
  );
}
