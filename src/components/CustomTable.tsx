import React, { useState, useEffect } from 'react';

interface CustomTableProps {
    data: {
        headers: string[];
        rows: string[][];
    };
    columnWidths?: string[];
    searchQuery?: string;
    searchColumns?: number[]; 
    startColumns?: number[]; 
    maxHeight?: string;
}

const CustomTable = ({ data, columnWidths, searchQuery = "", searchColumns, startColumns, maxHeight = "400px" }: CustomTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredRows, setFilteredRows] = useState<string[][]>(data.rows); // Set initial state to all rows
    const itemsPerPage = 10;

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery); // Call handleSearch with searchQuery
        } else {
            setFilteredRows(data.rows); // Show all rows when no search query
        }
    }, [data.rows, searchQuery]); // Run when data.rows or searchQuery changes

    const handleSearch = (searchTerm: string) => {
        searchTerm = searchTerm.toLowerCase(); // Convert search term to lowercase
        console.log("Search term:", searchTerm);
        const filtered = data.rows.filter((row) =>
            row.some((cell, colIndex) => {
                if (!searchColumns || !searchColumns.includes(colIndex)) return false; // Skip if not in search columns
                const cellValue = String(cell).toLowerCase(); // Convert cell value to lowercase
                return cellValue.includes(searchTerm); // Check if cell value includes search term
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
            <table className="mt-4 table-auto w-full font-ibm-plex-sans-thai text-[#5E5F5F] font-semibold shadow-lg"
                style={{
                    tableLayout: 'fixed',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)'
                }}
            >
                <thead className="text-center h-11 text-md bg-tableColor shadow-lg text-white">
                    <tr>
                        {data.headers.map((header, index) => (
                            <th key={index} style={{ width: columnWidths && columnWidths[index] }}>{header}</th>
                        ))}
                    </tr>
                </thead>
            </table>
            <div className="overflow-y-auto" style={{ maxHeight }}>
                <table className="table-auto w-full font-ibm-plex-sans-thai text-[#5E5F5F] font-semibold shadow-lg"
                    style={{
                        tableLayout: 'fixed',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <tbody className="text-center font-lg text-[#5E5F5F]">
                        {currentItems.map((row, rowIndex) => (
                            <tr key={rowIndex} className="h-10 border-b border-1 border-[#C6C6C6]">
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        style={{ width: columnWidths && columnWidths[cellIndex] }}
                                        className={` ${startColumns?.includes(cellIndex) ? 'text-start' : 'text-center'}`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

export default CustomTable;
