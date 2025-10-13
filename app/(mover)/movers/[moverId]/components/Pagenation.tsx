"use client";

import { IconButtons } from "@/components/common/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/common/button/icons";

interface Props {
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
}

export default function Pagenation({ page, setPage, totalPages }: Props) {
  return (
    <div className="flex gap-2">
      {page > 1 ? (
        <IconButtons
          color="white"
          variant="outline"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </IconButtons>
      ) : (
        <IconButtons color="white" variant="ghost"></IconButtons>
      )}
      {page < totalPages ? (
        <IconButtons
          color="white"
          variant="outline"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </IconButtons>
      ) : (
        <IconButtons color="white" variant="ghost"></IconButtons>
      )}
    </div>
  );
}
