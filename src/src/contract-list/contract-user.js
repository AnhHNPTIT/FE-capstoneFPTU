import { Card, Image } from 'antd';
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";

const { Meta } = Card;

const ScheduleCard = () => {
    return (
        <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'rgba(102, 112, 133, 0.20)', padding: '50px', margin: '0 auto' }}>
                <div style={{ width: '182px', height: '210px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        height={'100%'}
                        src={VuGia}
                        preview={false}
                    />
                </div>
                <div style={{ marginLeft: 100, fontSize: 40, fontWeight: 500, color: 'black', fontFamily: 'Roboto' }}>
                    <p>Hợp đồng thiết kế</p>
                    <p>Ngày 20/12/2017</p>
                    <button>Xem chi tiết</button>
                </div>
            </div>
        </Card >
    );
};

const ContractUser = () => {

    const [listContract, setListContract] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const calendarRes = await instance.get('/list_contract_user');
                console.log('calendarRes == ', calendarRes);
                if (calendarRes.data.data.listContract.length === 0) {
                    
                }
                setListContract(calendarRes.data.data.listContract)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="h-screen" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderComponent />
            <ToastContainer />
            <main style={{ flex: 1 }}>
                <ScheduleCard />
            </main>
            <div className="border-2 pt-2 pb-2"></div>
            <FooterComponent />
        </div>
    );
};

export default ContractUser;
