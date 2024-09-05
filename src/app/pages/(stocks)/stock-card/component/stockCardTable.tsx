import React, { useState, useEffect } from 'react';

interface StockCardTableProps {
    data: {
        headers: string[];
        rows: string[][];
    };
    columnWidths?: string[];
    searchQuery?: string;
    searchColumns?: number[];
    startColumns?: number[];
}

const StockCardTable = ({ data, columnWidths, searchQuery = "", searchColumns, startColumns }: StockCardTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredRows, setFilteredRows] = useState<string[][]>(data.rows);
    const itemsPerPage = 10;

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        } else {
            setFilteredRows(data.rows);
        }
    }, [data.rows, searchQuery]);

    const handleSearch = (searchTerm: string) => {
        searchTerm = searchTerm.toLowerCase();
        const filtered = data.rows.filter((row) =>
            row.some((cell, colIndex) => {
                if (!searchColumns || !searchColumns.includes(colIndex)) return false;
                const cellValue = String(cell).toLowerCase();
                return cellValue.includes(searchTerm);
            })
        );
        setFilteredRows(filtered);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col gap-2">
            <table className="w-full">
                <thead className="bg-white border-b-2 border-end sticky top-[-1px]">
                    <tr>
                        {data.headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-1 text-center sticky top-0"
                                style={{ width: columnWidths && columnWidths[index] }}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={`px-4 py-[3.5px] ${cellIndex > 4 ? 'border-r-0' : ''}`}
                                >
                                    <div className={`flex justify-center items-center font-ibm-plex-sans-thai text-third font-semibold my-1 ${startColumns?.includes(cellIndex) ? 'justify-start' : 'justify-center'}`}>
                                        {cell}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3 flex justify-between px-6 z-4">
                <div>
                    <p className="text-[#083148] font-inter underline">
                        กำลังแสดง {Math.min(indexOfLastItem, filteredRows.length)} จากทั้งหมด {filteredRows.length} 
                    </p>
                </div>

                <div>
                    <div className="flex items-start">
                        {currentPage > 1 && (
                            <button onClick={() => handlePageChange(currentPage - 1)} className="p-2 text-extra cursor-pointer underline">
                                Previous
                            </button>
                        )}

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index} onClick={() => handlePageChange(index + 1)} className={`size-8 border-solid border-[#F6F6F6] text-secondary hover:bg-primary hover:text-white ${currentPage === index + 1 ? "bg-[#347EC2] text-white" : ''}`}>
                                {index + 1}
                            </button>
                        ))}

                        {currentPage < totalPages && (
                            <button onClick={() => handlePageChange(currentPage + 1)} className="p-2 text-extra cursor-pointer underline">
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockCardTable;