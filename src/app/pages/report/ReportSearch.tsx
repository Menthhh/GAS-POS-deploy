"use client";
import theme from "@/theme";
import {
  Box,
  Typography,
  Paper,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Button,
  styled,
  TextField,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import React, { useCallback, useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ReportTypeTab, reportTabAttribute } from "@/const";
import { useRouter } from "next/navigation";
import { Month, ReportTab } from "@/enum";
import dayjs from "dayjs";
import "moment/locale/th";
import moment from "moment";
class BuddhistDateAdapter extends AdapterMoment {
  constructor({ locale, formats, instance }) {
    super({ locale, formats, instance });
    this.locale = "th";
    moment.locale("th");
  }

  date(value) {
    return moment(value).add(543, "year");
  }

  getYear(date) {
    return super.getYear(date) + 543;
  }

  setYear(date, year) {
    return super.setYear(date, year - 543);
  }

  format(date, formatString) {
    const momentDate = moment(date);
    const buddhistYear = momentDate.year() + 543;
    return momentDate.format(
      formatString.replace("YYYY", buddhistYear.toString())
    );
  }
}

function ReportSearch({
  refetch,
  fetchData,
  type,
  searchState,
  setSearchState,
  vendors,
}: any) {
  const date = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [year, setYear] = useState(null);
  const [vendorSelect, setVendorSelect] = useState(null);
  const [month, setMonth] = useState(null);

  const memoizedRefetch = useCallback(() => {
    refetch();
  }, [refetch]);
  const router = useRouter();
  const handleSearch = () => {
    setSearchState({
      year: year,
      month: month,
      startDate: dayjs(startDate).isValid() 
        ? dayjs(startDate).year(dayjs(startDate).year() + 543).toDate() 
        : null,
      endDate: dayjs(endDate).isValid() 
        ? dayjs(endDate).year(dayjs(endDate).year() + 543).toDate() 
        : null,
      vendor: vendorSelect,
    });
  };
  useEffect(() => {
    refetch;
  }, [searchState]);
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const getTypeBySubType = useCallback((subType) => {
    for (const report of ReportTypeTab) {
      if (report.subType.includes(subType)) {
        return report.subType;
      }
    }
    return null;
  }, []);

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  }));

  return (
    <Box>
      <Box display="flex" mt={3}>
        {getTypeBySubType(type)?.map((subType) => (
          <Button
            key={subType}
            variant={subType === type ? "contained" : "outlined"}
            onClick={() => {
              router.push(`report?type=${subType}`);
            }}
            sx={{
              bgcolor: subType !== type ? "#fff" : "",
              px: 1,
              py: 1,
              mt: 2,
              mx: 1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderColor: theme.palette.secondary.main,
            }}
          >
            <Typography variant="body1" className="font-bold px-0">
              {reportTabAttribute[subType].label}
            </Typography>
          </Button>
        ))}
      </Box>
      {type !== ReportTab.SALE_DEBT_SUMMARY && (
        <Paper elevation={0} sx={{ py: 2, mb: 3 }}>
          <Stack gap={1}>
            {reportTabAttribute[type].hasDatePicker && (
              <Box
                gap={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="body1"
                  className="text-extra font-bold px-0"
                >
                  วันที่
                </Typography>
                <Box mb={1}>
                  <LocalizationProvider dateAdapter={BuddhistDateAdapter}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={startDate}
                      onChange={handleStartDateChange}
                      views={["year", "month", "day"]}
                    />
                  </LocalizationProvider>
                </Box>
                <ArrowForwardIcon />
                <Box mb={1}>
                  <LocalizationProvider dateAdapter={BuddhistDateAdapter}>
                    <DatePicker
                      value={endDate}
                      onChange={handleEndDateChange}
                      format="DD/MM/YYYY"
                      views={["year", "month", "day"]}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            )}

            <Box
              gap={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {reportTabAttribute[type].hasVendor ? (
                <Box
                  gap={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    ผู้จัดจำหน่าย
                  </Typography>
                  <Box mb={1} width={500}>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        className="bg-white text-gray-900"
                        value={vendorSelect || ""}
                        onChange={(e) => setVendorSelect(e.target.value)}
                        sx={{
                          borderRadius: "12px",
                          "& .MuiSelect-select": {
                            "&:focus": {
                              backgroundColor: "transparent",
                            },
                          },
                        }}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <p style={{ color: "gray" }}>ผู้จัดจำหน่าย</p>
                            );
                          }
                          return selected;
                        }}
                      >
                        {vendors.map((vendor) => {
                          return (
                            <MenuItem value={vendor}>
                              <p>{vendor}</p>
                            </MenuItem>
                          );
                        })}
                        <MenuItem value={null}>
                          <p>ทั้งหมด</p>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              ) : reportTabAttribute[type].hasCustomer ? (
                <Box
                  gap={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    รหัสลูกค้า
                  </Typography>
                  <TextField
                    placeholder="รหัสลูกค้า"
                    value={searchState.customerCode || ""}
                    onChange={(e) =>
                      setSearchState((prev) => ({
                        ...prev,
                        customerCode: e.target.value,
                      }))
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    ชื่อ
                  </Typography>
                  <TextField
                    placeholder="ชื่อ"
                    value={searchState.customerName || ""}
                    onChange={(e) =>
                      setSearchState((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                      width: 500,
                    }}
                  />
                </Box>
              ) : (
                <Box
                  gap={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    ปี
                  </Typography>
                  <TextField
                    placeholder="ปี"
                    value={year || ""}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    className="text-extra font-bold px-0"
                  >
                    เดือน
                  </Typography>
                  <FormControl sx={{ width: 300 }}>
                    <Select
                      displayEmpty
                      className="bg-white text-gray-900"
                      value={month || ""}
                      onChange={(e) => {
                        setMonth(e.target.value);
                      }}
                      sx={{
                        borderRadius: "12px",
                        "& .MuiSelect-select": {
                          "&:focus": {
                            backgroundColor: "transparent",
                          },
                        },
                      }}
                    >
                      <MenuItem disabled value="">
                        <p>เดือน</p>
                      </MenuItem>
                      {Object.values(Month).map((month, index) => (
                        <MenuItem key={index} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              <Button
                variant="contained"
                sx={{ backgroundColor: theme.palette.success.main }}
                onClick={handleSearch}
              >
                แสดงผลรายงาน
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default React.memo(ReportSearch);