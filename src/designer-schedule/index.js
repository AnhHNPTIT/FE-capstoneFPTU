import { Input as AntdInput, Button, Calendar, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import { LoadingOverlay } from "../helper/loadingOverlay";

const { Option } = Select;

const DesignerSchedule = () => {
    const { designer_id } = useParams();
    const [designerInfo, setDesignerInfo] = useState({});
    const [userInfo, setuserInfo] = useState({});
    const [userId, setUserId] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [place, setPlace] = useState('');
    const [note, setNote] = useState('');
    const [scheduleId, setScheduleId] = useState('');
    const [scheduleBooked, setScheduleBooked] = useState({});
    const [busyDate, setBusyDate] = useState([]);
    const [workOnDate, setWorkOnDate] = useState([]);
    const [penddingDate, setPenddingDate] = useState([]);

    const checkRole = JSON.parse(localStorage.getItem('datawebfpt'))?.role || '';

    const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
    const [waitingForApprovalModalVisible, setWaitingForApprovalModalVisible] = useState(false);
    const [confirmBookModalVisible, setConfirmBookModalVisible] = useState(false);
    const [isBooked, setIsBooked] = useState(false)
    const [isBookedBefore, setIsBookedBefore] = useState(false)
    const [timeOwnPending, setTimeOwnPending] = useState('')
    const [popupBusy, setPopupBusy] = useState(false);
    const [mesBusy, setMesBusy] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const [calendarRes, designerRes] = await Promise.all([
                    instance.get(`/schedule/${designer_id}/busy-dates`),
                    instance.post(`/update-designer/${designer_id}`)
                ]);
                setBusyDate(calendarRes.data.busyDates);
                setWorkOnDate(calendarRes.data.workOnDates);
                setUserId(calendarRes.data.designerId)
                setScheduleId(calendarRes.data.scheduleId);
                setIsBooked(calendarRes.data?.isSelectBook);
                setIsBookedBefore(calendarRes.data?.isSelectBefore)
                setDesignerInfo(designerRes.data.message[0].dataDesigner[0]);
                setuserInfo(designerRes.data.userInfo);
                setPenddingDate(calendarRes.data.pendingDates);
                if (calendarRes.data.scheduleId) {
                    const res = await instance.get(`/schedule/${calendarRes.data.scheduleId}`);
                    setTimeOwnPending(res.data.data)
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [designer_id]);

    const handleTimeChange = (value) => {
        setTimeOfDay(value);
    };

    const handleDateSelect = async (date) => {
        const formattedDate = dayjs(date);
        const formattedDateString = formattedDate.format('YYYY-MM-DD');

        if (penddingDate && penddingDate.includes(formattedDateString)) {
            setWaitingForApprovalModalVisible(true);
            return;
        }

        if ((new Date()).toLocaleDateString('en-GB') > formattedDate.format('DD/MM/YYYY')) {
            return;
        }

        if (busyDate && busyDate.includes(formattedDateString) && !workOnDate.includes(formattedDateString)) {
            const scheduleInfo = await instance.get(`/schedule/${designer_id}/graySchedule`, {
                params: {
                    timeWork: formattedDateString
                }
            });
            if (scheduleInfo.data.data.length > 0 && scheduleInfo.data.data[0].description_off) {
                setPopupBusy(true);
                setMesBusy(scheduleInfo.data.data[0].description_off)
            } else if (scheduleInfo.data.data.length === 0) {
                setPopupBusy(true);
                setMesBusy('Lịch này đã có người đặt')
            }
            return;
        }

        if (isBooked && workOnDate.length > 0) {
            if (checkRole === 'ADMIN' || checkRole === 'STAFF') {
                if (workOnDate.includes(formattedDateString)) {
                    setIsLoading(true);
                    const scheduleInfo = await instance.get('/schedule/user-info', {
                        params: {
                            timeWork: formattedDateString
                        }
                    });
                    if (scheduleInfo.data.data.length > 0) {
                        setScheduleBooked(scheduleInfo.data.data[0]);
                        setConfirmBookModalVisible(true);
                    }
                    setIsLoading(false);
                    return;
                }
                setSelectedDateModalVisible(true);
                setSelectedDate(formattedDateString);
            } else {
                setIsLoading(true);
                const scheduleInfo = await instance.get('/schedule/user-info', {
                    params: {
                        timeWork: formattedDateString
                    }
                });
                if (scheduleInfo.data.data.length > 0) {
                    setScheduleBooked(scheduleInfo.data.data[0]);
                    setConfirmBookModalVisible(true);
                }
                setIsLoading(false);
            }
            return;
        }

        setSelectedDateModalVisible(true);
        setSelectedDate(formattedDateString);
    };

    const handleDateModalOk = () => {
        if (!timeOfDay) {
            return toast.error('Vui lòng chọn thời gian đặt lịch');
        }
        if (!place) {
            return toast.error('Vui lòng chọn địa điểm đặt lịch');
        }
        Modal.confirm({
            title: 'Xác nhận đặt lịch',
            content: 'Bạn có chắc chắn muốn đặt lịch với nhà thiết kế này không?',
            okText: 'Xác nhận',
            cancelText: 'Hủy bỏ',
            onOk() {
                if (checkRole === 'ADMIN' || checkRole === 'STAFF') {
                    instance.post(`/schedule/${designer_id}/book`, {
                        timeSelect: timeOfDay,
                        id_schedule: designer_id,
                        description_book: note,
                        timeWork: selectedDate,
                        phoneNumber: phoneNumber,
                        email: email,
                        place: place,
                        role: checkRole
                    }).then(response => {
                        window.location.reload();
                    }).catch(error => {
                        if (error.response.status === 402) {
                            return toast.error(error.response.data.errors[0].msg)
                        } else if (error.response.status === 400) {
                            return toast.error(error.response.data.message)
                        } else if (error.response.status === 403) {
                            return toast.error(error.response.data.message)
                        } else {
                            return toast.error("Server error")
                        }
                    });
                    setSelectedDateModalVisible(false);
                } else {
                    if (!isBookedBefore) {
                        instance.post(`/schedule/${designer_id}/book`, {
                            timeSelect: timeOfDay,
                            id_schedule: scheduleId,
                            description_book: note,
                            timeWork: selectedDate,
                            phoneNumber: phoneNumber,
                            email: email,
                            place: place,
                            role: checkRole
                        }).then(response => {
                            window.location.reload();
                        }).catch(error => {
                            if (error.response.status === 402) {
                                return toast.error(error.response.data.errors[0].msg)
                            } else if (error.response.status === 400) {
                                return toast.error(error.response.data.message)
                            } else if (error.response.status === 403) {
                                return toast.error(error.response.data.message)
                            } else {
                                return toast.error("Server error")
                            }
                        });
                        setSelectedDateModalVisible(false);
                    } else {
                        toast.error('Bạn đã đặt lịch hẹn với kiến trúc sư này');
                    }
                }
            },
            onCancel() {
                // Không làm gì nếu người dùng hủy
            },
        });
    };

    const handleDateModalCancel = () => {
        setSelectedDateModalVisible(false);
    };

    const customDateCellRender = (date, busyDate, workOnDate, penddingDate) => {
        if (!busyDate) {
            return <div></div>;
        }

        const busyDateObjects = busyDate.map(dateString => dayjs(dateString));
        const isBusyDate = busyDateObjects.find(d => d.isSame(date, 'day'));

        const workOnDateObjects = workOnDate.map(dateString => dayjs(dateString));
        const isWorkOnDate = workOnDateObjects.find(d => d.isSame(date, 'day'));

        const penddingDateObjects = penddingDate.map(dateString => dayjs(dateString));
        const isPendingDate = penddingDateObjects.find(d => d.isSame(date, 'day'));

        // Màu mặc định nếu không phải ngày bận hoặc ngày làm việc
        let backgroundColor = 'transparent';

        // Nếu là ngày bận, thì sử dụng màu xám
        if (isBusyDate) {
            backgroundColor = 'gray';
        }

        // Nếu là ngày làm việc, sử dụng màu xanh
        if (isWorkOnDate) {
            if (designer_id !== userId) {
                backgroundColor = 'gray';
            } else {
                backgroundColor = 'green';
            }
        }

        if (isPendingDate) {
            backgroundColor = 'yellow';
        }

        return (
            <div style={{ backgroundColor: backgroundColor, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            </div>
        );
    };

    const CustomCalendar = ({ busyDate, workOnDate }) => {
        return (
            <div>
                <Calendar cellRender={(date) => customDateCellRender(date, busyDate, workOnDate, penddingDate)} onSelect={handleDateSelect} />
                {
                    checkRole === "CUSTOMER" && (
                        <>
                            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: 'gray', marginRight: '5px' }}></div>
                                <span>Ngày bận của kiến trúc sư</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: '1px solid #000', marginRight: '5px' }}></div>
                                <span>Ngày có thể chọn và đặt lịch</span>
                            </div>
                        </>
                    )
                }
            </div>
        );
    };

    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            <div style={{ padding: '50px' }}>
                <h1 style={{ fontWeight: 'bold' }}>Lịch trình của kiến trúc sư {designerInfo?.fullName}</h1>
                <CustomCalendar busyDate={busyDate} workOnDate={workOnDate} />
                {
                    isLoading && <LoadingOverlay />
                }
                <Modal
                    title="Đặt lịch hẹn"
                    open={selectedDateModalVisible}
                    onOk={handleDateModalOk}
                    onCancel={handleDateModalCancel}
                >
                    <Form>
                        <Form.Item label="Tên nhà thiết kế">
                            <Input disabled value={designerInfo?.fullName} />
                        </Form.Item>
                        <Form.Item label="Ngày">
                            <Input disabled value={selectedDate} />
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            <Select onChange={handleTimeChange} value={timeOfDay}>
                                <Option value="BRIGHT">Sáng: 8h00 - 11h30</Option>
                                <Option value="AFTERNOON">Chiều: 14h00 - 17h30</Option>
                            </Select>
                        </Form.Item>
                        {checkRole === 'DESIGNER' ? (
                            <>
                                <Form.Item label="Số điện thoại">
                                    <Input value={designerInfo.phoneNumber} disabled />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input value={designerInfo.email} disabled />
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item label="Số điện thoại">
                                    <Input value={userInfo.phoneNumber} disabled />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input value={userInfo.email} disabled />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item label="Địa điểm">
                            <Input value={place} onChange={(e) => setPlace(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ghi chú">
                            <AntdInput.TextArea value={note} onChange={(e) => setNote(e.target.value)} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Thông báo"
                    visible={waitingForApprovalModalVisible}
                    onCancel={() => setWaitingForApprovalModalVisible(false)}
                    footer={[
                        <Button key="ok" onClick={() => setWaitingForApprovalModalVisible(false)}>
                            OK
                        </Button>
                    ]}
                >
                    <p>Đang chờ phê duyệt</p>
                </Modal>
                <Modal
                    title="Thông báo"
                    visible={popupBusy}
                    onCancel={() => setPopupBusy(false)}
                    footer={[
                        <Button key="ok" onClick={() => setPopupBusy(false)}>
                            OK
                        </Button>
                    ]}
                >
                    <p>{mesBusy}</p>
                </Modal>
                <Modal
                    title="Thông báo lịch hẹn"
                    visible={confirmBookModalVisible}
                    onCancel={() => setConfirmBookModalVisible(false)}
                    footer={[
                        <Button key="ok" onClick={() => setConfirmBookModalVisible(false)}>
                            OK
                        </Button>
                    ]}
                >
                    <Form>
                        <Form.Item label="Tên nhà thiết kế">
                            <Input disabled value={designerInfo?.fullName} />
                        </Form.Item>
                        <Form.Item label="Ngày">
                            <Input disabled value={scheduleBooked?.timeWork} />
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            <Select value={scheduleBooked?.timeSelect}>
                                {scheduleBooked?.timeSelect === "BRIGHT" ? <Option value="BRIGHT">Sáng: 8h00 - 11h30</Option> : <Option value="AFTERNOON">Chiều: 14h00 - 17h30</Option>}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input disabled value={userInfo?.phoneNumber} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input disabled value={userInfo?.email} />
                        </Form.Item>
                        <Form.Item label="Địa điểm">
                            <Input disabled value={scheduleBooked?.place} />
                        </Form.Item>
                        <Form.Item disabled label="Ghi chú">
                            <AntdInput.TextArea disabled value={scheduleBooked?.description_book} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <FooterComponent />
        </div >
    );
};

export default DesignerSchedule;
