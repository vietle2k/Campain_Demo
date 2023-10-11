import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
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
    setCampainFocus((prev: any) => ({
      ...prev,
      ads: updatedData,
    }));
  };

  const handleSelectAll = () => {
    const areAllSelected = tableData.every((row: any) => row.selected);

    const updatedData = tableData.map((row: any) => ({
      ...row,
      selected: !areAllSelected,
    }));
  
    setCampainFocus((prev: any) => ({
      ...prev,
      ads: updatedData,
    }));
  
    setSelectedAll(!areAllSelected);
  };

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
                  indeterminate={selectedAll ? tableData.length > 0 && !tableData.every((row : any) => row.selected) : false}
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
                        setCampainFocus((prev: any) => {
                          const updatedAds = prev.ads.filter(
                            (ad: any) => ad.selected === false
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
