import { useState, useEffect } from "react";
import apiClient from "@/lib/apiCient";
import { Studio, StudiosByConceptResponse } from "@/types/studio.types";

export function useStudiosByConcept(
  conceptId: number,
  pageNumber: number,
  pageSize: number = 10
) {
  const [data, setData] = useState<StudiosByConceptResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<StudiosByConceptResponse>(
          `/concepts/${conceptId}/studios?page=${pageNumber}&size=${pageSize}`
        );
        setData(response.data);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // conceptId, pageNumber, pageSize가 변경될 때 데이터를 다시 가져옵니다.
    if (conceptId) fetchStudios();
  }, [conceptId, pageNumber, pageSize]); // 의존성 배열 수정

  return { data, loading, error };
}

interface StudiosByKeywordResponse {
  content: Studio[]; // 검색된 스튜디오 데이터 배열
  totalElements: number; // 검색된 총 데이터 수
}

export function useStudiosByKeyword(keyword: string) {
  const [data, setData] = useState<StudiosByKeywordResponse | null>(null);
  const [filteredData, setFilteredData] = useState<Studio[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<StudiosByKeywordResponse>(
          `/studios/search?keyword=${keyword.trim()}`
        );
        setData(response.data);
      } catch (err) {
        setError("검색 결과를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword.trim()) fetchStudios();
  }, [keyword]);

  useEffect(() => {
    if (data && data.content) {
      const filtered = data.content.filter(
        (studio: Studio) =>
          studio.name.toLowerCase().includes(keyword.toLowerCase()) ||
          studio.address.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(null);
    }
  }, [data, keyword]);

  return { data: filteredData, loading, error };
}
