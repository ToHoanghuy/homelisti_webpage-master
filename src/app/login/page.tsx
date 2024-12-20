"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Style from "./login.module.scss";
import api from "../api/client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../Context/store";
import LoadingPage from "@/components/loadingPage/loading";

function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsernameLogin] = useState("");
  const [password, setPasswordLogin] = useState("");
  const [email, setEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { SETJWT, SETUSERNAME, SETPASSWORD } = useGlobalContext();

  var querystring = require("querystring");

  const handleForgotPassword = () => {
    setLoading(true);
    // Gửi yêu cầu đặt lại mật khẩu tới API
    // Ví dụ: call API reset password
    // Sau khi gửi thành công có thể thông báo và điều hướng người dùng
    setTimeout(() => {
      setLoading(false);
      alert("Password reset link has been sent to your email.");
      router.push("/login"); // Điều hướng về trang đăng nhập sau khi thành công
    }, 2000); // Giả lập thời gian xử lý API
  };

  const handleLogin = () => {
    if (username === "" || password === "") return;
    setLoading(true);
    api
      .post(
        "login/authorize",
        querystring.stringify({
          username: username, 
          password: password,
          grant_type: "password",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res?) => {
        if (res?.data) {
          SETJWT(res.data.access_token);
          SETUSERNAME(username);
          SETPASSWORD(password);
          router.push("myAccount");
        }
      })
      .catch((error) => {
        setLoading(false); // Tắt loading khi có lỗi
        if (error.response) {
          // Lỗi từ API trả về
          console.error("Error response:", error.response);
          alert("Login failed: " + error.response.data.message || "Something went wrong.");
        } else if (error.request) {
          // Lỗi không nhận được phản hồi từ API
          console.error("No response from API:", error.request);
          alert("No response from the server. Please try again later.");
        } else {
          // Lỗi trong việc thiết lập yêu cầu
          console.error("Error message:", error.message);
          alert("An error occurred: " + error.message);
        }
      });
      ;
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div
          style={{
            minHeight: "1065px",
            backgroundColor: "#fff",
          }}
          className="main-container"
        >
          {!showForgotPassword ? (
          <Container
            maxWidth="xl"
            sx={{
              maxWidth: {
                xs: "738px",
                md: "990px",
                lg: "1220px",
              },
              backgroundColor: "#fff",
              marginTop: "86px",
              minHeight: "100vh",
              padding: { xs: "column", lg: "row", md: "0px" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              className={Style.elementColumn}
              sx={{
                width: { xs: "100%", md: "100%", sm: "100%" },
                padding: { xs: "20px", sm: "20px" },
                paddingRight: { md: "0px", lg: "0px" },
              }}
            >
              <Box className={Style.widgetWrap_3}>
                <Box>
                  <Box>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          md: "100%",
                          sm: "100%",
                        },
                      }}
                      className={Style.elementColumn}
                    >
                      <Box className={Style.widgetWrap_2}>
                        <Box
                          className={Style.elementElement}
                          sx={{
                            marginBottom: "50px",
                          }}
                        >
                          <h2 className={Style.mainTitle}>Login</h2>
                        </Box>
                        <Box className={Style.elementElement}>
                          <Box className={Style.ffTContainer}>
                            <Box className={Style.fluentForm}>
                              <div className={Style.inputLabel}>
                                <label className={Style.ff1Title}>
                                  User or E-mail
                                </label>
                              </div>
                              <div>
                                <input
                                  required
                                  type="text"
                                  name="user"
                                  id={Style.namesFirstName}
                                  className={Style.elFormControl}
                                  aria-invalid="false"
                                  aria-required="false"
                                  value={username}
                                  onChange={(e) =>
                                    setUsernameLogin(e.target.value)
                                  }
                                />
                              </div>
                            </Box>
                            <Box className={Style.fluentForm}>
                              <div className={Style.inputLabel}>
                                <label className={Style.ff1Title}>
                                  Password
                                </label>
                              </div>
                              <div className={Style.inputContent}>
                                <input
                                  required
                                  type="password"
                                  name="names[first-name]"
                                  id={Style.namesFirstName}
                                  className={Style.elFormControl}
                                  aria-invalid="false"
                                  aria-required="false"
                                  value={password}
                                  onChange={(e) =>
                                    setPasswordLogin(e.target.value)
                                  }
                                />
                              </div>
                            </Box>
                          </Box>
                          <Box className={Style.wrapSubmit}>
                            <Box className={Style.submitBtn}>
                              <button
                                className={Style.btnSubmit}
                                onClick={handleLogin}
                              >
                                Login
                              </button>
                            </Box>
                            <Box className={Style.checkBox}>
                              <input
                                className={Style.btnCheckBox}
                                id="CheckBox"
                                type="checkbox"
                              />
                              <label className={Style.textCheckBox}>
                                {" "}
                                Remember Me
                              </label>
                            </Box>
                          </Box>
                          <div>
                            <a className={Style.txtForgotPass} href="#"
                            onClick={(e) => {e.preventDefault; setShowForgotPassword(true)}}>
                              Forgot your password?
                            </a>
                            <Box className={Style.submitBtn}>
                              <button
                                className={Style.btnSubmit}
                                onClick={() => {
                                  setLoading(true);
                                  router.push("/register");
                                }}
                              >
                                Sign up
                              </button>
                            </Box>
                          </div>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          ): (

          <Container
            maxWidth="xl"
            sx={{
              maxWidth: {
                xs: "738px",
                md: "990px",
                lg: "1220px",
              },
              backgroundColor: "#fff",
              marginTop: "86px",
              minHeight: "100vh",
              padding: { xs: "column", lg: "row", md: "0px" },
              display: "flex",
              flexDirection: "column",
              
            }}
          >
            <Box
              className={Style.elementColumn}
              sx={{
                width: { xs: "100%", md: "100%", sm: "100%" },
                padding: { xs: "20px", sm: "20px" },
                paddingRight: { md: "0px", lg: "0px" },
                
              }}
            >
              <Box className={Style.widgetWrap_3}>
                <Box className={Style.elementElement} sx={{ marginBottom: "50px" }}>
                  <h2 className={Style.mainTitle}>Forgot Password</h2>
                </Box>
                <Box className={Style.elementElement}>
                  <Box className={Style.ffTContainer}>
                    <Box className={Style.fluentForm}>
                      <div className={Style.inputLabel}>
                        <label className={Style.ff1Title}>Email Address</label>
                      </div>
                      <div>
                        <input
                          required
                          type="email"
                          name="email"
                          id={Style.emailInput}
                          className={Style.elFormControl}
                          aria-invalid="false"
                          aria-required="false"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                      </div>
                    </Box>
                  </Box>
                  <div>
                      <a
                        className={Style.txtForgotPass}
                        onClick={(e) => {e.preventDefault; setShowForgotPassword(false)}}
                        href=""
                      >
                        Back to Login
                      </a>
                    <Box className={Style.submitBtn}>
                      <button
                        className={Style.btnSubmit}
                        onClick={handleForgotPassword}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Submit"}
                      </button>
                    </Box>
                  </div>
                  
                </Box>
              </Box>
            </Box>
          </Container>
          )}
        </div>
      )}
    </>
  );
}

export default Login;
