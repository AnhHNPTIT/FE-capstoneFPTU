
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import { Avatar } from "antd";
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import instance from '../configApi/axiosConfig';
import AvatarCustomer from '../images/image-fb.jpg';
import './header.css';


const HeaderComponent = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openNotipush, setOpenNotipush] = useState(null);
    const [openListInAvatar, setOpenListInAvatar] = useState(null);
    const [listType, setListType] = useState([]);
    const open = Boolean(anchorEl);
    const openNotipushBool = Boolean(openNotipush);
    const openListAvatarBool = Boolean(openListInAvatar);
    const [activeElem, setActiveElem] = useState(null);
    const checkRole = JSON.parse(localStorage.getItem('datawebfpt'))?.role || '';

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [formShow, setFormShow] = useState({});
    const [openShowInfo, setOpenShowInfo] = useState(false);

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
        if (checkRole === "ADMIN" || checkRole === "STAFF" || checkRole === "DESIGNER" || checkRole === "CUSTOMER") {
            getUser()
        } else { }
    }, [])


    useEffect(() => {
        async function getListProjectType() {
            try {
                const resData = await instance.get("/get_project_type");
                localStorage.setItem("listType", JSON.stringify(resData.data.data.listProjectType))
                const dataRes = resData.data.data.listProjectType;
                setListType(dataRes)
            } catch (error) {

            }
        }
        getListProjectType();
    }, []);

    const showInfo = (data) => {
        console.log("data == ", data);
        setFormShow(data);
        setOpenShowInfo(true);
    }

    const handleClickOpenNotiPush = (event) => {
        setOpenNotipush(event.currentTarget);
    };

    const handleClickOpenListInAvatar = (event) => {
        setOpenListInAvatar(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseNotipush = () => {
        setOpenNotipush(null);
    };

    const handleCloseListInAvatar = () => {
        setOpenListInAvatar(null);
    };

    const createProject = () => {
        pushLink("/create-project")
    }
    const register = () => {
        pushLink("/register")
    }

    const contract = () => {
        pushLink("/list-contract")
    }

    const policies = () => {
        pushLink("/policiesandtermsofservice")
    }

    const [formEdit, setFormEdit] = useState({
        image: "",
    });

    const [avatarUrl, setAvatarUrl] = useState(AvatarCustomer);
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


    const StyledMenu = styled((props) => (
        <Menu
            elevation={1}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    const pushLink = useNavigate();

    const logout = () => {
        localStorage.removeItem('datawebfpt')
        setOpenListInAvatar(null);
        Cookies.remove('tokenfpt');
        pushLink("/login")
    }

    const renderProject = (id) => {
        handleClose()
        return navigate(`/project-list/${id}`)
    }

    return (
        <div className="header_all flex">
            <div className='bg_header_custom'>
                <motion.div className='flex header-custom'>
                    <motion.div
                        whileHover={{
                            backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                            scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                            padding: "5px 10px"// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                        }}
                        transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                    ><Link to="/home-page" className="icon_home_header">
                            <HomeIcon />
                        </Link>
                    </motion.div>
                    {(checkRole === "ADMIN") &&
                        <motion.div className='cursor-pointer'
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                padding: "5px 10px"
                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                        >
                            <a href='/list-user-admin'>Tài khoản</a>
                        </motion.div>


                    }
                    {(checkRole === "ADMIN" || checkRole === "STAFF") &&
                        <motion.div className='cursor-pointer'
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                padding: "5px 10px"
                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                        >
                            <Link to="/list-schedule" >Lịch hẹn</Link>

                        </motion.div>
                    }

                    {checkRole === "DESIGNER" && (
                        <motion.div
                            className='cursor-pointer'
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5, // Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                padding: "5px 10px"
                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                        >
                            <Link to="/create-schedule" >Lịch hẹn</Link>
                        </motion.div>
                    )}


                    {checkRole === "CUSTOMER" && (
                        <motion.div
                            className='cursor-pointer'
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5, // Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                padding: "5px 10px"
                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                        >
                            <Link to="/user-schedule">Lịch hẹn</Link>
                        </motion.div>
                    )}

                    {(checkRole === "ADMIN" || checkRole === "DESIGNER" || checkRole === "STAFF" || checkRole === "CUSTOMER" || checkRole === "") &&
                        <motion.div className='cursor-pointer'
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5 // Tăng kích thước chữ lên 110% khi trỏ chuột vào

                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổii
                        >
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                style={{ background: 'none', textTransform: 'none' }}
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                Dự án
                            </Button>
                        </motion.div>
                    }
                    {(checkRole === "ADMIN") &&
                        <AnimatePresence>
                            <motion.a key="list-user-staff" onClick={() => setActiveElem('list-user-staff')}>
                                <motion.div
                                    whileHover={{
                                        backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                        scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                        padding: "5px 10px"
                                    }}
                                    transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                                >
                                    <Link to="/list-user-staff" className="cursor-pointer">Nhân viên</Link>
                                </motion.div>
                            </motion.a>
                        </AnimatePresence>
                    }
                    {(checkRole === "ADMIN" || checkRole === "STAFF" || checkRole === "CUSTOMER") &&
                        <motion.div
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                padding: "5px 10px"
                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                        >
                            <Link to="/list-user-designer" className="cursor-pointer">Kiến trúc sư</Link>
                        </motion.div>
                    }
                    {(checkRole === "ADMIN" || checkRole === "STAFF") &&
                        <motion.div
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                padding: "5px 10px"
                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                        >
                            <Link to="/list-user-customer" className="cursor-pointer">Khách hàng</Link>
                        </motion.div>
                    }

                    {(checkRole === "ADMIN" || checkRole === "DESIGNER" || checkRole === "STAFF" || checkRole === "CUSTOMER" || checkRole === "") &&
                        <motion.div
                            whileHover={{
                                backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                                scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                                padding: "5px 10px"
                            }}
                            transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                        >
                            <Link to="/about-screen" className='cursor-pointer'>Doanh nghiệp</Link>
                        </motion.div>
                    }
                    <motion.div
                        whileHover={{
                            backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                            scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                            padding: "5px 10px"
                        }}
                        transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                    >
                        <Link to="/service" className='cursor-pointer'>Dịch vụ </Link>
                    </motion.div>
                </motion.div>
            </div>


            <div className='header_noti_user flex'>
                <div className='cursor-pointer'>
                     </div>

                {checkRole == "" &&
                    <motion.div
                        whileHover={{
                            backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                            scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                            padding: "5px 10px"
                        }}
                        transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                    >
                        <Link to="/login" className='cursor-pointer'>Đăng nhập </Link>
                    </motion.div>
                }
                {checkRole == "" &&
                    <motion.div
                        whileHover={{
                            backgroundColor: "#898989", // Đổi màu nền khi trỏ chuột vào
                            scale: 1.5,// Tăng kích thước chữ lên 110% khi trỏ chuột vào
                            padding: "5px 10px"
                        }}
                        transition={{ duration: 0.2 }} // Thời gian chuyển đổi
                    >
                        <Link to="/register" className='cursor-pointer'>Đăng ký </Link>
                    </motion.div>
                }

                {(checkRole === "ADMIN" || checkRole === "DESIGNER" || checkRole === "STAFF" || checkRole === "CUSTOMER") &&
                    <Button
                        id="listInAvarat-customized-button"
                        aria-controls={openListAvatarBool ? 'listInAvarat-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openListAvatarBool ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        style={{ background: 'none', textTransform: 'none' }}
                        onClick={handleClickOpenListInAvatar}
                    >
                        <Avatar
                            size={50}
                            src={<img src={avatarUrl} alt="avatar" />}
                        />
                    </Button>
                }
            </div>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    listType.length > 0 && listType.map((type, index) => (
                        <>
                            <MenuItem key={index} disableRipple onClick={() => renderProject(type._id)}>
                                {type.nameProjectType}
                            </MenuItem>
                            <Divider />
                        </>
                    ))
                }
            </StyledMenu>


            <StyledMenu
                id="listInAvarat-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'listInAvarat-customized-button',
                }}
                anchorEl={openListInAvatar}
                open={openListAvatarBool}
                onClose={handleCloseListInAvatar}
            >
                {checkRole == "ADMIN" && (
                    <>
                        <MenuItem >
                            <Link to="/profile" className="cursor-pointer">Thông tin cá nhân</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={contract} disableRipple>
                            Hợp đồng
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={createProject} disableRipple>
                            Tạo dự án mới
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem>
                            <Link to="/edit-password" className="cursor-pointer">Đổi mật khẩu</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                            <Link to="/policiesandtermsofservice" className="cursor-pointer" target='_blank'>Điều khoản dịch vụ</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={logout} disableRipple>
                            Đăng xuất
                        </MenuItem>
                    </>
                )}
                {checkRole == "CUSTOMER" && (
                    <>
                        <MenuItem >
                            <Link to="/profile" className="cursor-pointer">Thông tin cá nhân</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                        <Link to="/contract-user" className="cursor-pointer">Hợp đồng</Link>                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                            <Link to="/edit-password" className="cursor-pointer">Đổi mật khẩu</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                            <Link to="/policiesandtermsofservice" className="cursor-pointer" target='_blank'>Điều khoản dịch vụ</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={logout} disableRipple>
                            Đăng xuất
                        </MenuItem>
                    </>
                )}
                {checkRole == "STAFF" && (
                    <>
                        <MenuItem >
                            <Link to="/profile" className="cursor-pointer">Thông tin cá nhân</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={contract} disableRipple>
                            Hợp đồng
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={createProject} disableRipple>
                            Tạo dự án mới
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                            <Link to="/edit-password" className="cursor-pointer">Đổi mật khẩu</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                            <Link to="/policiesandtermsofservice" className="cursor-pointer" target='_blank'>Điều khoản dịch vụ</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={logout} disableRipple>
                            Đăng xuất
                        </MenuItem>
                    </>
                )}
                {checkRole == "DESIGNER" && (
                    <>
                        <MenuItem >
                            <Link to="/profile" className="cursor-pointer">Thông tin cá nhân</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                            <Link to="/working-profile"> Hồ sơ & Công việc</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />

                        <MenuItem >
                            <Link to="/edit-password" className="cursor-pointer">Đổi mật khẩu</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem >
                            <Link to="/policiesandtermsofservice" className="cursor-pointer" target='_blank'>Điều khoản dịch vụ</Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={logout} disableRipple>
                            Đăng xuất
                        </MenuItem>
                    </>
                )}
            </StyledMenu>

            <StyledMenu
                id="notipush-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'notipush-customized-button',
                }}
                anchorEl={openNotipush}
                open={openNotipushBool}
                onClose={handleCloseNotipush}
            >
                <MenuItem>

                    <div className='flex items-center justify-center'>
                        <motion.div className='icon_notipush-yellow'>
                            <CalendarMonthIcon />
                        </motion.div>
                        <div>
                            <p className='item-title-notipush'>Lịch hẹn</p>
                            <p className='item-information-notipush'>Need confirm schedule !!!</p>
                        </div>
                        <p className='read_notipush'></p>

                        <div className=''>
                            <DeleteIcon className='cursor-pointer' />
                        </div>
                    </div>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem>

                    <div className='flex items-center justify-center'>
                        <div className='icon_notipush-green'>
                            <CalendarMonthIcon />
                        </div>
                        <div>
                            <p className='item-title-notipush'>Lịch hẹn</p>
                            <p className='item-information-notipush'>Need confirm schedule !!!</p>
                        </div>
                        <p className='read_notipush'></p>

                        <div className=''>
                            <DeleteIcon className='cursor-pointer' />
                        </div>
                    </div>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />


                <MenuItem>

                    <div className='flex items-center justify-center'>
                        <div className='icon_notipush-green'>
                            <LockIcon />
                        </div>
                        <div>
                            <p className='item-title-notipush'>Lịch hẹn</p>
                            <p className='item-information-notipush'>Need confirm schedule !!!</p>
                        </div>
                        <p className='read_notipush'></p>

                        <div className=''>
                            <DeleteIcon className='cursor-pointer' />
                        </div>
                    </div>
                </MenuItem>
            </StyledMenu>
        </div>

    )
}

export default HeaderComponent;