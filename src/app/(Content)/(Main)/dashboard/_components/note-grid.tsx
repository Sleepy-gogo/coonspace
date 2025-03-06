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

/**
 * A responsive grid component for displaying and managing notes.
 * Features include:
 * - Dynamic note loading with loading skeletons
 * - Search functionality with debouncing
 * - Empty state handling
 * - Grid layout that adapts to different screen sizes
 * - Support for note deletion
 * - Pagination for navigating through notes
 * @component
 */
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
        className="mb-4 grid min-h-[50vh] w-full grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2"
      >
        {notes && notes.length === 0 && !isLoading && (
          <p className="col-span-3 text-center text-slate-400 md:text-lg">
            Click the <span className="font-bold">Add Note</span> to start
            publishing your notes!
          </p>
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
