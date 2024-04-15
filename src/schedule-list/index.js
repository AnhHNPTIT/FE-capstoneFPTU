import React, { useEffect, useRef, useState } from "react";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";
// import { Image } from "antd";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from '@mui/material/Paper';
import Select from "@mui/material/Select";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import { LoadingOverlay } from "../helper/loadingOverlay";

const ScheduleList = () => {
    const [formSearch, setFormSearch] = useState({
        customerName: "",
        designerName: "",
        time: "",
        startDate: "",
        endDate: "",
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        { id: 'customerName', label: 'Tên khách hàng', minWidth: 170, fontWeight: 600, fontSize: 20 },
        { id: 'designerName', label: 'Tên kiến trúc sư', minWidth: 100, fontWeight: 600, fontSize: 20 },
        {
            id: 'date',
            label: 'Ngày',
            minWidth: 170, fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 170, fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'status',
            label: 'Trạng thái',
            minWidth: 170, fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'action',
            label: 'Hành động',
            minWidth: 170,
            fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
    ];

    const [rowsData, setRowsData] = useState([])

    const createContract = (item) => {
        return navigate(`/list-contract?des=${item.designerInfo.userCode}&cus=${item.customerInfo.userCode}`);
    }

    useEffect(() => {
        async function getAllUser() {
            try {
                setIsLoading(true);
                const dataRes = await instance.get(`/list-all-schedule`);
                const dataDB = dataRes.data.data;
                const rowData = dataDB.map((item_data, index) => {
                    return {
                        id: item_data.scheduleInfo._id,
                        customerName: item_data.customerInfo?.fullName,
                        designerName: item_data.designerInfo?.fullName,
                        date: item_data.scheduleInfo.timeWork,
                        time: item_data.scheduleInfo.timeSelect === "BRIGHT" ? "Sáng" : "Chiều",
                        status: item_data.scheduleInfo.status,
                        action: (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="bg_confirm_schedule" onClick={() => confirm(item_data, index)}>Cập nhật</button>
                                <button className="bg_confirm_schedule" onClick={() => createContract(item_data)}>Tạo hợp đồng</button>
                            </div>
                        )
                    };
                });

                setRowsData(rowData);
                rowsDataRef.current = rowData;
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                switch (error?.response?.status) {
                    case 402:
                        toast.error(error.response.data.errors[0].msg);
                        break;
                    case 400:
                    case 403:
                        toast.error(error.response.data.message);
                        break;
                }
            }
        }

        getAllUser();
    }, []);

    useEffect(() => {
        console.log(rowsData);
    }, [rowsData]);

    const handleTimeClick = (id) => {
        const index = rowsData.findIndex(row => row.id === id);
        if (index !== -1) {
            const updatedRowData = [...rowsData];
            updatedRowData[index].time = updatedRowData[index].time === "Sáng" ? "Chiều" : "Sáng";
            setRowsData(updatedRowData);
            rowsDataRef.current = updatedRowData;
        } else {
            console.error('Record not found in rowData array');
        }
    };

    const apiSearch = async () => {
        try {
            setIsLoading(true);
            const dataSeachForm = {
                time: formSearch.time,
                designerName: formSearch.designerName,
                customerName: formSearch.customerName,
                startDate: formSearch.startDate,
                endDate: formSearch.endDate,
            };
            const dataRes = await instance.post("/list-search-all-schedule", dataSeachForm);
            const dataDB = dataRes.data.data;
            const rowData = dataDB.map((item_data, index) => {
                return {
                    id: item_data.scheduleInfo._id,
                    customerName: item_data.customerInfo?.fullName,
                    designerName: item_data.designerInfo.fullName,
                    date: item_data.scheduleInfo.timeWork,
                    time: item_data.scheduleInfo.timeSelect === "BRIGHT" ? "Sáng" : "Chiều",
                    status: item_data.scheduleInfo.status,
                    action: (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="bg_confirm_schedule" onClick={() => confirm(item_data, index)}>Cập nhật</button>
                            <button className="bg_confirm_schedule" onClick={() => createContract(item_data)}>Tạo hợp đồng</button>
                        </div>
                    )
                };
            });

            setRowsData(rowData);
            rowsDataRef.current = rowData;
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
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
    };

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'PENDDING':
                return 'pending';
            case 'APPROVED':
                return 'approved';
            case 'REJECT':
                return 'reject';
            default:
                return '';
        }
    };

    const confirm = async (item, id) => {
        try {
            const dataUpdate = {
                status: rowsDataRef.current[id].status,
                timeSelect: rowsDataRef.current[id].time === "Sáng" ? "BRIGHT" : "AFTERNOON",
            };
            setIsLoading(true);
            const dataRes = await instance.patch(`/schedule/${item.scheduleInfo._id}/update`, dataUpdate);
            setIsLoading(false);
            if (dataRes.status === 200) {
                return toast.success(dataRes.data.message)
            }
        } catch (error) {
            setIsLoading(false);
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

    const rowsDataRef = useRef([]);

    const renderStatusSelect = (status, id) => {
        const statusOptions = {
            PENDDING: 'Đang đợi',
            APPROVED: 'Đồng ý',
            REJECT: 'Từ chối'
        };

        return (
            <select
                className={getStatusColorClass(status)}
                onChange={(e) => handleStatusChange(e, id)}
                value={status}
                name="status"
            >
                {Object.entries(statusOptions).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>
        );
    };

    const handleStatusChange = (e, id) => {
        const { value } = e.target;

        setRowsData(prevRowsData =>
            prevRowsData.map(row =>
                row.id === id ? { ...row, status: value } : row
            )
        );

        rowsDataRef.current = rowsDataRef.current.map(row =>
            row.id === id ? { ...row, status: value } : row
        );
    };

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
                    <div style={{ marginLeft: '40px' }}>Danh sách lịch hẹn</div>
                </div>
                {
                    isLoading && <LoadingOverlay />
                }
                <div className="flex justify-center">
                    <div>
                        <div className="flex mt-5 items-center justify-center">
                            <div className="flex items-center justify-around">
                                <div className="flex items-center justify-around">
                                    <div className="text-2xl pr-5">Thời gian</div>
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-select-small-label">
                                            --Chọn--
                                        </InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            defaultValue="All"
                                            id="demo-select-small"
                                            value={formSearch.time}
                                            label="--Choose--"
                                            onChange={onChangeInput}
                                            name="time"
                                        >
                                            <MenuItem value={"All"}>--Chọn--</MenuItem>
                                            <MenuItem value={"BRIGHT"}>Sáng</MenuItem>
                                            <MenuItem value={"AFTERNOON"}>Chiều</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="date_time_search flex items-center justify-center pl-10">
                                    <div className="text-2xl pr-5">
                                        {" "}
                                        Ngày{" "}
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
                                        <div className="text-2xl pr-5">
                                            Tên khách hàng{" "}
                                        </div>
                                        <TextField
                                            size="small"
                                            id="outlined-start-adornment"
                                            name="customerName"
                                            onChange={onChangeInput}
                                            value={formSearch.customerName}
                                            sx={{ m: 1, width: "280px", height: "50px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-center pl-10">
                                        <div className="text-2xl pr-5">
                                            Tên kiến trúc sư{" "}
                                        </div>
                                        <TextField
                                            size="small"
                                            id="outlined-start-adornment"
                                            name="designerName"
                                            onChange={onChangeInput}
                                            value={formSearch.designerName}
                                            sx={{ m: 1, width: "280px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="px-20 pt-10">
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rowsData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead style={{ background: 'linear-gradient(90deg, #422817 0%, #A8653B 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: column.fontWeight, fontSize: column.fontSize }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ overflow: "auto" }}>
                                {rowsData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                if (column.id === "status") {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {renderStatusSelect(row.status, row.id)}
                                                        </TableCell>
                                                    );
                                                } else if (column.id === "time") {
                                                    return (
                                                        <TableCell key={column.id} align={column.align} onClick={() => handleTimeClick(row.id)}>
                                                            {row[column.id]} <KeyboardArrowDownIcon />
                                                        </TableCell>
                                                    );
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row[column.id]}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    ))}
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

export default ScheduleList;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
    );
});
