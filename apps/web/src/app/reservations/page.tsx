import PageLayout from "../../components/layouts/PageLayout";

export default function ReservationsPage() {
  return (
    <PageLayout
      title="예약"
      subtitle="나의 대회 예약 내역"
    >
      <div className="text-center text-gray-500 mt-20">
        <p className="text-lg">예약 내역이 없습니다</p>
        <p className="text-sm mt-2">대회에 참가 신청해보세요</p>
      </div>
    </PageLayout>
  );
}