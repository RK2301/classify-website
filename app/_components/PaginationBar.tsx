'use client'
import { Pagination } from "@rkh-ms/classify-lib";
import PaginationControls from "./PaginationControls";
import TableResult from "./TableResult";
import { cn } from "@/lib/utils";

interface PaginationBarProps {
    pagination: Pagination,
    className?: string
}

const PaginationBar: React.FC<PaginationBarProps> = ({ pagination, className }) => {

    // Do not render if there is only one page
    if (pagination.totalPages <= 1)
        return null;

    return (
        <div className={cn(`flex items-center justify-between 
        gap-3 rounded-lg 
        px-1.5 lg:px-3 py-1.5
        bg-[var(--color-grey-50)]
        border border-[var(--color-grey-200)]`, className)}>
            <TableResult totalItems={pagination.totalItems} />
            <PaginationControls pagination={pagination} />
        </div>
    )
}

export default PaginationBar;