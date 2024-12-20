"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Style from "./formInfo.module.scss";
import api from "@/app/api/client";
import { useGlobalContext } from "@/app/Context/store";

import {
  Container,
  Box,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  Button,
  styled,
} from "@mui/material";

import SellIcon from "@mui/icons-material/Sell";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const priceType = [
  { label: "Fixed" },
  { label: "Negotiable" },
  { label: "On Call" },
];

const priceUnit = [
  { label: "Year(yr)" },
  { label: "Month(mo)" },
  { label: "Total Price(total)" },
];

const bed = [
  { id: 19, label: "1" },
  { id: 20, label: "2" },
  { id: 21, label: "3" },
  { id: 22, label: "4" },
  { id: 23, label: "5" },
  { id: 24, label: "6" },
];

const bath = [
  { id: 25, label: "1" },
  { id: 26, label: "2" },
  { id: 27, label: "3" },
  { id: 28, label: "4" },
];

const amenitiesCheck = [
  { label: "TV cable" },
  { label: "Gym" },
  { label: "Microwave" },
  { label: "Air conditioning" },
  { label: "Swimming pool" },
  { label: "Outdoor Shower" },
  { label: "Sauna" },
  { label: "Barbeque" },
  { label: "Laudry" },
  { label: "Lawn" },
  { label: "Washer" },
  { label: "Refrigerator" },
];

const categoryCheck = [
  { label: "Real Estate" },
  { label: "Health & Medical" },
  { label: "Home Services" },
  { label: "Restaurants" },
  { label: "Education" },
];

interface properties {
  listingType: string;
  category: number;
  loading: boolean;
}

const FormInfo = (props: properties) => {
  const [listingTitle, setListingTitle] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [listingDescription, setListingDescription] = useState("");
  const [listingParking, setListingParking] = useState(-1);
  const [listingBed, setListingBed] = useState(-1);
  const [listingBath, setListingBath] = useState(-1);
  const [listingTV, setListingTV] = useState(-1);
  const [listingAir, setListingAir] = useState(-1);
  const [listingBarbeque, setListingBarbeque] = useState(-1);
  const [listingGym, setListingGym] = useState(-1);
  const [listingSwim, setListingSwim] = useState(-1);
  const [listingLaundry, setListingLaundry] = useState(-1);
  const [listingMicrowave, setListingMicrowave] = useState(-1);
  const [listingOutdoor, setListingOutdoor] = useState(-1);
  const [listingLawn, setListingLawn] = useState(-1);
  const [listingRefRigerator, setListingRefrigerator] = useState(-1);
  const [listingSauna, SetListingSauna] = useState(-1);
  const [listingWasher, setListingWasher] = useState(-1);
  const { JWT } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null); 

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files) {
    // Tạo một đối tượng FormData
    const formData = new FormData();

    // Duyệt qua các file và thêm chúng vào FormData
    Array.from(files).forEach((file) => {
      formData.append("images", file); // "images" là tên trường sẽ được backend sử dụng
    });

    // Lưu formData vào state (hoặc gửi đi ngay lập tức)
    setFormData(formData);
  }
};


  const handleCheckAmenities = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case "TV cable":
        if (target.checked) setListingTV(1);
        else setListingTV(-1);
        break;
      case "Air conditioning":
        if (target.checked) setListingAir(2);
        else setListingAir(-1);
        break;
      case "Barbeque":
        if (target.checked) setListingBarbeque(3);
        else setListingBarbeque(-1);
        break;
      case "Gym":
        if (target.checked) setListingGym(4);
        else setListingGym(-1);
        break;
      case "Swimming pool":
        if (target.checked) setListingSwim(5);
        else setListingSwim(-1);
        break;
      case "Laudry":
        if (target.checked) setListingLaundry(6);
        else setListingLaundry(-1);
        break;
      case "Microwave":
        if (target.checked) setListingMicrowave(7);
        else setListingMicrowave(-1);
        break;
      case "Outdoor Shower":
        if (target.checked) setListingOutdoor(8);
        else setListingOutdoor(-1);
        break;
      case "Lawn":
        if (target.checked) setListingLawn(9);
        else setListingLawn(-1);
        break;
      case "Refrigerator":
        if (target.checked) setListingRefrigerator(10);
        else setListingRefrigerator(-1);
        break;
      case "Sauna":
        if (target.checked) SetListingSauna(11);
        else SetListingSauna(-1);
        break;
      case "Washer":
        if (target.checked) setListingWasher(12);
        else setListingWasher(-1);
        break;
      default:
        break;
    }
  };

  const handleParkingChange = (event: any) => {
    setListingParking(event.target.value);
    console.log('parking: ', listingParking);
  };

  const router = useRouter();

  useEffect(() => {
    if (props.category) {
        console.log("Category ID:", props.category);
    } else {
        console.log("Category ID is missing");
    }
  }, [props.category]);

  useEffect(() => {
    if (props.listingType) {
        console.log("listing type ID:", props.listingType);
    } else {
        console.log("listing type ID is missing");
    }
  }, [props.listingType]);

  const handleSubmitForm = () => {
    // if (!formData) {
    //   console.log('khong co anh');
    //   return;
    // }
    console.log(props.category);
    console.log(props.listingType);
    if (JWT !== "") {
      api.defaults.headers.common = { Authorization: `Bearer ${JWT}` };
      //const formData = new FormData();

    // Thêm ảnh vào formData
    // selectedImage.forEach((image) => {
    //   formData.append("images", image); // 'images' là tên trường cho file ảnh
    // });
      api
        .post(
          `Listings?author_id=15&title=${listingTitle}&price=${listingPrice}&category_id=${props.category}&description=${listingDescription}&listing_type=${props.listingType}&tv=${listingTV}&air=${listingAir}&barbeque=${listingBarbeque}&gym=${listingGym}&swim=${listingSwim}&laundry=${listingLaundry}&microwave=${listingMicrowave}&outdoor=${listingOutdoor}&lawn=${listingLawn}&refrigerator=${listingRefRigerator}&sauna=${listingSauna}&washer=${listingWasher}&parking=${listingParking}&bed=${listingBed}&bath=${listingBath}`, 
          // formData, {
          //   headers: {
          //     "Content-Type": "multipart/form-data", // Đảm bảo gửi đúng loại dữ liệu là multipart/form-data
          //   },
          // }
          //   {
          //     headers: {
          //       Authorization: `Bearer ${JWT}`,
          //     },
          //   }
        )
        .then((res) => {
          if (res) {
            console.log(res);
            router.push("/property");
          }
        })
        .catch((e) => {
          console.log(e);
          router.push("/property");
        });
    }
  };

  const handleSubmitForm11 = () => {

    const formData = new FormData();
    formData.append("author_id", "15");
    formData.append("title", listingTitle);
    formData.append("price", listingPrice);
    formData.append("category_id", props.category.toString());
    formData.append("description", listingDescription);
    formData.append("listing_type", props.listingType);
    formData.append("tv", listingTV.toString());
    formData.append("air", listingAir.toString());
    formData.append("barbeque", listingBarbeque.toString());
    formData.append("gym", listingGym.toString());
    formData.append("swim", listingSwim.toString());
    formData.append("laundry", listingLaundry.toString());
    formData.append("microwave", listingMicrowave.toString());
    formData.append("outdoor", listingOutdoor.toString());
    formData.append("lawn", listingLawn.toString());
    formData.append("refrigerator", listingRefRigerator.toString());
    formData.append("sauna", listingSauna.toString());
    formData.append("washer", listingWasher.toString());
    formData.append("parking", listingParking.toString());
    formData.append("bed", listingBed.toString());
    formData.append("bath", listingBath.toString());
  
    // Thêm các ảnh đã chọn vào formData
    selectedImage.forEach((image, index) => {
      formData.append(`images`, image); // Thêm ảnh vào FormData
    });

    if (JWT !== "") {
      api.defaults.headers.common = { Authorization: `Bearer ${JWT}` };
      api
      .post("/Listings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Response:", res.data);
        router.push("/property");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };
  return (
    <Box
      sx={{
        minHeight: {
          xs: "2430px",
          sm: "2330px",
          md: "1000px",
          lg: "1000px",
          xl: "1000px",
        },
        backgroundColor: "#eaf7f4",
      }}
    >
      <Box className={Style.contentArea}>
        <Container className={Style.container}>
          <Box className={Style.mainForm}>
            <div className={Style.mainContent}>
              <div className={Style.pageContentInner}>
                <div className={Style.post2363}>
                  <div className={Style.homeListingForm}>
                    <Box className={Style.adTypeSelection}>
                      <Box className={Style.posSectionTitle}>
                        <h3 className={Style.section}>
                          <InsertPhotoIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Listing Information
                        </h3>
                      </Box>
                      <Box className={Style.formGroup}>
                        <label className={Style.category}>
                          Title
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <input
                          id="outlined-basic"
                          value={listingTitle}
                          onChange={(e) => setListingTitle(e.target.value)}
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box className={Style.posSectionTitle}>
                        <h3>Pricing</h3>
                      </Box>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          className={Style.formSetting}
                        >
                          <FormControlLabel
                            value="Price"
                            control={
                              <Radio
                                className={Style.settingRadio}
                                style={{ transform: "scale(0.7)" }}
                              />
                            }
                            label="Price"
                          />
                          <FormControlLabel
                            value="Price Range"
                            control={
                              <Radio
                                className={Style.settingRadio}
                                style={{ transform: "scale(0.7)" }}
                              />
                            }
                            label="Price Range"
                          />
                          <FormControlLabel
                            value="Disable"
                            control={
                              <Radio
                                className={Style.settingRadio}
                                style={{ transform: "scale(0.7)" }}
                              />
                            }
                            label="Disable"
                          />
                        </RadioGroup>
                      </FormControl>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>
                          Price Type
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={priceType}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select price type" />
                          )}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>
                          Price [$]
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <input
                          id="outlined-basic"
                          value={listingPrice}
                          onChange={(e) => setListingPrice(e.target.value)}
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>Price Unit</label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={priceUnit}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select price type" />
                          )}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>
                          Amenities
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <div className={Style.checkBox}>
                          <FormGroup
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            {amenitiesCheck.map((value) => (
                              <FormControlLabel
                                key={value.label}
                                control={
                                  <Checkbox
                                    name={value.label}
                                    onChange={handleCheckAmenities}
                                  />
                                }
                                label={value.label}
                                className={Style.checkLabel}
                              />
                            ))}
                          </FormGroup>
                        </div>
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>
                          Type
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <FormControl sx={{ marginLeft: "10px" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className={Style.formSetting}
                          >
                            <FormControlLabel
                              value="Price"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Apartment"
                            />
                            <FormControlLabel
                              value="Price Range"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Office"
                            />
                            <FormControlLabel
                              value="Disable"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Restaurant"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>
                          Parking
                          <span className={Style.requireStar}>*</span>
                        </label>
                        <FormControl sx={{ marginLeft: "10px" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className={Style.formSetting}
                            onChange={handleParkingChange}
                          >
                            <FormControlLabel
                              //value="Price"
                              value = "16"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Yes"
                            />
                            <FormControlLabel
                              //value="Price Range"
                              value = "17"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="No"
                            />
                            <FormControlLabel
                              //value="Disable"
                              value = "18"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="Another"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>Bedroom</label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={bed}
                          onChange={(e, value) => {
                            setListingBed(value?.id || 1);
                          }}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{ marginBottom: "10px !important" }}
                      >
                        <label className={Style.category}>Bathroom</label>
                        <Autocomplete
                          className={Style.comboBox}
                          disablePortal
                          id="combo-box-demo"
                          options={bath}
                          onChange={(e, value) => {
                            setListingBath(value?.id|| 1);
                          }}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>Purpose</label>
                        <FormControl sx={{ marginLeft: "10px" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className={Style.formSetting}
                          >
                            <FormControlLabel
                              value="Price"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="For Sell"
                            />
                            <FormControlLabel
                              value="Price Range"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="For Buy"
                            />
                            <FormControlLabel
                              value="Disable"
                              control={
                                <Radio
                                  className={Style.settingRadio}
                                  style={{ transform: "scale(0.7)" }}
                                />
                              }
                              label="For Rent"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box className={Style.formGroup}>
                        <label className={Style.category}>Location</label>
                        <input
                          id="outlined-basic"
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box className={Style.formGroup}>
                        <label className={Style.category}>Build Year</label>
                        <input
                          id="outlined-basic"
                          className={Style.inputStyle}
                        />
                      </Box>
                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <InsertPhotoIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Panorama Image
                        </h3>
                      </Box>

                      <Button
                        sx={{
                          backgroundColor: "#00c194 !important",
                          marginBottom: "10px",
                        }}
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput onChange={handleImageChange} type="file" />
                      </Button>


                      {selectedImage.map((image, index) => (
                          <img key={index} src={image} alt={`Uploaded ${index}`} width="100" height="100" />
                      ))}


                      <Box
                        className={Style.formGroup}
                        sx={{
                          marginBottom: "10px !important",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <label className={Style.category}>Description</label>
                        <textarea
                          name="names[first-name]"
                          className={Style.textArea}
                          aria-invalid="false"
                          aria-required="false"
                          onChange={(e) => setListingDescription(e.target.value)}
                        ></textarea>
                      </Box>

                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <PersonIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Image
                        </h3>

                        <div className={Style.uploadImage}>
                          <p>Drop files here to add them</p>
                          <Button
                            sx={{
                              backgroundColor: "#00c194 !important",
                              marginBottom: "10px",
                            }}
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                          >
                            Browse file
                            <VisuallyHiddenInput  type="image" />
                          </Button>
                        </div>

                        <div className={Style.alertDanger}>
                          <p>Recommended image size to (1170x650)px</p>
                          <p>Image maximum size 3 MB.</p>
                          <p>Allowed image type (png, jpg, jpeg).</p>
                          <p>Allowed image type (png, jpg, jpeg).</p>
                        </div>
                      </Box>
                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <LinkIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Video URL
                        </h3>
                        <input
                          style={{ margin: "0" }}
                          id="outlined-basic"
                          className={Style.inputStyle}
                          placeholder="Only Youtube & Vimeo URL"
                        />
                        <small className={Style.formText}>
                          E.g. https://www.youtube.com/watch?v=RiXdDGk_XCU,
                          https://vimeo.com/620922414
                        </small>
                      </Box>

                      <Box
                        className={Style.posSectionTitle}
                        sx={{
                          marginBottom: "10px !important",
                          display: "flex",
                          flexDirection: "column !important",
                          alignItems: "flex-start !important",
                        }}
                      >
                        <h3>
                          <SellIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Yelp Nearby Places
                        </h3>
                        <div
                          style={{ width: "70% !important" }}
                          className={Style.checkBox}
                        >
                          <FormGroup
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            {categoryCheck.map((value) => (
                              <FormControlLabel
                                key={value.label}
                                control={<Checkbox />}
                                label={value.label}
                                className={Style.checkLabel}
                              />
                            ))}
                          </FormGroup>
                        </div>
                      </Box>

                      <Box className={Style.posSectionTitle}>
                        <h3>
                          <PersonIcon
                            sx={{
                              fontSize: "18px",
                              marginRight: "5px",
                              fontWeight: "600",
                            }}
                          />
                          Contact Details
                        </h3>
                        <div className={Style.rowFix}>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              State
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Phone
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Zip code
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Facebook
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Address
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                          <Box
                            className={Style.formGroup}
                            sx={{
                              marginBottom: "10px !important",
                              width: "50% !important",
                            }}
                          >
                            <label className={Style.category}>
                              Email
                              <span className={Style.requireStar}>*</span>
                            </label>
                            <input
                              id="outlined-basic"
                              className={Style.inputStyle}
                              style={{ width: "95% !important" }}
                            />
                          </Box>
                        </div>

                        <Button
                          sx={{
                            marginTop: "20px",
                            backgroundColor: "#00c194",
                            fontWeight: "700",
                          }}
                          variant="contained"
                          onClick={handleSubmitForm}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default FormInfo;
