import useFetch from "@/features/common/hooks/useFetch";
import { StudioDetail } from "../types/StudioDetail.type";

export function useStudioDetail(studioId: number) {
  return useFetch<StudioDetail>(`/v1/studios/${studioId}`);
}
