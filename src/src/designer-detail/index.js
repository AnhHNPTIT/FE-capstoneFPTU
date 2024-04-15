import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import instance from "../configApi/axiosConfig";

const DesignerDetail = () => {
    const { designerId } = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getAllUser() {
            try {
                const dataRes = await instance.get(`/cv/${designerId}`);
                const dataDB = dataRes.data.userInfo;
                setData(dataDB);
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
                <iframe src={`http://localhost:8000/img/${data?.cv}`} width="100%" height="1000px"></iframe>
            </div>
        </div>
    );
};

export default DesignerDetail;
