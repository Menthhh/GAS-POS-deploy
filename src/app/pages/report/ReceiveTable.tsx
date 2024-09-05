import React from "react";
import { Paper, Stack, Box, Typography, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReportTable from "@/components/ReportTable";
import theme from "@/theme";
import { ReportTypeTab, reportTabAttribute } from "@/const";
import { ReportTab, ReportType } from "@/enum";

function ReceiveTable({
  ReportSelect,
  startDate,
  endDate,
  exportExcelHandler,
  exportPDFHandler,
  data,
  searchState,
  reportDetail,
  currentPage,
  handlePrevPage,
  handleNextPage,
}) {
  const getTypeBySubType = (subType) => {
    for (const report of ReportTypeTab) {
      if (report.subType.includes(subType)) {
        return report.type;
      }
    }
    return null;
  };

  return (
    <Paper sx={{ px: 0, py: 2 }} elevation={0}>
      <Stack px={5}>
        <Box display="flex" justifyContent="space-between">
          <Stack>
            <Typography
              variant="h6"
              pb={1}
              sx={{ fontWeight: "bold" }}
              color={theme.palette.success.main}
            >
              {reportTabAttribute[ReportSelect].label}
            </Typography>
            {reportTabAttribute[ReportSelect].hasDatePicker ? (
              <Box display="flex" gap={2} pb={3}>
                <Typography
                  variant="body1"
                  className="text-extra font-bold px-0"
                >
                  วันที่
                </Typography>
                <Typography
                  variant="body1"
                  className="text-primary font-bold px-0"
                >
                  {startDate}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-extra font-bold px-0"
                >
                  ถึงวันที่
                </Typography>
                <Typography
                  variant="body1"
                  className="text-primary font-bold px-0"
                >
                  {endDate}
                </Typography>
              </Box>
            ) : getTypeBySubType(ReportSelect) === ReportType.STOCK ? (
              <Box display="flex" gap={2} pb={3}>
                <Typography
                  variant="body1"
                  className="text-extra font-bold px-0"
                >
                  ประจำเดือน
                </Typography>
                <Typography
                  variant="body1"
                  className="text-primary font-bold px-0"
                >
                  {startDate}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-extra font-bold px-0"
                >
                  ปี
                </Typography>
                <Typography
                  variant="body1"
                  className="text-primary font-bold px-0"
                >
                  {startDate}
                </Typography>
              </Box>
            ) : ReportSelect === ReportTab.SALE_TAX ||
              ReportSelect === ReportTab.TAX ? (
              <Box>
                <Box display="flex" gap={2} pb={3}>
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    เดือนภาษี
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-primary font-bold px-0"
                  >
                    {searchState.month || "ทุกเดิอน"}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    ปี
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-primary font-bold px-0"
                  >
                    {searchState.year || "ทุกเดือน"}
                  </Typography>
                </Box>
                <Box display="flex" gap={2} pb={3}>
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    ชื่อสถานประกอบการ
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-primary font-bold px-0"
                  >
                    {reportDetail?.ORGNAME}
                  </Typography>
                </Box>
                <Box display="flex" gap={2} pb={3}>
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    เลขประจำตัวผู้เสียอากร
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-primary font-bold px-0"
                  >
                    {reportDetail?.TAXID}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box display="flex" gap={2} pb={3}>
                <Typography
                  variant="body1"
                  className="text-extra font-bold px-0"
                >
                  ณ วันที่
                </Typography>
                <Typography
                  variant="body1"
                  className="text-primary font-bold px-0"
                >
                  {startDate}
                </Typography>
              </Box>
            )}
          </Stack>
          <Box>
            <Button
              sx={{
                margin: "auto 5px",
                borderRadius: 3,
                color: theme.palette.textExtra.main,
                bgcolor: theme.palette.error.main,
              }}
              onClick={exportExcelHandler}
              variant="contained"
            >
              นำออกไฟล์ (Excel)
            </Button>
            <Button
              sx={{ margin: "auto 5px", borderRadius: 3 }}
              variant="outlined"
              onClick={exportPDFHandler}
            >
              <PictureAsPdfIcon sx={{ mr: 1 }} />
              PDF
            </Button>
          </Box>
        </Box>
        {/* Adding a maxWidth to the container and overflowX to allow scrolling */}
        <Box sx={{ overflowY: "auto", maxHeight: "40vh" }}>
          <ReportTable
            columns={reportTabAttribute[ReportSelect].column}
            data={data.data}
            showSummary={reportTabAttribute[ReportSelect].showSummary}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mt={3}
          alignItems="center"
        >
          <Typography>
            กำลังแสดง {currentPage} จากทั้งหมด {data.totalPages}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              variant="text"
              sx={{ minWidth: "auto", p: 1 }}
            >
              Previous
            </Button>
            <Box
              mx={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              minWidth={24}
            >
              {currentPage}
            </Box>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === data.totalPages}
              variant="text"
              sx={{ minWidth: "auto", p: 1 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}

export default ReceiveTable;
