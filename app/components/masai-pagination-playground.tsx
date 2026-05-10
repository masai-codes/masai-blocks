"use client";

import * as React from "react";

import { MasaiPagination } from "@/registry/components/masai-pagination";

export function MasaiPaginationPlayground() {
  const [page1, setPage1] = React.useState(1);
  const [page2, setPage2] = React.useState(1);
  const [page3, setPage3] = React.useState(4);
  const [page4, setPage4] = React.useState(1);

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Compact (3 pages)</h3>
        <p className="text-xs text-muted-foreground">
          Falls back to a flat row when total pages fits without ellipsis.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiPagination
            currentPage={page1}
            totalPages={3}
            onPageChange={setPage1}
          />
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            Page: {page1}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">With ellipsis (7 pages)</h3>
        <p className="text-xs text-muted-foreground">
          Uses boundary + sibling counts to truncate with “…”.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiPagination
            currentPage={page2}
            totalPages={7}
            onPageChange={setPage2}
          />
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            Page: {page2}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Long range (currentPage in middle)</h3>
        <p className="text-xs text-muted-foreground">
          20 pages, with current page 4 — both leading and trailing ellipses can appear as you navigate.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiPagination
            currentPage={page3}
            totalPages={20}
            onPageChange={setPage3}
            siblingCount={1}
            boundaryCount={1}
          />
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            Page: {page3}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Large size</h3>
        <p className="text-xs text-muted-foreground">
          Tap-friendly cells; same API, different size token.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiPagination
            currentPage={page4}
            totalPages={5}
            onPageChange={setPage4}
            size="large"
          />
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            Page: {page4}
          </span>
        </div>
      </div>
    </div>
  );
}
