import { useState, useEffect } from "react";
import apiClient from "@/lib/apiCient";
import { StudiosByConceptResponse } from "@/types/studio.types";
import { Search } from "@/types/search.types";

export function useStudiosByKeyword(keyword: string) {
  const [data, setData] = useState<Search[] | null>(null); // 데이터를 배열로 변경
  const [filteredData, setFilteredData] = useState<Search[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<Search[]>(
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
    if (data) {
      const filtered = data.filter(
        (studio) =>
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
    price?: number;
    rating?: number;
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
          price: filters.price?.toString() || "",
          rating: filters.rating?.toString() || "",
          ...filters.locations?.reduce(
            (acc, loc) => ({ ...acc, locations: loc }),
            {}
          ),
        });

        const response = await apiClient.get<StudiosByConceptResponse>(
          `/studios/${conceptId}/filters?${queryParams}`
        );

        setData(response.data); // 전체 응답을 설정
      } catch (err) {
        setError("필터링된 데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredStudios();
  }, [conceptId, filters, pageNumber]);

  return { data, loading, error };
}
