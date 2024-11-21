import { useState, useEffect } from "react";
import apiClient from "@/lib/apiCient";
import { Studio } from "@/types/studio.types";

interface StudiosByConceptResponse {
  studios: Studio[];
}

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
  studios: Studio[];
}

export function useStudiosByKeyword(keyword: string) {
  const [data, setData] = useState<StudiosByKeywordResponse | null>(null);
  const [filteredData, setFilteredData] =
    useState<StudiosByKeywordResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<StudiosByKeywordResponse>(
          `/studios/search?keyword`
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
    if (data && keyword.trim()) {
      // 필터링 로직: name 또는 address에 keyword 포함 여부 검사
      const filtered = data.filter(
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
