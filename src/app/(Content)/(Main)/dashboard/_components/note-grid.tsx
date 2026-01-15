"use client";

import useSWR from "swr";
import { Note, NoteSkeleton } from "./note";
import { useEffect, useRef, useState } from "react";
import type { PartialNote } from "~/types/note";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";
import GridTopBar from "./top-bar";
import { DisabledGridTopBar } from "./top-bar";
import autoAnimate from "@formkit/auto-animate";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function NoteGrid() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebounced] = useDebounceValue(searchTerm, 400);
  const notesParent = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (!notesParent.current) return;
    autoAnimate(notesParent.current, {
      easing: "ease-in",
      duration: 120,
    });
  }, [notesParent]);

  const {
    data: response,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error,
    mutate,
    isLoading,
  } = useSWR<{ totalPages: number; notes: PartialNote[] }>(
    `/api/note/list?page=${page}${debouncedSearchTerm ? `&search=${encodeURIComponent(debouncedSearchTerm)}` : ""}`,
    fetcher,
  );

  const notes = response?.notes;

  useEffect(() => {
    if (response?.totalPages) {
      setTotalPages(response.totalPages);
    }
  }, [response]);

  if (error) {
    toast.error("Failed to fetch notes");
  }

  const handleWrite = (term: string) => {
    setSearchTerm(term);
    setDebounced(term);
    setPage(1); // Resets to first page on new search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 && newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page on selector
      pageNumbers.push(1);

      // Show ellipsis after first page when needed
      if (page > 2) {
        pageNumbers.push(-1); // Ellipsis
      }

      // Shows the current one if it's not the first or last page
      if (page !== 1 && page !== totalPages) {
        pageNumbers.push(page);
      }

      // Show ellipsis before last page when needed
      if (page < totalPages - 1) {
        pageNumbers.push(-1); // Ellipsis
      }

      // Always show last page on selector
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <GridTopBar
        searchTerm={searchTerm}
        setSearchTerm={handleWrite}
        refetchNotes={mutate}
      />

      <div
        ref={notesParent}
        className="mb-8 grid min-h-[40vh] w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {notes && notes.length === 0 && !isLoading && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700/50 py-20 text-center">
            <div className="mb-4 rounded-xl bg-slate-800/50 p-4">
              <svg
                className="size-8 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-slate-300">No notes yet</p>
            <p className="mt-1 text-slate-500">
              Create your first note to get started
            </p>
          </div>
        )}
        {notes?.map((note) => (
          <Note key={note.id} note={note} onDelete={mutate} />
        ))}
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <NoteSkeleton key={index} />
          ))}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={
                  page <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                aria-disabled={page <= 1}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum, index) =>
              pageNum === -1 ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === page}
                    onClick={() => handlePageChange(pageNum)}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={
                  page >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                aria-disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export function NoteGridSkeleton() {
  return (
    <>
      <DisabledGridTopBar />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <NoteSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
