import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    if (page < pageCount) {
      queryClient
        .query({
          queryKey: ["bookings", filter, sortBy, page + 1],
          queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        })
        .catch(() => {});
    }

    if (page > 1) {
      queryClient
        .query({
          queryKey: ["bookings", filter, sortBy, page - 1],
          queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        })
        .catch(() => {});
    }
  }, [queryClient, filter, sortBy, page, pageCount]);

  return { isPending, bookings, error, count };
}
