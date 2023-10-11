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
} from "@mui/material";
import TableAdvertisement from "./TableAdvertisement";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Campaign {
  stt: number;
  name: string;
  quantity: number;
  active: boolean;
  ads: Ad[];
  errorSubCampaign?: boolean;
}

interface Ad {
  id: number;
  name: string;
  quantity: number;
  errorAdsName?: boolean;
  errorAdsQuantity?: boolean;
  selected: boolean;
}

function App() {
  const [value, setValue] = useState<number>(0);
  const [campaign, setCampaign] = useState<string>("");
  const [describe, setDescribe] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [campaignError, setCampaignError] = useState<boolean>(false);
  const [arrCampaign, setArrCampaign] = useState<Campaign[]>([
    {
      stt: 1,
      name: "Chiến dịch con 1",
      quantity: 0,
      active: true,
      ads: [{ id: 1, name: "Quảng cáo 1", quantity: 0, selected: false }],
    },
  ]);
  const [campainFocus, setCampainFocus] = useState<Campaign>({
    stt: 1,
    name: "Chiến dịch con 1",
    quantity: 0,
    active: true,
    ads: [{ id: 1, name: "Quảng cáo 1", quantity: 0, selected: false }],
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleSubmit = () => {
    if (!campaign) {
      setCampaignError(true);
    } else {
      setCampaignError(false);
    }

    const updatedCampaigns = arrCampaign.map((campaign) => {
      const updatedCampaign = { ...campaign };

      if (!campaign.name) {
        updatedCampaign.errorSubCampaign = true;
      } else updatedCampaign.errorSubCampaign = false;

      const updatedAds = updatedCampaign.ads.map((ad) => {
        const updatedAd = { ...ad };

        if (!ad.name) {
          updatedAd.errorAdsName = true;
        } else updatedAd.errorAdsName = false;

        if (ad.quantity === 0 || !ad.quantity) {
          updatedAd.errorAdsQuantity = true;
        } else updatedAd.errorAdsQuantity = false;

        return updatedAd;
      });

      updatedCampaign.ads = updatedAds;

      return updatedCampaign;
    });
    const hasErrors =
      !campaign ||
      updatedCampaigns.filter(
        (campaign) =>
          campaign.errorSubCampaign ||
          campaign.ads.filter((ad) => ad.errorAdsName || ad.errorAdsQuantity)
            .length > 0
      ).length > 0;
    if (!hasErrors) {
      alert("Success");
    } else {
      alert("Vui lòng điền đầy đủ đúng thông tin");
    }
    if (updatedCampaigns) {
      setArrCampaign(updatedCampaigns);
      setCampainFocus(
        updatedCampaigns.find((campaign) => campaign.stt === campainFocus.stt)!
      );
    }
  };

  const renderCampaign = (campaign: Campaign) => {
    return (
      <Card
        key={campaign.stt}
        sx={{
          width: "210px",
          minWidth: "210px",
          height: "120px",
          marginLeft: "16px",
          cursor: "pointer",
          border:
            campaign.stt === campainFocus.stt
              ? "2px solid blue"
              : "2px solid rgb(250, 250, 250)",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        onClick={() => {
          setCampainFocus(campaign);
        }}
      >
        <CardHeader
          titleTypographyProps={{
            fontSize: "18px",
            color:
              campaign.errorSubCampaign ||
              campaign.ads.filter(
                (ad) => ad.errorAdsName || ad.errorAdsQuantity
              ).length > 0
                ? "red"
                : "#000",
          }}
          title={campaign.name}
          action={
            <IconButton
              aria-label="check"
              sx={{ color: campaign.active ? "green" : "silver" }}
            >
              <CheckCircleIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ textAlign: "center", fontSize: "18px" }}>
          {campaign.quantity}
        </CardContent>
      
      </Card>
    );
  };

  useEffect(() => {
    setArrCampaign(
      arrCampaign.map((campaign) =>
        campaign.stt === campainFocus.stt ? campainFocus : campaign
      )
    );
  }, [campainFocus]);

  return (
    <>
      <Grid
        container
        sx={{
          paddingTop: "20px",
          width: "100%",
          display: "flex",
          boxSizing: "border-box",
          borderBottom: "1px solid gray",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: "10px 20px",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={() => handleSubmit()}>
            SUBMIT
          </Button>
        </Box>
        {/* <Divider sx={{width: '100%', color: '#000'}}></Divider> */}
      </Grid>
      <Grid container sx={{ padding: "24px" }}>
        <Grid
          item
          sx={{
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", borderBottom: "1px solid #e0e0e0" }}>
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#3f51b5",
                },
              }}
            >
              {[
                { id: 0, label: "THÔNG TIN" },
                { id: 1, label: "CHIẾN DỊCH CON" },
              ].map((el) => (
                <Tab
                  key={el.id}
                  style={{
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: "15px",
                    // fontFamily:"Roboto, Helvetica, Arial, sans-serif"
                  }}
                  label={el.label}
                  {...a11yProps(el.id)}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ padding: "16px" }}>
            {value === 0 ? (
              <Grid
                item
                xs={12}
                sx={{
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  sx={{ margin: "8px" }}
                  id="standard-basic-1"
                  label="Tên chiến dịch(*)"
                  variant="standard"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  error={campaignError} 
                  helperText={
                    campaignError ? "Vui lòng nhập tên chiến dịch" : ""
                  }
                />
                <TextField
                  sx={{ margin: "8px" }}
                  id="standard-basic-2"
                  label="Mô tả"
                  variant="standard"
                  value={describe}
                  onChange={(e) => setDescribe(e.target.value)}
                />
              </Grid>
            ) : (
              <Grid container sx={{ width: "100%" }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    overflow: "auto",
                    paddingBottom: "2px",
                    display: "flex",
                  }}
                >
                  <div>
                    <IconButton
                      sx={{ backgroundColor: "rgb(237, 237, 237)" }}
                      onClick={() => {
                        setCampainFocus({
                          stt: quantity + 1,
                          name: `Chiến dịch con ${quantity + 1}`,
                          quantity: 0,
                          active: true,
                          ads: [
                            {
                              id: 1,
                              name: "Quảng cáo 1",
                              quantity: 0,
                              selected: false,
                            },
                          ],
                        });
                        setArrCampaign((prev) => [
                          ...prev,
                          {
                            stt: quantity + 1,
                            name: `Chiến dịch con ${quantity + 1}`,
                            quantity: 0,
                            active: true,
                            ads: [
                              {
                                id: 1,
                                name: "Quảng cáo 1",
                                quantity: 0,
                                selected: false,
                              },
                            ],
                          },
                        ]);
                        setQuantity((prev) => prev + 1);
                      }}
                    >
                      <AddIcon sx={{ color: "#f50057" }} />
                    </IconButton>
                  </div>

                  {arrCampaign.map((campaign) => renderCampaign(campaign))}
                </Grid>
                {campainFocus && (
                  <Grid
                    container
                    xs={12}
                    sx={{
                      width: "100%",
                      padding: "8px 8px 0px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item xs={8}>
                      <TextField
                        sx={{ margin: "8px", width: "100%" }}
                        id="standard-basic-1"
                        label="Tên chiến dịch con(*)"
                        variant="standard"
                        value={campainFocus.name}
                        onChange={(e) =>
                          setCampainFocus((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        error={campainFocus.errorSubCampaign} // Apply error style if there's an error
                        helperText={
                          campainFocus.errorSubCampaign
                            ? "Vui lòng nhập tên chiến dịch con"
                            : ""
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                      }}
                    >
                      <Checkbox
                        checked={campainFocus.active}
                        onChange={() => {
                          setCampainFocus((prev) => ({
                            ...prev,
                            active: !campainFocus.active,
                          }));
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <Typography>Đang hoạt động</Typography>
                    </Grid>
                  </Grid>
                )}
                <TableAdvertisement
                  campainFocus={campainFocus}
                  setCampainFocus={setCampainFocus}
                />
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
