import CreateIcon from '@mui/icons-material/Create';
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { Avatar, Image } from "antd";
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import instance from '../configApi/axiosConfig';
import { formatDate } from '../helper/formatDate';
import AvatarCustomer from '../images/image-fb.jpg';
import ProfileHeader from "../images/Backgroundheaderprofile.jpg";
import './index.css';

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const fileImageRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState(AvatarCustomer);

    const [formEdit, setFormEdit] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        image: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const dataRes = await instance.get('/profile-me');
                const dataDB = dataRes.data.data;
                setFormEdit(dataDB[0])
                if (dataDB[0].imageUser) {
                    setAvatarUrl(`http://localhost:8000/img/${dataDB[0].imageUser}`);
                }
            } catch (error) {
                if (error?.response?.status === 402) {
                    return toast.error(error.response.data.errors[0].msg)
                } else if (error.response.status === 400) {
                    return toast.error(error.response.data.message)
                } else if (error.response.status === 403) {
                    return toast.error(error.response.data.message)
                } else {
                    return toast.error("Server error")
                }
            }
        }

        getUser()
    }, [])

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatarUrl(newAvatarUrl);

            const newData = {
                ...formEdit,
                "image": file,
            };
            setFormEdit(newData);
        }
    };

    const onChangeValueInput = (event) => {
        const { name, value } = event.target;
        setFormEdit(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    function validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    const update = async () => {
        if (formEdit.phoneNumber.length !== 10) {
            return toast.error("Số điện thoại không hợp lệ")
        }
        if (!formEdit.fullName) {
            return toast.error("Tên không được để trống")
        }
        if (!formEdit.email) {
            return toast.error("Email không được để trống")
        }
        if (!validateEmail(formEdit.email)) {
            return toast.error("Email không hợp lệ");
        }
        if (!formEdit.dob) {
            return toast.error("Ngày sinh không được để trống")
        }
        let listData;
        if (formEdit.image) {
            const formDataFileOne = new FormData();
            formDataFileOne.append('file', formEdit.image);
            const resOneFile = await instance.post("/upload-file", formDataFileOne, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            listData = {
                ...formEdit,
                image: resOneFile.data.filename,
            }
        } else {
            listData = {
                ...formEdit,
                image: formEdit.imageUser
            }
        }

        await instance.post("/update_profile", listData);
        toast.success("Cập nhật thông tin thành công")
        return navigate('/home-page')
    }

    return (
        <div className="h-screen">
            <ToastContainer />
            <Image
                height={'340px'}
                width={'100%'}
                src={ProfileHeader}
                preview={false}
            />
            <div className='flex' style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: '-80px'
            }}>
                <h1 style={{ fontWeight: 900, fontSize: '50px' }}>Hồ sơ</h1>
                <div className='flex' style={{ flexDirection: 'column', gap: '5px', textAlign: 'center' }}>
                    <Avatar
                        size={287}
                        src={<img src={avatarUrl} alt="avatar" />}
                    />
                    <p style={{ fontSize: '40px' }}>
                        {formEdit?.fullName}
                    </p>
                    <p style={{ fontSize: '24px' }}>{formEdit?.email}</p>
                    {
                        isEdit && <CreateIcon style={{
                            position: 'absolute',
                            top: '267px',
                            color: 'white',
                            transform: 'translateX(208px)',
                            fontSize: '2rem',
                            cursor: 'pointer'
                        }} onClick={() => fileImageRef.current.click()} />
                    }
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        ref={fileImageRef}
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                    />
                </div>
                <button className='profile-edit' onClick={() => setIsEdit(true)}>Chỉnh sửa</button>
            </div>
            <div className='flex' style={{ width: '800px', margin: '50px auto', flexDirection: 'column', gap: '10px' }}>
                <div className="item flex items-center">
                    <div style={{ width: 240, fontSize: '36px' }}>Tên: </div>
                    <TextField
                        style={{ width: 590 }}
                        id="outlined-start-adornment"
                        name="fullName"
                        sx={{ m: 1, width: "280px", height: "50px" }}
                        value={formEdit?.fullName}
                        disabled={!isEdit}
                        onChange={(data) => onChangeValueInput(data, "fullName")}
                        inputProps={{
                            style: { textAlign: 'center' }
                        }}
                    />
                </div>
                <div className="item flex items-center">
                    <div style={{ width: 240, fontSize: '36px' }}>Email </div>
                    <TextField
                        style={{ width: 590 }}
                        id="outlined-start-adornment"
                        name="email"
                        sx={{ m: 1, width: "280px", height: "50px" }}
                        disabled={!isEdit}
                        value={formEdit?.email}
                        onChange={(data) => onChangeValueInput(data, "email")}
                        inputProps={{
                            style: { textAlign: 'center' }
                        }}
                    />
                </div>
                <div className="item flex items-center">
                    <div style={{ width: 240, fontSize: '36px' }}>Số điện thoại </div>
                    <TextField
                        style={{ width: 590 }}
                        id="outlined-start-adornment"
                        name="phoneNumber"
                        sx={{ m: 1, width: "280px", height: "50px" }}
                        disabled={!isEdit}
                        value={formEdit?.phoneNumber}
                        onChange={(data) => onChangeValueInput(data, "phoneNumber")}
                        inputProps={{
                            style: { textAlign: 'center' }
                        }}
                    />
                </div>
                <div className="item flex items-center">
                    <div style={{ width: 240, fontSize: '36px' }}>Ngày sinh </div>
                    {!isEdit && <TextField
                        style={{ width: 590 }}
                        id="outlined-start-adornment"
                        name="codeContract"
                        sx={{ m: 1, width: "280px", height: "50px" }}
                        value={formatDate(formEdit?.dob)}
                        disabled={!isEdit}
                        inputProps={{
                            style: { textAlign: 'center' }
                        }}
                    />
                    }
                    {
                        isEdit && <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    "DatePicker",
                                    "TimePicker",
                                    "DateTimePicker",
                                    "DateRangePicker",
                                ]}
                            >
                                <DemoItem component="DateRangePicker">
                                    <DatePicker
                                        value={dayjs(formEdit?.dob)}
                                        onChange={(date) => setFormEdit({ ...formEdit, dob: date.toISOString() })}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    }
                </div>
                <div className="item flex items-center" style={{ margin: '0 auto', marginTop: '20px' }}>
                    <button className='profile-edit'>
                        <Link to={'/edit-password'} target="_blank" >Đổi mật khẩu</Link>
                    </button>
                </div>
            </div>

            <div className='profile-footer'>
                {
                    isEdit && <>
                        <button className='profile-edit' onClick={() => setIsEdit(false)}>Hủy bỏ</button>
                        <button className='profile-edit' onClick={update}>Xác nhận</button>
                    </>
                }
            </div>
        </div>
    );
}

export default Profile;
