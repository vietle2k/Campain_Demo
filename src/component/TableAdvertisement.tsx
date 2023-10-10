import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Dialog,
  Button,
  Divider,
  Tab,
  Tabs,
  TextField,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableAdvertisementProps {
  campainFocus: any;
  setCampainFocus: React.Dispatch<React.SetStateAction<any>>;
}

function TableAdvertisement(props: TableAdvertisementProps) {
  const { campainFocus, setCampainFocus } = props;
  const [tableData, setTableData] = useState<any>(campainFocus.ads);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);

  useEffect(() => {
    setTableData(campainFocus.ads);
  }, [campainFocus]);

  const addRow = () => {
    const newRow = {
      id: tableData.length + 1,
      name: `Quảng cáo ${tableData.length + 1}`,
      quantity: 0,
      selected: false,
    };
    setCampainFocus((prev: any) => ({
      ...prev,
      ads: [...prev.ads, newRow],
    }));
  };

  const handleCheckboxChange = (id: number) => {
    const updatedData = tableData.map((row: any) =>
      row.id === id ? { ...row, selected: !row.selected } : row
    );
    setTableData(updatedData);
  };

  const handleSelectAll = () => {
    // console.log("tableData", tableData);
    // console.log("campainFocus", campainFocus);
    let updatedData : any;
    if (selectedAll) {
      updatedData = campainFocus.ads.map((row: any) => ({
        ...row,
        selected: false,
      }));
    } else {
      updatedData = campainFocus.ads.map((row: any) => ({
        ...row,
        selected: true,
      }));
    }
    setCampainFocus((prev : any) => ({
      ...prev,
      ads: updatedData,
    }));
   
    setSelectedAll((prev: any) => !prev);
    // setSelectedAll((prev) => !prev);
  };
  // const handleSelectAll = () => {
  //   let updatedData
  //   if(selectedAll){
  //        updatedData = tableData.map((row: any) => ({
  //           ...row,
  //           selected: false,
  //         }));

  //   }else{
  //        updatedData = tableData.map((row: any) => ({
  //           ...row,
  //           selected: true,
  //         }));
  //          }
  //   setTableData(updatedData);
  //   setSelectedAll((prev: any) => !prev);
  //   console.log("tableData", tableData);
  //    const updatedData = tableData.map((row: any) => ({
  //     ...row,
  //     selected: !selectedAll,
  //  }));
  //   setTableData(updatedData);
  // };
  return (
    <Grid sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Typography
        sx={{
          padding: "16px",
          marginTop: "16px",
          textAlign: "left",
          fontWeight: "500px",
        }}
      >
        DANH SÁCH QUẢNG CÁO
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "60px" }}>
                <Checkbox
                  color="primary"
                  checked={selectedAll}
                  onChange={handleSelectAll}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              {!selectedAll ? (
                <>
                  <TableCell>Tên quảng cáo(*)</TableCell>
                  <TableCell>Số lượng(*)</TableCell>
                </>
              ) : (
                <TableCell colSpan={2} sx={{ textAlign: "left" }}>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      onClick={() => {
                        console.log('campainFocus', campainFocus);
                        setCampainFocus((prev: any) => {
                          const updatedAds = prev.ads.filter(
                            (ad: any, index: any) => ad.selected === false
                          );
                          return { ...prev, ads: updatedAds };
                        });
                        
                      }}
                    />
                  </IconButton>
                </TableCell>
              )}
              <TableCell sx={{ textAlign: "right" }}>
                <Button
                  sx={{
                    color: "#3f51b5",
                    border: "1px solid rgba(63, 81, 181, 0.5)",
                  }}
                  startIcon={<AddIcon />}
                  onClick={() => addRow()}
                >
                  THÊM
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: row.selected
                    ? "rgba(245, 0, 87, 0.08)"
                    : "none",
                }}
              >
                <TableCell sx={{ width: "60px" }}>
                  <Checkbox
                    checked={row.selected}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: "100%" }}
                    id={`name+_{row.id}`}
                    variant="standard"
                    value={row.name}
                    onChange={(e) => {
                      setCampainFocus((prev: any) => {
                        const updatedAds = [...prev.ads];
                        updatedAds[row.id - 1] = {
                          ...updatedAds[row.id - 1],
                          name: e.target.value,
                        };
                        return { ...prev, ads: updatedAds };
                      });
                    }}
                    error={row.errorAdsName}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: "100%" }}
                    id={`quantity_${row.id}`}
                    variant="standard"
                    value={row.quantity}
                    onChange={(e) => {
                      setCampainFocus((prev: any) => {
                        const updatedAds = [...prev.ads];
                        updatedAds[row.id - 1] = {
                          ...updatedAds[row.id - 1],
                          quantity: e.target.value,
                        };
                        const totalQuantity = updatedAds.reduce((acc, ad) => {
                          return acc + Number(ad.quantity || 0);
                        }, 0);

                        return {
                          ...prev,
                          ads: updatedAds,
                          quantity: totalQuantity,
                        };
                      });
                    }}
                    inputProps={{
                      type: "number",
                      pattern: "[0-9]*",
                    }}
                    error={row.errorAdsQuantity}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      onClick={() => {
                      
                        setCampainFocus((prev: any) => {
                          const updatedAds = prev.ads.filter(
                            (ad: any, index: any) => ad.id !== row.id
                          );
                          return { ...prev, ads: updatedAds };
                        });
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default TableAdvertisement;
