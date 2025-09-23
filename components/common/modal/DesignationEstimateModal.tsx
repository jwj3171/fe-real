import BaseModal from "./BaseModal";

export default function DesignationEstimateModal() {
  return (
    <BaseModal
      trigger={
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
          지정 견적 요청하기
        </button>
      }
      title="지정 견적 요청하기"
      description="일반 견적 요청을 먼저 진행해 주세요."
      confirmText="일반 견적 요청 하기"
      showRouteInfo={false}
      showTextArea={false}
    ></BaseModal>
  );
}
