"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/api/apiRequest";

interface MemberInfo {
  email: string;
  name: string;
  phone: string;
}

function MyPage() {
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 가져오기
  const fetchMemberInfo = async () => {
    try {
      setLoading(true);
      const data: MemberInfo = await apiRequest("GET", `/v1/members/infos`);
      setMemberInfo(data);
    } catch (err) {
      console.error("API 요청 실패:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchMemberInfo();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!memberInfo) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <h1>회원 정보</h1>
      <p>
        <strong>이메일:</strong> {memberInfo.email}
      </p>
      <p>
        <strong>이름:</strong> {memberInfo.name}
      </p>
      <p>
        <strong>전화번호:</strong> {memberInfo.phone}
      </p>
    </div>
  );
}

export default MyPage;
