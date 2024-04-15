import { Card, Image } from 'antd';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import { formatDate } from "../helper/formatDate";
import Contract from "../images/contract.png";

const { Meta } = Card;

const ScheduleCard = ({ contract }) => {
    return (
        <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'rgba(102, 112, 133, 0.20)', padding: '50px', margin: '0 auto' }}>
                <div style={{ width: '182px', height: '210px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        height={'100%'}
                        src={Contract}
                        preview={false}
                    />
                </div>
                <div style={{ marginLeft: 100, fontSize: 40, fontWeight: 500, color: 'black', fontFamily: 'Roboto' }}>
                    <p>{contract.nameContract}</p>
                    <p>Kiến trúc sư: {contract.designerData[0].fullName}</p>
                    <p>Ngày {formatDate(contract.timeSigned)}</p>
                    <button style={{ height: '40px' }} className="custombutton-register-designer">
                        <Link to={`/contract/${contract._id}`} target="_blank">Xem chi tiết</Link>
                    </button>
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
            <main style={{ display: 'flex', justifyContent: 'space-around' }}>
                {
                    listContract.length > 0 && listContract.map((contract, index) => (
                        <ScheduleCard key={index} contract={contract} />
                    ))
                }
            </main>
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <FooterComponent />
            </div>
        </div>
    );
};

export default ContractUser;
