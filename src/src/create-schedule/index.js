import { Input as AntdInput, Button, Calendar, Checkbox, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import { LoadingOverlay } from "../helper/loadingOverlay";

const { Option } = Select;

const CreateSchedule = () => {
    const [userId, setUserId] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [email, setEmail] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [phoneNumberEdit, setPhoneNumberEdit] = useState('');
    const [noteEdit, setNoteEdit] = useState('');
    const [scheduleId, setScheduleId] = useState('');

    const [busyDate, setBusyDate] = useState([]);
    const [workOnDate, setWorkOnDate] = useState([]);
    const [penddingDate, setPenddingDate] = useState([]);

    const checkRole = JSON.parse(localStorage.getItem('datawebfpt'))?.role || '';

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
    const [selectedDateModalValue, setSelectedDateModalValue] = useState(null);
    const [confirmChecked, setConfirmChecked] = useState(false);
    const [isBooked, setIsBooked] = useState(false)
    const [scheduleBooked, setScheduleBooked] = useState({});
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [popupBusy, setPopupBusy] = useState(false);
    const [mesBusy, setMesBusy] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const calendarRes = await instance.get('/create-schedule');
                setBusyDate(calendarRes.data.busyDates);
                setWorkOnDate(calendarRes.data.workOnDates);
                setPenddingDate(calendarRes.data.pendingDates);
                setUserId(calendarRes.data.designerId)
                setScheduleId(calendarRes.data.scheduleId);
                setIsBooked(calendarRes.data?.isSelectBook);
                const userData = await instance.post(`/update-designer/${calendarRes.data.designerId}`);
                setUserData(userData.data.message[0].dataDesigner[0])
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleEdit = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        if (!noteEdit) {
            return toast.error('Vui lòng điền lí do nghỉ');
        }
        if (confirmChecked) {
            Modal.confirm({
                title: 'Xác nhận',
                content: 'Bạn có chắc chắn muốn xác nhận thời gian làm việc?',
                onOk() {
                    // Handle OK button click
                    setBusyDate([...busyDate, ...selectedDates]);
                    setModalVisible(false);
                    setIsLoading(true);
                    instance.post('/schedule/confirm', {
                        timeWorkOn: selectedDates,
                        description_off: noteEdit,
                        email: email
                    }).then(response => {
                        console.log('Request thành công:', response.data);
                    }).catch(error => {
                        console.error('Đã xảy ra lỗi:', error);
                    });
                    setSelectedDates([]);
                    setConfirmChecked(false); // Reset checkbox
                    setSelectedDateModalVisible(false);
                    setIsLoading(false);
                },
                onCancel() {
                    // Handle Cancel button click
                },
            });
        } else {
            toast.error("Bạn cần xác nhận với thời gian làm việc trước khi xác nhận.");
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedDates([]);
        setConfirmChecked(false);
    };

    const handleDateSelectEdit = (date) => {
        const formattedDate = dayjs(date);
        const formattedDateString = formattedDate.format('YYYY-MM-DD');

        if (busyDate && busyDate.includes(formattedDateString)) {
            return;
        }

        setSelectedDateModalValue(formattedDate);
        setSelectedDates(prevSelectedDates => [...prevSelectedDates, formattedDateString]);
    };

    const handleDateSelect = async (date) => {
        try {
            const formattedDate = dayjs(date);
            const formattedDateString = formattedDate.format('YYYY-MM-DD');
            if (busyDate && busyDate.includes(formattedDateString) && !workOnDate.includes(formattedDateString)) {
                const scheduleInfo = await instance.get(`/schedule/${userId}/graySchedule`, {
                    params: {
                        timeWork: formattedDateString
                    }
                });
                if (scheduleInfo.data.data.length > 0 && scheduleInfo.data.data[0].description_off) {
                    setPopupBusy(true);
                    setMesBusy(scheduleInfo.data.data[0].description_off)
                }
                return;
            }
            setIsLoading(true);
            const scheduleInfo = await instance.get('/schedule/designer-info', {
                params: {
                    timeWork: formattedDateString
                }
            });
            setScheduleBooked(scheduleInfo.data.data);
            setSelectedDateModalVisible(true);
            setSelectedDate(date);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            return toast.error('Bạn không thể đặt lịch cho chính mình')
        }
    };

    const customDateCellRender = (date, busyDate, workOnDate, penddingDate) => {
        if (!busyDate || !workOnDate) {
            return <div></div>;
        }

        const busyDateObjects = busyDate.map(dateString => dayjs(dateString));
        const isBusyDate = busyDateObjects.find(d => d.isSame(date, 'day'));

        const workOnDateObjects = workOnDate.map(dateString => dayjs(dateString));
        const isWorkOnDate = workOnDateObjects.find(d => d.isSame(date, 'day'));

        const penddingDateObjects = penddingDate.map(dateString => dayjs(dateString));
        const isPendingDate = penddingDateObjects.find(d => d.isSame(date, 'day'));

        let backgroundColor = 'transparent';

        if (isBusyDate) {
            backgroundColor = 'gray';
        }

        if (isWorkOnDate) {
            backgroundColor = 'green';
        }

        if (isPendingDate) {
            backgroundColor = 'yellow';
        }

        return (
            <div style={{ backgroundColor: backgroundColor, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            </div>
        );
    };

    const handleConfirmCheckboxChange = (e) => {
        setConfirmChecked(e.target.checked);
    };

    const CustomCalendar = ({ busyDate }) => {
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
                {
                    checkRole === "DESIGNER" && (
                        <Button onClick={handleEdit}>Chọn ngày nghỉ</Button>
                    )
                }
                <CustomCalendar busyDate={busyDate} />
                {
                    isLoading && <LoadingOverlay />
                }
                <Modal
                    title="Chọn ngày nghỉ"
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Calendar
                        onSelect={(date) => handleDateSelectEdit(date.format('YYYY-MM-DD'))}
                        cellRender={(date) => {
                            const formattedDate = date.format('YYYY-MM-DD');
                            return (
                                <div
                                    style={{
                                        backgroundColor: selectedDates && selectedDates.includes(formattedDate) ? 'blue' :
                                            busyDate && busyDate.includes(formattedDate) ? 'gray' :
                                                workOnDate && workOnDate.includes(formattedDate) ? 'green' :
                                                    'transparent',

                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => handleDateSelectEdit(formattedDate)}
                                >
                                </div>
                            );
                        }}
                    />
                    <Form>
                        <Form.Item label="Email">
                            <Input value={userData.email} disabled />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input value={userData.phoneNumber} disabled />
                        </Form.Item>
                        <Form.Item label="Ghi chú">
                            <AntdInput.TextArea value={noteEdit} onChange={(e) => setNoteEdit(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox onChange={handleConfirmCheckboxChange}>Chắc chắn với thời gian làm việc</Checkbox>
                        </Form.Item>
                    </Form>
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
                    visible={selectedDateModalVisible}
                    onCancel={() => setSelectedDateModalVisible(false)}
                    footer={[
                        <Button key="ok" type="primary" onClick={() => setSelectedDateModalVisible(false)}>
                            OK
                        </Button>
                    ]}
                >
                    <Form>
                        <Form.Item label="Tên khách hàng">
                            <Input disabled value={scheduleBooked.user?.fullName} />
                        </Form.Item>
                        <Form.Item label="Ngày">
                            <Input disabled value={scheduleBooked.schedule?.timeWork} />
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            <Select value={scheduleBooked.schedule?.timeSelect}>
                                {scheduleBooked.schedule?.timeSelect === "BRIGHT" ? <Option value="BRIGHT">Sáng: 8h00 - 11h30</Option> : <Option value="AFTERNOON">Chiều: 14h00 - 17h30</Option>}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input disabled value={scheduleBooked.user?.phoneNumber} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input disabled value={scheduleBooked.user?.email} />
                        </Form.Item>
                        <Form.Item label="Địa điểm">
                            <Input disabled value={scheduleBooked.schedule?.place} />
                        </Form.Item>
                        <Form.Item disabled label="Ghi chú">
                            <AntdInput.TextArea disabled value={scheduleBooked.schedule?.description_book} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <FooterComponent />
        </div >
    );
};

export default CreateSchedule;
