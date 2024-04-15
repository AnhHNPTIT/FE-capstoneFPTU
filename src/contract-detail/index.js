import React, { useEffect, useState } from "react";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";
// import { Image } from "antd";
import { Button } from '@mui/base/Button';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';
import Fade from '@mui/material/Fade';
import InputAdornment from "@mui/material/InputAdornment";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { css, styled } from '@mui/system';
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Image } from "antd";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import { formatContractCode, formatDate } from "../helper/formatDate";

const ContractList = () => {
    const [formSearch, setFormSearch] = useState({
        codeContract: "",
        nameContract: "",
        customerName: "",
        startDate: "",
        endDate: "",
        nameSignature: ""
    });

    const buttonRef = useRef(null);

    const [formAdd, setFormAdd] = useState({
        codeContract: "",
        nameContract: "",
        customerCode: "",
        nameSignature: "",
        timeSigned: "",
        imageContract: "",
        imageContractGender: "",
        customerName: "",
        custormerId: "",
        designerCode: "",
        designerName: "",
        designerId: ""
    })
    const filePdfRef = useRef(null);
    const [callApiReset, setCallApiReset] = useState(false)
    const [selectedCV, setSelectedCV] = useState(null);

    const handleNumber = (number) => {
        if (number < 10) return `0${number}`
        else return number;
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const des = searchParams.get('des');
        const cus = searchParams.get('cus');

        if (des && cus) {
            setFormAdd(prev => ({
                ...prev,
                customerCode: cus,
                designerCode: des
            }));
        }

        async function getAllUser() {
            try {
                const dataRes = await instance.get('/list_contract');
                const dataDB = dataRes.data.data.listContract;
                const code = 'HD' + handleNumber(dataRes.data.data.count + 1) + formatContractCode();
                setFormAdd(prev => ({
                    ...prev,
                    codeContract: code,
                }));
                const item = [];
                if (dataDB.length > 0) {
                    dataDB.map(item_data => {
                        const objectPush = {
                            'id': item_data._id,
                            'codeContract': item_data.codeContract,
                            'nameContract': item_data.nameContract,
                            'customerCode': item_data.customerCode,
                            'nameSignature': item_data.nameSignature,
                            'timeSigned': formatDate(item_data.timeSigned),
                            'customerName': item_data.customerData[0].fullName,
                            'designerName': item_data.designerData[0].fullName,
                            'action': <div >
                                <button className="bg_edit_account mr-5">
                                    <Link to={`/contract/${item_data._id}`} target="_blank">Xem</Link>
                                </button>
                                <button className="bg_delete_account" onClick={() => deleteContract(item_data._id)}>Xoá</button>
                            </div>
                        };
                        item.push(objectPush); // Push the object to the array
                    });
                    setRowData(item);
                }
            } catch (error) {

                console.log("error == ", error)

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

        getAllUser()

        if (des && cus && buttonRef.current) {
            setTimeout(() => {
                buttonRef.current.click();
            }, 1000);
        }
    }, [callApiReset])

    const handlePdfChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormAdd({ ...formAdd, imageContract: file });
            setSelectedCV(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormAdd({ ...formAdd, imageContractGender: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a PDF file.');
            event.target.value = null;
        }
    }

    const onChangeAddForm = (event, nameProps) => {
        const formAddOld = { ...formAdd };
        formAddOld[event.target.name] = event.target.value
        setFormAdd(formAddOld);
    }

    const columns = [
        { id: 'codeContract', label: 'Mã hợp đồng', minWidth: 170 },
        { id: 'customerName', label: 'Tên khách hàng', minWidth: 100 },
        {
            id: 'nameSignature',
            label: 'Tên người ký',
            minWidth: 170,
        },
        {
            id: 'designerName',
            label: 'Tên kiến trúc sư',
            minWidth: 170,
        },
        {
            id: 'timeSigned',
            label: 'Ngày kí kết',
            minWidth: 170,
        },
        {
            id: 'action',
            label: 'Chi tiết',
            minWidth: 170,
        }
    ];

    const [rowsData, setRowData] = useState([])

    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [idDeleteContract, setIdDeleteContract] = useState();

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const deleteContract = (id) => {
        setOpenDelete(true);
        setIdDeleteContract(id)
    }

    const showContract = (item) => {
        console.log(item);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const deleteContractAsync = async () => {
        try {
            await instance.delete(`/delete_contact/${idDeleteContract}`);
            setCallApiReset(prev => !prev);
            toast.success("Xóa thành công");
            setOpenDelete(false)
        } catch (error) {
            if (error.response.status === 402) {
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

    function removeAllQueryParams() {
        const url = new URL(window.location);

        url.search = '';

        window.history.replaceState({}, '', url);

        window.location.reload();
    }

    const createContract = async () => {
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
            formAdd.imageContract = uploafFile.data.filename;
            delete formAdd.imageContractGender;
            console.log('formAdd == ', formAdd);
            await instance.post("/create_contract", formAdd);
            removeAllQueryParams();
        } catch (error) {
            if (error.response.status === 402) {
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

    const handleButtonClick = () => {
        filePdfRef.current.click();
    };

    const addContract = () => {
        setOpenAdd(true);
    }

    const apiSearch = async () => {
        try {
            const dataSeachForm = {
                codeContract: formSearch.codeContract.trim(),
                nameContract: formSearch.nameContract.trim(),
                startDate: formSearch.startDate.trim,
                endDate: formSearch.endDate.trim,
                nameSignature: formSearch.nameSignature.trim(),
                customerName: formSearch.customerName.trim()
            }
            const dataSearch = await instance.post("/search_contract", dataSeachForm);
            const dataDB = dataSearch.data.data.contract;
            const item = [];
            if (dataDB.length > 0) {
                dataDB.map(item_data => {
                    const objectPush = {
                        'id': item_data._id,
                        'codeContract': item_data.codeContract,
                        'nameContract': item_data.nameContract,
                        'nameSignature': item_data.nameSignature,
                        'timeSigned': formatDate(item_data.createdAt),
                        'customerName': item_data.dataCustomer.fullName,
                        'action': <div >
                            <button className="bg_edit_account mr-5">
                                <Link to={`/contract/${item_data._id}`} target="_blank">Xem</Link>
                            </button>
                            <button className="bg_delete_account" onClick={() => deleteContract(item_data._id)}>Xoá</button>
                        </div>
                    };
                    item.push(objectPush);
                });
                setRowData(item);
            }
        } catch (error) {
            if (error.response.status === 402) {
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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onChangeInput = (event) => {
        const data = {
            ...formSearch,
            [event.target.name]: event.target.value,
        };

        setFormSearch(data);
    };

    const handleDateRangeChange = (newDateRange) => {
        const data = {
            ...formSearch,
            startDate: newDateRange[0],
            endDate: newDateRange[1],
        };
        setFormSearch(data);
    };

    const checkCode = async () => {
        const dataCheck = {
            userCode: formAdd.customerCode
        }
        try {
            const dataRes = await instance.post("/check_contract", dataCheck);
            const dataFind = dataRes.data.data.dataCustomer;
            if (!dataFind?.fullName) {
                return toast.error("Khong ton tai design code")
            } else {
                const dataOle = {
                    ...formAdd,
                    "customerName": dataFind.fullName,
                    "custormerId": dataFind._id
                };
                setFormAdd(dataOle)
            }
        } catch (error) {
            if (error.response.status === 402) {
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

    const checkCodeDes = async () => {
        const dataCheck = {
            userCode: formAdd.designerCode
        }
        try {
            const dataRes = await instance.post("/check_contract", dataCheck);
            const dataFind = dataRes.data.data.dataCustomer;
            if (!dataFind?.fullName) {
                return toast.error("Khong ton tai design code")
            } else {
                const dataOle = {
                    ...formAdd,
                    "designerName": dataFind.fullName,
                    "designerId": dataFind._id
                };
                setFormAdd(dataOle)
            }
        } catch (error) {
            if (error.response.status === 402) {
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

    console.log('formAdd == ', formAdd);

    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            <div className="table-account ">
                <div className="text-4xl bg-account text-white font-bold flex" style={{ alignItems: 'center', height: '100px' }}>
                    <Image
                        height={'100%'}
                        src={VuGia}
                        preview={false}
                    />
                    <div style={{ marginLeft: '40px' }}>Danh sách hợp đồng</div>
                </div>

                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: StyledBackdrop }}
                >
                    <ModalContent >
                        <h2 id="parent-modal-title" className="modal-title">
                            Xóa hợp đồng
                        </h2>
                        <p id="parent-modal-description" className="modal-description">
                            Bạn chắc chắn muốn xóa hợp đồng này chứ
                        </p>

                        <div className="flex justify-end">
                            <button className="pr-5" onClick={handleCloseDelete}>Hủy</button>
                            <button onClick={deleteContractAsync}>Ok</button>
                        </div>


                    </ModalContent>
                </Modal>

                <Modal
                    open={openAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: StyledBackdrop }}
                >
                    <ModalContent
                        sx={{ maxHeight: '900px', overflow: 'auto' }}
                    >
                        <h1 id="parent-modal-title" className="modal-title" style={{ fontWeight: 600 }}>
                            Hợp đồng mới
                        </h1>
                        <div style={{ padding: 20, display: 'flex', gap: 12, flexDirection: 'column' }}>
                            <div className="item flex items-center">
                                <div style={{ width: 200 }}>Mã hợp đồng: </div>
                                <TextField
                                    style={{ width: 242 }}
                                    id="outlined-start-adornment"
                                    name="codeContract"
                                    value={formAdd?.codeContract}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                    disabled
                                />
                            </div>

                            <div className="item flex items-center">
                                <div style={{ width: 200 }}>Tên hợp đồng: </div>
                                <TextField
                                    style={{ width: 242 }}
                                    id="outlined-start-adornment"
                                    name="nameContract"
                                    onChange={(event) => onChangeAddForm(event, "nameContract")}
                                    value={formAdd?.nameContract}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                />
                            </div>

                            <div className="item flex items-center">
                                <div style={{ width: 200 }}>Mã khách hàng: </div>
                                <TextField
                                    style={{ width: 242 }}
                                    id="outlined-start-adornment"
                                    name="customerCode"
                                    onChange={(event) => onChangeAddForm(event, "customerCode")}
                                    value={formAdd?.customerCode}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                />
                                <button
                                    className="custombutton-register-designer"
                                    style={{ width: "100px", marginLeft: '10px' }}
                                    onClick={checkCode}
                                >Kiểm tra</button>
                            </div>
                            <div className="item flex items-center">
                                {
                                    formAdd.customerName && (
                                        <>
                                            <div style={{ width: 200 }}>Tên khách hàng: </div>
                                            <TextField
                                                style={{ width: 242 }}
                                                id="outlined-start-adornment"
                                                name="customerName"
                                                value={formAdd.customerName}
                                                sx={{ m: 1, width: "280px", height: "50px" }}
                                                disabled
                                            />
                                        </>
                                    )
                                }
                            </div>
                            <div className="item flex items-center">
                                <div style={{ width: 200 }}>Mã kiến trúc sư : </div>
                                <TextField
                                    style={{ width: 242 }}
                                    id="outlined-start-adornment"
                                    name="designerCode"
                                    onChange={(event) => onChangeAddForm(event, "designerCode")}
                                    value={formAdd?.designerCode}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                />
                                <button
                                    className="custombutton-register-designer"
                                    style={{ width: "100px", marginLeft: '10px' }}
                                    onClick={checkCodeDes}
                                >Kiểm tra</button>
                            </div>
                            <div className="item flex items-center">
                                {
                                    formAdd.designerName && (
                                        <>
                                            <div style={{ width: 200 }}>Tên kiến trúc sư: </div>
                                            <TextField
                                                style={{ width: 242 }}
                                                id="outlined-start-adornment"
                                                name="designerName"
                                                value={formAdd.designerName}
                                                sx={{ m: 1, width: "280px", height: "50px" }}
                                                disabled
                                            />
                                        </>
                                    )
                                }
                            </div>

                            <div className="item flex items-center">
                                <div style={{ width: 200 }}>Tên người ký: </div>
                                <TextField
                                    style={{ width: 242 }}
                                    id="outlined-start-adornment"
                                    name="nameSignature"
                                    onChange={(event) => onChangeAddForm(event, "nameSignature")}
                                    value={formAdd?.nameSignature}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                />
                            </div>

                            <div className="item flex items-center" style={{ padding: '8px 0' }}>
                                <div style={{ width: 208 }}>Ngày kí kết: </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                                value={formAdd.dob}
                                                onChange={(date) => setFormAdd({ ...formAdd, timeSigned: date })}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>

                            <div className="item flex items-center" style={{ padding: '8px 0' }}>
                                <div style={{ width: 200 }}>Chi tiết: </div>
                                <button
                                    className="custombutton-register-designer"
                                    style={{ width: "120px" }}
                                    type="submit"
                                    onClick={handleButtonClick}
                                >
                                    Tải lên file
                                </button>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={filePdfRef}
                                    style={{ display: 'none' }}
                                    onChange={handlePdfChange}
                                />
                            </div>
                            {formAdd.imageContractGender && (
                                <embed
                                    src={formAdd.imageContractGender}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px"
                                />
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button className="pr-5" onClick={handleCloseAdd}>Hủy</button>
                            <button onClick={createContract}>Tạo</button>
                        </div>
                    </ModalContent>
                </Modal>

                <div className="flex justify-center">
                    <div>
                        <div className="flex mt-5 items-center justify-center">
                            <div className="flex items-center justify-around">
                                <div className="flex items-center justify-around">
                                    <div className="text-2xl font-semibold pr-5">
                                        Mã hợp đồng{" "}
                                    </div>
                                    <TextField
                                        label="Mã hợp đồng"
                                        id="outlined-start-adornment"
                                        name="codeContract"
                                        onChange={onChangeInput}
                                        value={formSearch.codeContract}
                                        sx={{ m: 1, width: "280px" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                <div className="date_time_search flex items-center justify-center pl-10">
                                    <div className="text-2xl font-semibold pr-5">
                                        {" "}
                                        Ngày ký kết{" "}
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                "DatePicker",
                                                "TimePicker",
                                                "DateTimePicker",
                                                "DateRangePicker",
                                            ]}
                                        >
                                            <DemoItem component="DateRangePicker">
                                                <DateRangePicker
                                                    value={[formSearch.startDate, formSearch.endDate]}
                                                    onChange={handleDateRangeChange}
                                                    localeText={{
                                                        start: "",
                                                        end: "",
                                                    }}
                                                />
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="pl-10">
                                    <button
                                        className="custombutton-register-designer"
                                        style={{ width: "150px", marginTop: "5" }}
                                        type="submit"
                                        onClick={apiSearch}
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-5 items-center justify-around">
                            <div >
                                <div className="flex mt-5 items-center justify-around">
                                    <div className="flex items-center justify-around ">
                                        <div className="text-2xl font-semibold pr-5">
                                            Tên người kí{" "}
                                        </div>
                                        <TextField
                                            label="Tên người kí"
                                            id="outlined-start-adornment"
                                            name="nameSignature"
                                            onChange={onChangeInput}
                                            value={formSearch.nameSignature}
                                            sx={{ m: 1, width: "280px", height: "50px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-center pl-10">
                                        <div className="text-2xl font-semibold pr-5">
                                            Tên khách hàng{" "}
                                        </div>
                                        <TextField
                                            label="Tên khách hàng"
                                            id="outlined-start-adornment"
                                            name="customerName"
                                            onChange={onChangeInput}
                                            value={formSearch.customerName}
                                            sx={{ m: 1, width: "280px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-center pl-10 pt-2">
                                        <button
                                            ref={buttonRef}
                                            className="button-add"
                                            style={{ width: "150px", marginTop: "5px" }}
                                            type="submit"
                                            onClick={addContract}
                                        >
                                            Thêm mới <AddIcon></AddIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Paper sx={{ width: '100%', overflow: 'hidden', height: '850px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="px-20 pt-10">
                    <TableContainer sx={{}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead style={{ background: 'linear-gradient(90deg, #422817 0%, #A8653B 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rowsData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </div>

            <div className="border-2 pt-2 pb-2"></div>
            <FooterComponent />
        </div>
    );
};

export default ContractList;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
    );
});



const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
);

const TriggerButton = styled(Button)(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
);