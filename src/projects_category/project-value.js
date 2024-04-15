import { Avatar, Button, Col, Flex, FloatButton, Image, Popover, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../App.css';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import { formatDate } from '../helper/formatDate';
import AvatarCustomer from '../images/avatar-customer.png';
import AIchatBoxIcon from '../images/support.png';
import './project-value.css';

const ProjectValue = () => {
    const navigate = useNavigate();
    const checkRole = JSON.parse(localStorage.getItem('datawebfpt'))?.role || '';
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const hide = () => {
        setClicked(false);
        setHovered(false);
    };
    const handleHoverChange = (open) => {
        setHovered(open);
        setClicked(false);
    };
    const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
    };
    const { project_id } = useParams();
    const [listCategoris, setListCategoris] = useState([])

    useEffect(() => {
        async function getItemProject() {
            try {
                const dataRes = await instance.get(`/get_project/${project_id}`);
                setListCategoris(dataRes.data.data.listProject[0])
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

        getItemProject()

    }, [])

    const [isActive, setIsActive] = useState(0);
    const onClickActive = (index) => {
        setIsActive(index);
    }

    const removeProject = async (id) => {
        try {
            const del = await instance.delete(`/del_project/${id}`);
            toast.success(del.data.message);
            setTimeout(() => {
                navigate('/home-page');
            }, 1000);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const hoverContent = <div style={{ fontSize: "24px" }}>Có thể giúp gì cho bạn ... ?</div>;
    const clickContent = <div ></div>;
    return (
        <div>
            <HeaderComponent />
            <ToastContainer />

            <div className="project-value-screen" style={{ backgroundColor: '#FFFFFF' }}>
                <div className='project-value-screen__image-banner'>
                    {/* <Image
                        style={{ width: "100vw", height: "auto" }}
                        src={ProjectValueBannerImage}
                        className='bg-white'
                        preview={false}
                    /> */}
                </div>
                <div className='project-value-screen__content'>
                    <div className='project-feedback'>
                        <div className='feedback-title'>Phản hồi</div>
                        <div className='feedback-container'>
                            <div className='feedback-avatar'>
                                {
                                    listCategoris?.customerImage?.length > 0 ? <Avatar
                                        size={343}
                                        src={<img src={`http://localhost:8000/img/${listCategoris?.customerImage}`} alt="avatar" />}
                                    /> : <Avatar
                                        size={343}
                                        src={<img src={AvatarCustomer} alt="avatar" />}
                                    />
                                }
                            </div>
                            <div className='feedback-content'>
                                " {listCategoris?.description} “
                            </div>
                        </div>
                    </div>
                    <div className='project-value-container'>
                        <div className='title'>Sản phẩm hoàn thiện</div>
                        <div className='first-values'>
                            <div className='project-name'>{listCategoris?.name}</div>
                            <a href={listCategoris?.catalog}>
                                <Button className='catalog'>Catalog</Button>
                            </a>
                            {(checkRole === "ADMIN" || checkRole === "STAFF") &&
                                <Button onClick={() => removeProject(listCategoris._id)} className='delete'>Xoá dự án</Button>
                            }
                        </div>
                        <div className='second-values'>
                            <div className='project-values'>
                                <div className='categories-and-date'>
                                    <div className='category' >
                                        <Flex vertical gap="20px" style={{ width: '100%' }}>
                                            {
                                                listCategoris?.categoryData?.length > 0 && listCategoris?.categoryData.map((item, index) => {
                                                    return (
                                                        <Button key={index} className={isActive === index ? "item_categorys cursor-pointer bg_active_item category-button" : "category-button item_categorysNo cursor-pointer"} onClick={() => onClickActive(index)} >
                                                            {item.categoriesName}
                                                        </Button>
                                                    )
                                                })
                                            }
                                        </Flex>
                                    </div>
                                    <div className='date'>
                                        <label className='design-date'>
                                            Ngày thi công : <span className='date-value'> {formatDate(listCategoris?.designerDate)} </span></label>
                                        <label className='construction-date'>
                                            Ngày hoàn thành : <span className='date-value'>{formatDate(listCategoris?.constructionDate)} </span></label>
                                    </div>
                                </div>
                                <div className='middle-line'>
                                    <hr />
                                </div>
                                <div className='category-images'>
                                    <Row gutter={[40, 24]}>
                                        {
                                            !!listCategoris?.categoryData && listCategoris?.categoryData.length > 0 && listCategoris?.categoryData[isActive]?.images.length > 0 &&
                                            listCategoris?.categoryData[isActive]?.images?.map(e => {
                                                return (
                                                    <Col className="gutter-row" span={12}>
                                                        <Image
                                                            src={`http://localhost:8000/img/${e}`}
                                                            className='bg-white'
                                                            preview={true}
                                                        />
                                                    </Col>
                                                );
                                            }
                                            )
                                        }

                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className='third-values'>
                            <div className='bottom-line'>
                                <hr />
                            </div>
                            <div className='designer-info'>
                                Thiết kế - <span className='designer-name'>{listCategoris?.userData?.length > 0 && listCategoris?.userData[0]?.fullName} </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='AIchatBoxIcon'>
                        <Popover
                            style={{
                                width: 500,
                            }}
                            placement="leftBottom"
                            content={hoverContent}
                            title="Vũ Gia"
                            trigger="hover"
                            open={hovered}
                            onOpenChange={handleHoverChange}
                        >
                            <Popover
                                content={
                                    <div>
                                        {clickContent}
                                        <a onClick={hide}>Close</a>
                                    </div>
                                }
                                placement="leftBottom"
                                title="Vũ Gia"
                                trigger="click"
                                open={clicked}
                                onOpenChange={handleClickChange}
                            >
                                <Image
                                    src={AIchatBoxIcon}
                                    preview={false}
                                />
                            </Popover>
                        </Popover>
                    </div>
                </div>
                <FloatButton.BackTop />
            </div >
            <FooterComponent />
        </div>

    )
}
export default ProjectValue;