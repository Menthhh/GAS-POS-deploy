import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.warning.main,
  fontWeight: "bold",
  borderBottom: "solid #4398e7",
  padding: "4px auto",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td": {
    borderBottom: "none",
    fontWeight: "600",
  },
}));

const SummaryTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.warning.main,
  fontWeight: "bold",
  borderTop: "solid #4398e7",
  padding: "4px auto",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  borderBottom: "none",
}));

const ReportTable = ({
  columns,
  data,
  showSummary = [],
  summaryColumnLabel = "รวม",
}) => {
  const calculateSummary = (columnId) => {
    return data.reduce((sum, row) => {
      const value = parseFloat(row[columnId]);
      return isNaN(value) ? sum : sum + value;
    }, 0);
  };

  return (
    <TableContainer component={Paper} sx={{ minWidth: 650 }}>
      <Table sx={{ minWidth: 650 }} aria-label="reusable table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={"center"}
                sx={{ minWidth: column.minWidth }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row.id || index}>
              {columns.map((column) => (
                <TableCell
                  key={`${row.id || index}-${column.id}`}
                  align={"center"}
                >
                  {column.id === "id"
                    ? index + 1
                    : column.format
                    ? column.format(row[column.id])
                    : row[column.id]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
        {showSummary.length > 0 && (
          <TableFooter>
            <TableRow>
              {columns.map((column) => (
                <SummaryTableCell key={column.id} align={"center"}>
                  {showSummary.includes(column.id)
                    ? column.format
                      ? column.format(calculateSummary(column.id))
                      : calculateSummary(column.id)
                    : column.id === columns[0].id
                    ? summaryColumnLabel
                    : ""}
                </SummaryTableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
