import BaseModal from "@/components/common/modal/BaseModal";

export default function Home() {
  return (
    <div className="p-10">
      <BaseModal
        trigger={
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            base modal
          </button>
        }
        title="Base Modal"
        textAreaId="review"
        textAreaLabel="후기 내용"
      ></BaseModal>
    </div>
  );
}
