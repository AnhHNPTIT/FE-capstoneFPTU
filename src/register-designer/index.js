import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
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
import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from "yup";
import instance from "../configApi/axiosConfig";
import RegisterCunstomerImage from "../images/register-customer.png";

const RegisterDesigner = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [messageCheckBox, setMessageChekbox] = useState("Vui lòng click checkbox");
    const fileInputRef = useRef(null);
    const [selectedCV, setSelectedCV] = useState(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [messageFile, setMessageFile] = useState("");
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
        address: yup.string()
            .required('Vui lòng chọn lịch'),
        confirmPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu xác nhận')
            .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp'),
        gender: yup.string().required("Vui lòng chọn giới tính"),
    });

    const submitData = async (values) => {
        if (!selectedCV) {
            return setMessageFile("Vui lòng chọn 1 file pdf")
        }
        if (!onChangeCheckBox) {
            return setMessageChekbox("Vui lòng click checkbox")
        } else {
            setMessageChekbox("")

            try {
                const formDataFile = new FormData();
                formDataFile.append('file', selectedCV);
                const uploafFile = await instance.post("/upload-file", formDataFile, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (!uploafFile.data.success) {
                    return toast.error("Upload error")
                }
                const data = {
                    fullName: `${values.firstName} ${values.lastName}`,
                    ...values,
                    role: "DESIGNER",
                    cv: uploafFile.data.filename
                }
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
    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            dob: dayjs().subtract(3, 'year'),
            gender: "Male",
            phoneNumber: "",
            password: "",
            address: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await submitData(values)
        },
    });

    const handleButtonClick = () => {
        // Trigger the file input click when the button is clicked
        fileInputRef.current.click();
    };

    const handleCVChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedCV(selectedFile);
            setMessageFile("")
        }
    };

    console.log(errors)

    return (
        <div className="flex items-center justify-center h-screen banner-bg-all">
            <ToastContainer />
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
                        <div className="text-3xl font-bold mb-4"> Đăng ký trở thành Kiến Trúc Sư: </div>
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
                            <div style={{ display: 'flex' }}>
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
                                <div style={{ margin: '8px 0 0 8px' }}>
                                    <FormControl fullWidth sx={{ width: '280px' }}>
                                        <InputLabel id="select-label">Quận/Huyện Tp. Hà Nội</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            id="select"
                                            name="address"
                                            value={values.address}
                                            label="Quận/Huyện Tp. Hà Nội"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Huyện Ba Vì">Huyện Ba Vì </MenuItem>
                                            <MenuItem value="Huyện Chương Mỹ">Huyện Chương Mỹ </MenuItem>
                                            <MenuItem value="Huyện Đan Phượng">Huyện Đan Phượng </MenuItem>
                                            <MenuItem value="Huyện Đông Anh">Huyện Đông Anh </MenuItem>
                                            <MenuItem value="Huyện Gia Lâm">Huyện Gia Lâm </MenuItem>
                                            <MenuItem value="Huyện Hoài Đức">Huyện Hoài Đức </MenuItem>
                                            <MenuItem value="Huyện Mê Linh">Huyện Mê Linh </MenuItem>
                                            <MenuItem value="Huyện Mỹ Đức">Huyện Mỹ Đức </MenuItem>
                                            <MenuItem value="Huyện Phú Xuyên">Huyện Phú Xuyên </MenuItem>
                                            <MenuItem value="Huyện Phúc Thọ">Huyện Phúc Thọ</MenuItem>
                                            <MenuItem value="Huyện Quốc Oai">Huyện Quốc Oai </MenuItem>
                                            <MenuItem value="Huyện Sóc Sơn">Huyện Sóc Sơn</MenuItem>
                                            <MenuItem value="Huyện Thạch Thất">Huyện Thạch Thất</MenuItem>
                                            <MenuItem value="Huyện Thanh Oai">Huyện Thanh Oai</MenuItem>
                                            <MenuItem value="Huyện Thanh Trì">Huyện Thanh Trì</MenuItem>
                                            <MenuItem value="Huyện Thường Tín">Huyện Thường Tín</MenuItem>
                                            <MenuItem value="Quận Bắc Từ Liêm">Quận Bắc Từ Liêm</MenuItem>
                                            <MenuItem value="Huyện Ứng Hòa">Huyện Ứng Hòa</MenuItem>
                                            <MenuItem value="Quận Ba Đình">Quận Ba Đình</MenuItem>
                                            <MenuItem value="Quận Cầu Giấy">Quận Cầu Giấy</MenuItem>
                                            <MenuItem value="Quần Đống Đa">Huyện Ứng Hòa</MenuItem>
                                            <MenuItem value="Quận Hai Bà Trưng">Quận Hai Bà Trưng</MenuItem>
                                            <MenuItem value="Quận Hoàn Kiếm">Quận Hoàn Kiếm</MenuItem>
                                            <MenuItem value="Quận Hoang Mai">Quận Hoàng Mai</MenuItem>
                                            <MenuItem value="Quận Long Biên">Quận Long Biên</MenuItem>
                                            <MenuItem value="Quận Tây Hồ">Quận Tây Hồ</MenuItem>
                                            <MenuItem value="Quận Thanh Xuân">Quận Thanh Xuân</MenuItem>
                                            <MenuItem value="Quận Hà Đông">Quận Hà Đông</MenuItem>
                                            <MenuItem value="Thị xã Sơn Tây">Thị xã Sơn Tây</MenuItem>
                                            <MenuItem value="Quận Nam Từ Liêm">Quận Nam Từ Liêm</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {touched.address && errors.address && <p className="errors-file">{errors.address}</p>}
                                </div>
                            </div>

                            <div>
                                <div className="flex">
                                    <p className="pr-3">Tải lên CV :</p>
                                    <Button variant="contained" onClick={handleButtonClick}>
                                        Chọn file...
                                    </Button>
                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleCVChange}
                                    />
                                    {/* Display the selected CV file name */}
                                    {selectedCV && <p className="pl-2">{selectedCV.name}</p>}

                                </div>
                                {messageFile.length > 0 && <p className="errors-file">{messageFile}</p>}
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
    );
};

export default RegisterDesigner;
