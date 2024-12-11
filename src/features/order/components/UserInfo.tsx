import { MemberContactInfo } from "@/types/Checkout.type";

interface UserInfoProps {
  memberContactInfo: MemberContactInfo;
}

export const UserInfo: React.FC<UserInfoProps> = ({ memberContactInfo }) => {
  return (
    <div className="mb-6">
      <h2 className="text-md font-bold">내 정보</h2>
      <p>성명: {memberContactInfo.name}</p>
      <p>연락처: {memberContactInfo.phone}</p>
      <p>이메일: {memberContactInfo.email}</p>
    </div>
  );
};
