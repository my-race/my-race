import PageLayout from "../../components/layouts/PageLayout";

export default function CommunityPage() {
  return (
    <PageLayout
      title="커뮤니티"
      subtitle="러너들과 소통해보세요"
    >
      <div className="text-center text-gray-500 mt-20">
        <p className="text-lg">아직 게시글이 없습니다</p>
        <p className="text-sm mt-2">첫 번째 글을 작성해보세요</p>
      </div>
    </PageLayout>
  );
}