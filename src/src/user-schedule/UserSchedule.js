import { Card } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from '../footer';
import HeaderComponent from '../header';
import { LoadingOverlay } from '../helper/loadingOverlay';

const { Meta } = Card;

const ScheduleCard = ({ key, designerName, scheduleInfo }) => {
    const currentDate = dayjs();
    const bookedDate = dayjs(scheduleInfo.timeWork);
    const daysUntilBooked = bookedDate.diff(currentDate, 'day');

    return (
        <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'rgba(102, 112, 133, 0.20)', width: '80%', padding: '50px', margin: '0 auto' }}>
                <div style={{ width: '182px', height: '210px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        fontSize: '32px',
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'blue',
                        width: '100%',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                        textAlign: 'center',
                    }}>{dayjs(scheduleInfo.timeWork).format('ddd')}</div>
                    <div style={{
                        backgroundColor: 'white', width: '100%', height: '100%', borderBottomLeftRadius: '15px',
                        borderBottomRightRadius: '15px', textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 62 }}>{dayjs(scheduleInfo.timeWork).format('DD')}</div>
                        <div style={{ fontSize: 20 }}>{dayjs(scheduleInfo.timeWork).format('MM')}</div>
                    </div>
                </div>
                <div style={{ marginLeft: 100, fontSize: 40, fontWeight: 500, color: 'black', fontFamily: 'Roboto' }}>
                    {
                        scheduleInfo.timeSelect === "AFTERNOON" ? <p>- Chiều : 14h00 – 17h30</p> : <p>- Sáng : 8h30 - 11h00</p>
                    }
                    <p>- Tên kiến trúc sư: {designerName.fullName}</p>
                    {
                        daysUntilBooked > 0 && <p>- Còn {daysUntilBooked} ngày ...</p>
                    }
                    {
                        daysUntilBooked == 0 && <p>Bạn nên đến điểm đặt lịch hẹn thôi, muộn giờ rồi đấy !</p>
                    }
                    {
                        daysUntilBooked < 0 && <p>Bạn nên đến điểm đặt lịch hẹn thôi, muộn giờ rồi đấy !</p>
                    }
                </div>
            </div>
        </Card >
    );
};

const UserSchedule = () => {
    const [scheduleData, setScheduleData] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const calendarRes = await instance.get('/schedule/user-list-schedule');
                
                if (calendarRes.data.data.pendingSchedule.length > 0) {
                    setMessage('Bạn đã đặt lịch .Vui lòng đợi nhân viên chúng tôi xác nhận lịch của bạn ')
                } else {
                    setMessage('Vui lòng liên hệ với nhân viên chúng tôi hoặc đặt lịch với Kiến Trúc Sư ')
                }
                setPendingData(calendarRes.data.data.pendingSchedule)
                setScheduleData(calendarRes.data.data.scheduleList);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderComponent />
            <ToastContainer />
            <main style={{ flex: 1 }}>
                {
                    isLoading && <LoadingOverlay />
                }
                {scheduleData.length > 0 ? scheduleData.map((item, index) => (
                    <ScheduleCard
                        key={index}
                        designerName={item.designerInfo}
                        scheduleInfo={item.scheduleInfo}
                    />
                )) : <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    fontSize: '25px',
                    textAlign: 'center',
                    transform: 'translate(-50%, -50%)',
                    width: '780px'
                }}>
                    {message}
                    {scheduleData.length === 0 && pendingData.length === 0 && <Link to="/list-user-designer"><span style={{ textDecoration: 'underline' }}>tại đây </span>!</Link>}
                    {scheduleData && scheduleData.length > 0 && <Link to="/list-user-designer"><span style={{ textDecoration: 'underline' }}>tại đây </span>!</Link>}
                    {pendingData.length > 0 && <Link to={`/schedule/${pendingData[0]?.designerId}`}> <span style={{ textDecoration: 'underline' }}>tại đây </span>!</Link>}
                </div>}
            </main >
            <FooterComponent />
        </div >
    );
};

export default UserSchedule;
