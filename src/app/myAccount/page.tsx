"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Container,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";

import Style from "./myAccount.module.scss";
import api from "../api/client";

import { useGlobalContext } from "../Context/store";
import { getTransactionById, recordTransaction } from "../../utils/contract";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

interface Window {
  ethereum: any;
}

const MyAccount = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    seller_id: "",
    buyer_id: "",
    product_ids: "",
    created_date: "",
  });

  const handleAddNewClick = () => {
    setShowForm(true);
  };

  // const connectWallet = async () => {
  //   if (window.ethereum) {
  //     try {
  //       // Yêu cầu người dùng kết nối ví
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       const provider = new ethers.BrowserProvider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const userAddress = await signer.getAddress();

  //       setIsConnected(true);
  //       setUserAddress(userAddress);
  //       console.log("Wallet connected: ", userAddress);
  //     } catch (err) {
  //       console.error("Error connecting wallet: ", err);
  //     }
  //   } else {
  //     console.log("MetaMask is not installed");
  //     alert("Please install MetaMask to continue.");
  //   }
  // };

  const disconnectWallet = () => {
    setIsConnected(false);
    setUserAddress(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewEntry({
      seller_id: "",
      buyer_id: "",
      product_ids: "",
      created_date: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
    try {
      const { seller_id, buyer_id, product_ids } = newEntry;
      const transaction = await recordTransaction(parseInt(seller_id), parseInt(buyer_id), parseInt(product_ids));
      console.log("Transaction recorded:", transaction);
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  const handleFetchTransaction = async () => {
    try {
      const result = await getTransactionById(parseInt(transactionId));
      setTransaction(result);
    } catch (err) {
      console.error("Error fetching transaction:", err);
    }
  };
  

  const [userData, setUserData] = useState<any>({
    id: 4,
    first_name: "Bao",
    last_name: "Phan",
    username: "Toretto",
    contact: {
      id: 1,
      location: {
        term_id: 172,
        name: "New Jersey",
        slug: "new-jersey",
        count: 6,
      },
      address: "South stump tavern road, 42",
      phone: "+052015698546",
      whatsapp_number: "+052015698546",
      email: "tom_steven@gmail.com",
    },
    account: {
      id: 1,
      username: "phanchibao007@gmail.com",
      password: "Pcb0941819910",
    },
  });

  const { USERNAME, SETUSERNAME, SETPASSWORD, SETJWT } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    api
      .get(`/user/id?username=${USERNAME}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={Style.wrapper}>
        {/* Breadcrumbs */}
        <Container maxWidth="lg">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className={Style.breadCrumbsContainer}
          >
            <Link
              underline="none"
              color="inherit"
              href="/"
              className={Style.breadCrumbsLink}
            >
              Home
            </Link>
            <Typography
              color="var(--primary-color)"
              className={Style.breadCrumbsLink}
            >
              My Account
            </Typography>
          </Breadcrumbs>
        </Container>

        <Divider />

        <Container maxWidth="lg" className={Style.mainContent}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={3} lg={3} className={Style.sidebar}>
              <Button variant="contained">Account details</Button>
              <Button
                className={Style.logout}
                onClick={() => {
                  SETUSERNAME("");
                  SETPASSWORD("");
                  SETJWT("");
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Username</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.username} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>First name</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.first_name} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Last name</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.last_name} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>E-mail address</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.contact?.email} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Phone</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.contact?.phone} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Address</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.contact?.address} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <Button fullWidth variant="contained">
                    Update Account
                  </Button>

                  <Grid style={{marginTop:10}}>
                    <Button onClick={handleAddNewClick} fullWidth variant="contained">
                      add new trade
                    </Button>
                  </Grid>
                  <div>
                    {isConnected ? (
                      <div>
                        <p>Connected: {userAddress}</p>
                        <button onClick={disconnectWallet}>Disconnect Wallet</button>
                      </div>
                    ) : (
                      <div>
                        {/* <button onClick={connectWallet}>Connect Wallet</button> */}
                      </div>
                    )}
                  </div>

                  {/* <div>
                  <h2>Fetch Transaction by ID</h2>
                  <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                  <button onClick={handleFetchTransaction}>Fetch Transaction</button>

                  {transaction && (
                <div style={{ marginTop: 20, backgroundColor:'blue' }}>
                  <Typography variant="h6">Transaction Details</Typography>
                  <Typography><strong>Transaction ID:</strong> {(String(transaction[0])).toLocaleString()}</Typography>
                  <Typography><strong>Buyer ID:</strong> {(String(transaction[1])).toLocaleString()}</Typography>
                  <Typography><strong>Seller ID:</strong>{(String(transaction[2])).toLocaleString()}</Typography>
                  <Typography><strong>Property ID:</strong>{(String(transaction[3])).toLocaleString()}</Typography>
                  <Typography><strong>Timestamp:</strong> {new Date(Number(transaction[4]) * 1000).toLocaleString()}</Typography>
                </div>
              )}
                </div>  */}
                <section>
                  <Typography variant="h4" gutterBottom>Fetch Transaction by ID</Typography>
                  <TextField
                    label="Enter Transaction ID"
                    variant="outlined"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    fullWidth
                  />
                  <Button variant="contained" color="primary" onClick={handleFetchTransaction}>
                    Fetch Transaction
                  </Button>

                  {transaction && (
                    <Box mt={4} bgcolor="" p={2} borderRadius={2}>
                      <Typography variant="h6" color="white">Transaction Details</Typography>
                      <Typography color="black"><strong>Transaction ID:</strong> {String(transaction[0])}</Typography>
                      <Typography color="black"><strong>Buyer ID:</strong> {String(transaction[1])}</Typography>
                      <Typography color="black"><strong>Seller ID:</strong> {String(transaction[2])}</Typography>
                      <Typography color="black"><strong>Property ID:</strong> {String(transaction[3])}</Typography>
                      <Typography color="black"><strong>Timestamp:</strong> {new Date(Number(transaction[4]) * 1000).toLocaleString()}</Typography>
                    </Box>
                  )}
                </section>   

                  <Dialog open={showForm} onClose={handleCloseForm}>
                    <DialogTitle>Add New Entry</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Seller ID"
                        name="seller_id"
                        value={newEntry.seller_id}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Buyer ID"
                        name="buyer_id"
                        value={newEntry.buyer_id}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Product IDs (comma-separated)"
                        name="product_ids"
                        value={newEntry.product_ids}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Created Date"
                        name="created_date"
                        type="date"
                        value={newEntry.created_date}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseForm} color="secondary">
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                      </Button>


                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default MyAccount;
