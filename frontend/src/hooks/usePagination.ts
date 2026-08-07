import { useState } from 'react';

export function usePagination(initialPage = 0, initialSize = 5) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const goToPage = (p: number) => setPage(p);

  return {
    page,
    size,
    setPage,
    setSize,
    nextPage,
    prevPage,
    goToPage,
  };
}
