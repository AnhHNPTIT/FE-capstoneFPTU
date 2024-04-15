import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Image } from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Cookies from 'js-cookie';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from "yup";
import instance from "../configApi/axiosConfig";
import RegisterCunstomerImage from "../images/register-customer.png";

const RegisterCustomer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [messageCheckBox, setMessageChekbox] = useState("Vui lòng click checkbox");
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const [onChangeCheckBox, setonChangeCheckBox] = useState(false);


    const pushLink = useNavigate();



    const handleClickOnChangeCheckBox = (event) => {
        if (!event.target.checked) {
            setMessageChekbox("Vui lòng click checkbox")
        } else {
            setMessageChekbox("")
        }
        setonChangeCheckBox(event.target.checked);
    }
    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Vui lòng nhập đúng định dạng email")
            .required("Email không được để trống"),
        firstName: yup
            .string()
            .required('Họ không được để trống')
            // .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
        lastName: yup
            .string()
            .required('Tên không được để trống')
            // .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
        dob: yup
            .date()
            .max(new Date(), 'Thời gian chọn không được lớn hơn thời gian hiện tại'),
        phoneNumber: yup
            .string()
            .required('Số điện thoại không được để trống')
            .matches(/^(03|05|07|08|09)+([0-9]{8})$/, 'Không đúng định dạng số điện thoại'),
        password: yup.string()
            .required('Vui lòng nhập mật khẩu xác nhận')
            .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
        confirmPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu xác nhận')
            .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp'),
        customerType: yup.string().required("Vui lòng chon Loại hình"),
        gender: yup.string().required("Vui lòng chon giới tính"),
        businessName: yup.string().when('customerType', {
            is: (customerType) => customerType === "business",
            then: yup.string().required('Vui lòng nhập Tên Doanh Nghiệp'),
            otherwise: yup.string(), // No validation for non-business users
        }),
    });

    const submitData = async (values) => {
        if (!onChangeCheckBox) {
            setMessageChekbox("Vui lòng click checkbox")
        } else {
            setMessageChekbox("")
            const data = {
                fullName: `${values.firstName} ${values.lastName}`,
                ...values,
                role: "CUSTOMER"
            }
            try {
                const dataCreate = await instance.post("/register", data);
                Cookies.set('tokenfpt', dataCreate.data.data.cookie)
                localStorage.setItem("datawebfpt", JSON.stringify(dataCreate.data.data.informationuser))
                pushLink("/home-page");
                return toast.success(dataCreate.data.message)
            } catch (error) {
                if (error.response.status === 402) {
                    return toast.error(error.response.data.errors[0].msg)
                } else if (error.response.status === 400) {
                    return toast.error(error.response.data.message)
                }
                return toast.error("Server error")
            }

        }
    }
    const { values, setValues, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            dob: dayjs().subtract(3, 'year'),
            gender: "Male",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            customerType: "individual",
            businessName: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await submitData(values)
        },
    });


    const handleRadioChange = (event) => {
        const newCustomerType = event.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            customerType: newCustomerType,
            businessName: newCustomerType === "business" ? prevValues.businessName : ""
        }));
    };
  

    return (
        <div className="flex items-center justify-center item-center m-auto h-screen banner-bg-all change-password-custom">
            <ToastContainer />
            <div className="bg-white" style={{ height: "679px" }}>
                <div className="max-w-custom-width-register-designer">
                    <Image
                        width={500}
                        height={679}
                        src={RegisterCunstomerImage}
                        className="bg-white"
                        preview={false}
                    />


                    <div className="with-banner-login-register-designer flex justify-center items-center">
                        <div>
                            <div className="text-xs font-bold  mb-1"> WELCOME </div>
                            <div className="text-3xl font-bold mb-4"> Đăng ký trở thành Khách Hàng </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex">
                                    <div>
                                        <TextField
                                            label="Họ"
                                            id="outlined-start-adornment"
                                            sx={{ m: 1, width: "280px" }}
                                            name="firstName"
                                            onChange={handleChange}
                                            value={values.firstName}
                                            onBlur={handleBlur}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />

                                        {touched.firstName && errors.firstName && <p className="errors-file">{errors.firstName}</p>}
                                    </div>

                                    <div>
                                        <TextField
                                            label="Tên"
                                            id="outlined-start-adornment"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            sx={{ m: 1, width: "280px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />

                                        {touched.lastName && errors.lastName && <p className="errors-file">{errors.lastName}</p>}
                                    </div>



                                </div>

                                <div className="flex">
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{ m: 1, width: "280px" }}
                                                label="Ngày sinh"
                                                defaultValue={values.dob}
                                                name="dob"
                                                onChange={(date) => handleChange({ target: { name: "dob", value: date } })}
                                            />
                                        </LocalizationProvider>
                                        {errors.dob && <p className="errors-file">{errors.dob}</p>}
                                    </div>
                                    <div className="flex">
                                    <div className="text-base mt-1 mr-3 pl-2">Giới tính : </div>
                                    <RadioGroup
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                        value={values.gender}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="Male"
                                            control={
                                                <Radio
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                        "&.Mui-checked": {
                                                            color: "#5B3000", // Change this to the desired checked color
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Nam"
                                        />
                                        <FormControlLabel
                                            value="Nữ"
                                            control={
                                                <Radio
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                        "&.Mui-checked": {
                                                            color: "#5B3000", // Change this to the desired checked color
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Nữ"
                                        />
                                    </RadioGroup>

                                </div>
                            </div>

                                <div>
                                    <TextField
                                        label="Email"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "280px" }}
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email}
                                    />

                                    {touched.email && errors.email && <p className="errors-file">{errors.email}</p>}

                                </div>

                                <div>
                                    <TextField
                                        label="Số điện thoại"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "280px" }}
                                        name="phoneNumber"
                                        onChange={handleChange}
                                    />

                                    {touched.phoneNumber && errors.phoneNumber && <p className="errors-file">{errors.phoneNumber}</p>}
                                </div>

                                <div>
                                    <FormControl sx={{ m: 1, width: "280px" }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Mật khẩu
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            onChange={handleChange}
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
                                        {touched.password && errors.password && <p className="errors-file">{errors.password}</p>}
                                    </FormControl>

                                    <FormControl sx={{ m: 1, width: "280px" }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-confirm-password">
                                            Xác nhận mật khẩu
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-confirm-password"
                                            type={showPasswordConfirm ? "text" : "password"}
                                            name="confirmPassword"
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPasswordConfirm}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPasswordConfirm ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm password"
                                        />
                                        {touched.confirmPassword && errors.confirmPassword && <p className="errors-file">{errors.confirmPassword}</p>}
                                    </FormControl>
                                </div>

                                <div className="flex">
                                    {" "}
                                    <span className="mt-1 mr-4 pl-2"> Bạn là: </span>
                                    <RadioGroup
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="customerType"
                                        row
                                        value={values.customerType}
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel
                                            value="individual"
                                            control={
                                                <Radio
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                        "&.Mui-checked": {
                                                            color: "#5B3000", // Change this to the desired checked color
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Cá Nhân"
                                        />
                                        <FormControlLabel
                                            value="business"
                                            control={
                                                <Radio
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                        "&.Mui-checked": {
                                                            color: "#5B3000", // Change this to the desired checked color
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Doanh Nghiệp"
                                        />
                                    </RadioGroup>

                                    {touched.customerType && errors.customerType && <p className="errors-file">{errors.customerType}</p>}
                                </div>

                                <div>
                                    <TextField
                                        label="Tên Doanh Nghiệp"
                                        id="outlined-start-adornment"
                                        name="businessName"
                                        sx={{ m: 1, width: "580px" }}
                                        value={values.businessName}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),
                                        }}
                                        disabled={values.customerType !== "business" ? true : false}
                                    />
                                    {touched.businessName && errors.businessName && <p className="errors-file">{errors.businessName}</p>}
                                </div>

                                <div >
                                    <Checkbox checked={onChangeCheckBox} onChange={(event) => {
                                        handleClickOnChangeCheckBox(event) 
                                    }} />  Tôi đã đọc, hiểu và  <Link to="/policiesandtermsofservice" className="link-color-register" target='_blank'>đồng ý với các điều khoản và điều kiện của công ty</Link>
                                    {messageCheckBox.length > 0 && <p className="errors-file">{messageCheckBox}</p>}
                                </div>

                                <button
                                    className="custombutton-register-designer"
                                    style={{ margin: "1", width: "100%" }}
                                    type="submit"
                                >
                                    Xác nhận
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomer;
