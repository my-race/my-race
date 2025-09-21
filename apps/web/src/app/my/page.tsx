import PageLayout from '../../components/layouts/PageLayout';

export default async function MyPage() {
  return (
    <PageLayout title="마이" subtitle="내 정보 및 설정">
      <div className="text-center text-gray-500 mt-20">
        <p className="text-lg">프로필을 설정해보세요</p>
        <p className="text-sm mt-2">러닝 기록을 관리할 수 있습니다</p>
      </div>
    </PageLayout>
  );
}
