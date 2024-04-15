import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Image } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import instance from "../configApi/axiosConfig";
import BannerLogin from "../images/banner_login.png";
import BackgroundImage from '../images/logo_banner_001.png';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Login = () => {
    const [value, setValue] = useState(0);

    const handleChangeSetValue = (event, newValue) => {
        setValue(newValue);
    };

    const [formEmail, setFormEmail] = useState({
        email: "",
        password: ""
    })

    const [formPhone, setFormPhone] = useState({
        phoneNumber: "",
        password: ""
    })
    const [onChangeCheckBox, setonChangeCheckBox] = useState(false);
    const handleClickOnChangeCheckBox = () => {
        setonChangeCheckBox((show) => !show);
    };

    useEffect(() => {
        const dataEmail = JSON.parse(localStorage.getItem('data_Login_email')) || {
            email: "",
            password: ""
        };

        const dataPhone = JSON.parse(localStorage.getItem('data_Login_phone')) || {
            phoneNumber: "",
            password: ""
        };

        setFormEmail(dataEmail)
        setFormPhone(dataPhone)

    }, [])

    const pushLink = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const submitData = async () => {
        try {
            const dataCreate = await instance.post("/login_email", formEmail);
            Cookies.set('tokenfpt', dataCreate.data.data.cookie)
            localStorage.setItem("datawebfpt", JSON.stringify(dataCreate.data.data.informationuser))

            pushLink("/home-page");
            if (onChangeCheckBox) {
                localStorage.setItem("data_Login_email", JSON.stringify(formEmail))
            } else {
                localStorage.removeItem("data_Login_email")
            }
        } catch (error) {

            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg)
            } else if (error.response.status === 400) {
                return toast.error(error.response.data.message)
            }
            return toast.error("Server error")
        }
    };

    const submitDataPhone = async () => {
        try {
            const dataCreate = await instance.post("/login_phone", formPhone);
            Cookies.set('tokenfpt', dataCreate.data.data.cookie)
            localStorage.setItem("datawebfpt", JSON.stringify(dataCreate.data.data.informationuser))
            if (onChangeCheckBox) {
                localStorage.setItem("data_Login_phone", JSON.stringify(formPhone))
            } else {
                localStorage.removeItem("data_Login_phone")
            }

            pushLink("/home-page");
        } catch (error) {
            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg)
            } else if (error.response.status === 400) {
                return toast.error(error.response.data.message)
            }
            return toast.error("Server error")
        }
    };



    const handleChangePhone = (event) => {
        const object = {
            ...formPhone,
            [event.target.name]: event.target.value
        }
        setFormPhone(object);
    }

    const handleChangeEmail = (event) => {
        const object = {
            ...formEmail,
            [event.target.name]: event.target.value
        }
        setFormEmail(object);
    }

    return (
        <div className="flex items-center justify-center item-center m-auto h-screen banner-bg-all change-password-custom"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <div className="bg-white" style={{ height: "679px" }}>
                <div className="max-w-custom-width-register-designer">
                    <Image
                        width={'50%'}
                        height={679}
                        src={BannerLogin}
                        className="bg-white"
                        preview={false}
                    />

                    <div className="flex items-center justify-center item-center m-auto" style={{ width: "50%" }}>
                        <Box>
                            <Box
                                sx={{ borderColor: "divider" }}
                                className="flex items-center justify-center item-center"
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChangeSetValue}
                                    aria-label="basic tabs example"
                                >
                                    <Tab label="Số điện thoại" {...a11yProps(0)} />
                                    <Tab label="Email" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <div className="flex items-center justify-center item-center ">
                                {value == 0 && <CustomTabPanel
                                    value={value}
                                    index={0}
                                    style={{ width: "330px" }}
                                    className="flex items-center justify-center m-auto"
                                >
                                    <TextField
                                        label="Số điện thoại"
                                        sx={{ m: 1, width: "280px" }}
                                        name="phoneNumber"
                                        onChange={handleChangePhone}
                                        value={formPhone.phoneNumber}
                                    />

                                    <FormControl sx={{ m: 1, width: "280px" }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Mật Khẩu
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formPhone.password}
                                            onChange={handleChangePhone}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />

                                    </FormControl>
                                </CustomTabPanel>}

                                {value == 1 && <CustomTabPanel value={value} index={1} style={{ width: "330px" }} className="flex items-center justify-center m-auto">
                                    <TextField
                                        label="Email"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "280px" }}
                                        name="email"
                                        onChange={handleChangeEmail}
                                        value={formEmail.email}
                                    />

                                    <FormControl
                                        sx={{ m: 1, width: "280px" }}
                                        variant="outlined"
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Mật Khẩu
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formEmail.password}
                                            onChange={handleChangeEmail}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />

                                    </FormControl>
                                </CustomTabPanel>}
                            </div>
                            <div className="flex items-center justify-around item-center m-auto mb-5">
                                <button
                                    className="custombutton-register-designer"
                                    style={{ width: "300px" }}
                                    type="submit"
                                    onClick={value == 0 ? submitDataPhone : submitData}
                                >
                                    Đăng Nhập
                                </button>
                            </div>

                            <div
                                className="flex items-center justify-around item-center m-auto"
                                style={{ width: "330px" }}
                            >
                                <div className="flex items-center">
                                    <Checkbox
                                        checked={onChangeCheckBox}
                                        onChange={(event) => {
                                            handleClickOnChangeCheckBox(event);
                                        }}
                                    />{" "}
                                    Ghi nhớ mật khẩu
                                </div>
                                <Link href="/edit-password-otp" className="link-color-register">
                                    {" "}
                                    Quên mật khẩu
                                </Link>
                            </div>

                            <div
                                className="flex items-center justify-around item-center m-auto"
                                style={{ width: "330px", margin: '10px' }}
                            >
                                <span className="border w-36 mr-5" />
                                HOẶC <span className="border w-36 ml-5" />
                            </div>

                            <div className="flex justify-around m-auto">
                                <div>
                                    Bạn chưa có tài khoản ?{" "}
                                    <Link href="/register" className="pl-3 pr-3">
                                        {" "}
                                        Đăng ký{" "}
                                    </Link>{" "}
                                    bây giờ !!
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    );
};

export default Login;
