import { useState, useEffect } from "react";
import apiClient from "@/lib/apiCient";
import { StudiosByConceptResponse } from "@/types/studio.types";
import { Search } from "@/types/search.types";

export function useStudiosByKeyword(keyword: string) {
  const [data, setData] = useState<Search[] | null>(null); // API 결과 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      setError(null); // 이전 에러 초기화
      try {
        // API 호출, 키워드 포함
        const response = await apiClient.get<Search[]>(
          `/studios/search?keyword=${encodeURIComponent(keyword)}`
        );

        // 중복 제거 후 데이터 설정
        const uniqueResults = response.data.filter(
          (studio, index, self) =>
            index === self.findIndex((s) => s.id === studio.id)
        );

        setData(uniqueResults);
      } catch (err) {
        setError("검색 결과를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword.trim()) {
      fetchStudios(); // 키워드가 있을 때만 API 호출
    } else {
      setData(null); // 키워드가 없을 때 데이터 초기화
    }
  }, [keyword]);

  return { data, loading, error };
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

export function useStudiosWithFilters(
  conceptId: number,
  filters: {
    price?: number | null;
    rating?: number | null;
    locations?: string[];
  },
  pageNumber: number
) {
  const [data, setData] = useState<StudiosByConceptResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilteredStudios = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: pageNumber.toString(),
        });

        if (filters.price != null) {
          queryParams.set("price", filters.price.toString());
        }

        if (filters.rating != null) {
          queryParams.set("rating", filters.rating.toString());
        }

        // locations 추가
        (filters.locations || []).forEach((location) => {
          if (location !== "") {
            queryParams.append("locations", location);
          }
        });

        console.log("Generated API URL:", queryParams.toString());

        const response = await apiClient.get<StudiosByConceptResponse>(
          `/studios/${conceptId}/filters?${queryParams}`
        );

        setData(response.data);
      } catch (err) {
        setError("필터링된 데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    console.log("filters.price:", filters.price);
    fetchFilteredStudios();
  }, [conceptId, filters, pageNumber]);

  return { data, loading, error };
}
