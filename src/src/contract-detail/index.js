import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import instance from "../configApi/axiosConfig";

const ContractDetail = () => {
    const { contract_id } = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getAllUser() {
            try {
                const dataRes = await instance.get(`/contract_detail/${contract_id}`);
                const dataDB = dataRes.data.data.contract;
                setData(dataDB[0]);
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

        getAllUser()
    }, [])

    return (
        <div className="h-screen">
            <div className="table-account ">
                <iframe src={`http://localhost:8000/img/${data?.imageContract}`} width="100%" height="1000px"></iframe>;
            </div>
        </div>
    );
};

export default ContractDetail;
