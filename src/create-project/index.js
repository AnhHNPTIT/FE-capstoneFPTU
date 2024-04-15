import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { AutoComplete, Button, Checkbox, DatePicker, Image, Select, Steps, theme } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";

const CreateProject = () => {
    const navigate = useNavigate();
    const [formCreateProject, setFormCretaeProject] = useState({
        name: "",
        projectIdType: "",
        projectImage: "",
        customerImage: "",
        designerId: "",
        designerDate: "",
        constructionDate: "",
        userCode: "",
        designerName: "",
        catalog: "",
        categoriesAdd: "",
        description: "",
        projectTypeNew: ""
    });

    const [listCategory, setListCategory] = useState([]);

    const [titleStep, setTitleStep] = useState("Thêm dự án mới")

    const [checkNewProject, setCheckNewProject] = useState(false);

    useEffect(() => {
        async function getAll() {
            try {
                const dataRes = await instance.get("/get_project_type");
                const dataList = dataRes.data.data.listProjectType;
                const dataSet = [];
                for (let index = 0; index < dataList.length; index++) {
                    const objectPush = {
                        value: dataList[index]._id,
                        label: dataList[index].nameProjectType
                    }
                    dataSet.push(objectPush);
                }
                setListProjectType(dataSet);
                if (dataSet.length < 1) {
                    setCheckNewProject(true)
                }

            } catch (error) {
                if (error.response.status === 402) {
                    return toast.error(error.response.data.errors[0].msg)
                } else if (error.response.status === 400) {
                    return toast.error(error.response.data.message)
                } else if (error.response.status === 401) {
                    return toast.error(error.response.data.message)
                }
                else if (error.response.status === 403) {
                    return toast.error(error.response.data.message)
                } else {
                    return toast.error("Server error")
                }
            }
        }
        getAll()
    }, [])

    const onChangeCheckBox = (e) => {
        const dataOld = { ...formCreateProject }
        if (e.target.checked) {
            dataOld.projectIdType = "";
        } else {
            dataOld.projectTypeNew = "";
        }
        setFormCretaeProject(dataOld);
        setCheckNewProject(e.target.checked);
    };

    const onChangeSelect = (data, name) => {
        const dataNew = {
            ...formCreateProject,
            [name]: data,
        };
        setFormCretaeProject(dataNew);
    };


    const onChangeValueInput = (data, name) => {
        const dataOle = {
            ...formCreateProject,
            [name]: data,
        };
        setFormCretaeProject(dataOle)
    };

    const onChangeDate = (value, name) => {
        const dataOle = {
            ...formCreateProject,
            [name]: value,
        };
        setFormCretaeProject(dataOle)
    };


    const fileInputRef = useRef(null);
    const fileImageRef = useRef(null);

    const handleButtonClick = () => {
        // Trigger the file input click when the button is clicked
        fileInputRef.current.click();
    };

    const handleChangeAvatar = () => {
        fileImageRef.current.click();
    }

    const handleCVChange = (event) => {
        const filesList = event.target.files;
        for (let i = 0; i < filesList.length; i++) {
            console.log(`file${i + 1}`, filesList[i]);
        }

        const listDataOle = [...listCategory];
        listDataOle[isActive].images = event.target.files;
        setListCategory(listDataOle);
    };


    const [listProjectType, setListProjectType] = useState([])

    const checkCode = async () => {
        const dataCheck = {
            userCode: formCreateProject.userCode
        }
        const dataRes = await instance.post("/check_design", dataCheck);
        const dataFind = dataRes.data.data.data;
        if (!dataFind?.fullName) {
            return toast.error("Mã kiến trúc sư không tồn tại")
        } else {
            const dataOle = {
                ...formCreateProject,
                "designerName": dataFind.fullName,
                "designerId": dataFind._id
            };
            setFormCretaeProject(dataOle)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        fileInputRef.current.value = "";

        if (file) {
            const dataOle = {
                ...formCreateProject,
                "projectImage": file,
            };
            setFormCretaeProject(dataOle)
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        fileImageRef.current.value = "";

        if (file) {
            const dataOle = {
                ...formCreateProject,
                "customerImage": file,
            };
            setFormCretaeProject(dataOle)
        }
    }

    const addCategorys = () => {

        const cateName = formCreateProject.categoriesAdd
        if (cateName.length < 1) {
            return toast.error("Vui lòng thêm tên cho phòng/ khu vực")
        }
        const dataOle = [...listCategory];
        dataOle.push({
            categoriesName: cateName,
            images: [],
        })
        setListCategory(dataOle)
    }

    const DeleteIconCategor = (vt) => {
        const dataOle = [...listCategory];
        const dataFilter = dataOle.filter((e, index) => index != vt);
        setListCategory(dataFilter)
    }


    const [isActive, setIsActive] = useState(0)

    const isActiveUpload = (index) => {
        setIsActive(index)
    }

    const handleButtonClickClearImage = () => {
        const dataOle = [...listCategory];
        dataOle[isActive].images = []
        setListCategory(dataOle)
    }

    const uploadDataCreateProject = async () => {
        // upload images
        let dataResIdType = ""
        try {
            if (formCreateProject.projectTypeNew.length > 0) {
                const data = {
                    nameProjectType: formCreateProject.projectTypeNew
                }
                dataResIdType = await instance.post("/post_project_type", data);
            }
            let listCategoriesCustom = [];
            for (let i = 0; i < listCategory.length; i++) {
                let imagesList = listCategory[i].images;
                let formDataFile = new FormData();
                let dataImage = []
                for (let y = 0; y < imagesList?.length; y++) {
                    formDataFile.append('files', imagesList[y]);
                }

                const res = await instance.post("/upload--multi-file", formDataFile, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                let imagesRes = res.data.fileNames;
                for (let k = 0; k < imagesRes?.length; k++) {
                    dataImage.push(imagesRes[k]?.filename)
                }

                listCategoriesCustom.push({
                    categoriesName: listCategory[i].categoriesName,
                    images: dataImage
                })
            }

            const formDataFileOne = new FormData();
            formDataFileOne.append('file', formCreateProject.projectImage);
            const resOneFile = await instance.post("/upload-file", formDataFileOne, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Upload customerImage
            const formDataFileTwo = new FormData();
            formDataFileTwo.append('file', formCreateProject.customerImage);
            const resTwoFile = await instance.post("/upload-file", formDataFileTwo, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Construct listData after both files are uploaded
            let listData = {};

            if (formCreateProject.projectTypeNew.length > 0) {
                listData = {
                    ...formCreateProject,
                    listCategory: listCategoriesCustom,
                    projectImage: resOneFile.data.filename,
                    projectIdType: dataResIdType.data.data.id,
                    customerImage: resTwoFile.data.filename
                };
            } else {
                listData = {
                    ...formCreateProject,
                    listCategory: listCategoriesCustom,
                    projectImage: resOneFile.data.filename,
                    customerImage: resTwoFile.data.filename
                };
            }
            console.log("listData == ", listData);
            await instance.post("/create_project", listData);
            toast.success("Tạo thành công")
            // return navigate('/home-page')
        } catch (error) {
            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg)
            } else if (error.response.status === 400) {
                console.log(error.response)
                return toast.error(error.response.data.message)
            } else if (error.response.status === 403) {
                return toast.error(error.response.data.message)
            } else {
                return toast.error("Server error")
            }
        }

    }

    const steps = [
        {
            title: "",
            content: (
                <div
                    className="flex items-center justify-center m-auto"
                    style={{ width: 600 }}>
                    <div className="py-10">
                        <div className="flex items-center ">
                            <AutoComplete
                                style={{ width: 250, height: 35, marginRight: 100 }}
                                onChange={(data) => onChangeValueInput(data, "name")}
                                value={formCreateProject.name}
                                placeholder="Tên dự án"
                                name="name"
                            />

                            <div className="flex">
                                <button className="button-upload-images"
                                    onClick={handleButtonClick}>Chọn file</button>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {formCreateProject.projectImage && <p className="flex justify-center items-center pl-5">{formCreateProject.projectImage.name}</p>}
                            </div>
                        </div>

                        <div className="flex mt-10">
                            <Checkbox onChange={onChangeCheckBox} checked={checkNewProject}>
                                Thêm mới loại dự án
                            </Checkbox>
                        </div>

                        <div className="cunstom_project_type" style={{ marginTop: 30 }}>
                            <div className="flex items-center justify-center">
                                <Select
                                    name="projectType"
                                    value={formCreateProject.projectIdType}
                                    style={{ width: 250, marginRight: 100 }}
                                    onChange={(data) => onChangeSelect(data, "projectIdType")}
                                    options={listProjectType}
                                    disabled={checkNewProject}
                                />

                                <AutoComplete
                                    style={{ width: 300, height: 35, paddingRight: 50 }}
                                    onChange={(data) => onChangeValueInput(data, "projectTypeNew")}
                                    name="projectTypeNew"
                                    value={formCreateProject.projectTypeNew}
                                    placeholder="Loại dự án mới"
                                    disabled={!checkNewProject}
                                />
                            </div>
                        </div>

                        <div className="flex" style={{ marginTop: 30 }}>
                            <DatePicker
                                onChange={(data) => onChangeDate(data, "designerDate")}
                                value={formCreateProject.designerDate}
                                placeholder="Ngày thi công"
                            />
                        </div>

                        <div className="flex" style={{ marginTop: 30 }}>
                            <DatePicker
                                onChange={(data) => onChangeDate(data, "constructionDate")}
                                value={formCreateProject.constructionDate}
                                placeholder="Ngày hoàn thành"
                            />
                        </div>

                        <div className="flex" style={{ marginTop: 30 }}>
                            <AutoComplete
                                style={{ width: 250, height: 35, marginRight: 100 }}
                                onChange={(data) => onChangeValueInput(data, "userCode")}
                                value={formCreateProject.userCode}
                                placeholder="Thiết kế"
                            />
                            <div>
                                <button
                                    className="button-upload-images"
                                    onClick={checkCode}
                                >
                                    Kiểm tra
                                </button>
                            </div>
                        </div>

                        <div className="customByCode" style={{ marginTop: 30 }}>
                            {
                                formCreateProject.userCode.length > 0 && <p className="text-2xl font-bold">  Designer: {formCreateProject.designerName}</p>
                            }
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "",
            content: (
                <div className="flex m-auto" style={{ padding: '10px' }}>
                    <div className="m-auto">
                        <div
                            style={{ height: 50 }}
                            className="text-4xl  mb-10 mt-7 text-black font-bold"
                        >
                            Loại phòng
                        </div>
                        <div className="flex" style={{ width: '100%' }}>
                            <div className="block_left_category" style={{ width: '40%' }}>
                                <div className="h-96 overflow-auto">
                                    {
                                        listCategory.map((e, vt) => {
                                            return (
                                                <div className="flex">
                                                    <div className={isActive === vt ? "item_categorys cursor-pointer" : "item_categorysNo cursor-pointer"} onClick={() => isActiveUpload(vt)}>
                                                        {e.categoriesName}
                                                    </div>
                                                    <div className="ml-5 mt-2">
                                                        <DeleteIcon
                                                            onClick={() => DeleteIconCategor(vt)}
                                                            className="cursor-pointer"
                                                            sx={{ color: "#683737" }}
                                                        ></DeleteIcon> </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex">
                                    <AutoComplete
                                        style={{ width: 250, height: 35, paddingRight: 50 }}
                                        onChange={(value) => onChangeValueInput(value, "categoriesAdd")}
                                        name="categoriesAdd"
                                        value={formCreateProject.categoriesAdd}
                                        placeholder="Thêm thể loại​"
                                    />
                                </div>
                                <div className="flex">
                                    <AddCircleIcon className="cursor-pointer mt-4" onClick={addCategorys} />
                                </div>
                            </div>

                            <div className="block_right_category pb-16">
                                <div>
                                    {
                                        listCategory.length > 0 && <button
                                            className="button-upload-images add-images"
                                            onClick={handleButtonClick}
                                        >
                                            Thêm ảnh
                                        </button>
                                    }

                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleCVChange}
                                        multiple
                                    />
                                </div>

                                <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
                                    {listCategory[isActive]?.images?.length > 0 &&
                                        [...listCategory[isActive].images].map((image, imageIndex) => {

                                            return (
                                                <ImageListItem key={`${isActive}-${imageIndex}`}>
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        style={{ width: 200, height: 200, padding: 5 }}
                                                        loading="lazy"
                                                        alt={`Image ${imageIndex}`}
                                                    />
                                                </ImageListItem>
                                            )
                                        })}
                                </ImageList>
                                {
                                    listCategory[0]?.images.length > 0 && <button className="button-upload-images" onClick={handleButtonClickClearImage}>Xóa tất cả ảnh</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "",
            content: (
                <div className="flex justify-center p-10">
                    <div>
                        <div className="flex justify-center items-center">
                            <div className="pr-5">
                                Add Catalogue (Link)
                            </div>
                            <div>
                                <AutoComplete
                                    style={{ width: 300, height: 35, paddingRight: 50 }}
                                    onChange={(value) => onChangeValueInput(value, "catalog")}
                                    name="catalog"
                                    value={formCreateProject.catalog}
                                    placeholder="Thêm Link Categories​"
                                />
                            </div>

                        </div>

                        <div className="flex justify-center items-center mt-10 pl-15">
                            <div className="pr-5">
                                Phản hồi
                            </div>
                            <div>
                                <AutoComplete
                                    style={{ width: 300, height: 35, paddingRight: 50 }}
                                    onChange={(value) => onChangeValueInput(value, "description")}
                                    name="description"
                                    value={formCreateProject.description}
                                    placeholder="Phản hồi"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-10 pl-15">
                            <button className="button-upload-images" onClick={handleChangeAvatar}>Chọn ảnh</button>
                            {formCreateProject.customerImage && (
                                <Image
                                    style={{ borderRadius: '50%' }}
                                    height={250}
                                    width={250}
                                    src={URL.createObjectURL(formCreateProject.customerImage)}
                                    preview={true}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                ref={fileImageRef}
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                        </div>
                    </div>

                </div>
            ),
        },
        {
            title: "",
            content: (
                <div className="flex m-auto">
                    <div className="m-auto">
                        <div style={{ width: '100%' }}>
                            <p style={{ height: 50 }}
                                className="text-4xl  mb-10 mt-7 text-black font-bold">{formCreateProject.name}</p>
                            <div className="flex">
                                <div className="block_left_category">

                                    <div className="h-96 overflow-auto">
                                        {
                                            listCategory.map((e, vt) => {
                                                return (
                                                    <div className="flex">
                                                        <div className={isActive === vt ? "item_categorys cursor-pointer" : "item_categorysNo cursor-pointer"} onClick={() => isActiveUpload(vt)}>
                                                            {e.categoriesName}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="text-black "> Ngày thi công : </div>
                                        <div className="text-black ">  {dayjs(formCreateProject.designerDate).format('DD/MM/YYYY')}   </div>

                                    </div>
                                    <div className="flex justify-between mt-10">
                                        <div className="text-black ">  Ngày hoàn thành : </div>
                                        <div className="text-black ">   {dayjs(formCreateProject.constructionDate).format('DD/MM/YYYY')}</div>
                                    </div>

                                </div>

                                <div className="block_right_category pl-10 pb-16">
                                    <div className="pb-10">
                                        <a
                                            className="button-upload-images"
                                            href={formCreateProject.catalog}
                                            target="_blank"
                                        >
                                            Catalog
                                        </a>

                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleCVChange}
                                            multiple
                                        />
                                    </div>

                                    <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
                                        {listCategory[isActive]?.images?.length > 0 &&
                                            [...listCategory[isActive].images].map((image, imageIndex) => {
                                                return (
                                                    <ImageListItem key={`${isActive}-${imageIndex}`}>
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            style={{ width: 200, height: 200, padding: 5 }}
                                                            loading="lazy"
                                                            alt={`Image ${imageIndex}`}
                                                        />
                                                    </ImageListItem>
                                                )
                                            })}
                                    </ImageList>

                                </div>
                            </div>
                        </div>

                        <div className="text-2xl  mb-10 mt-7 text-black font-bold"> Thiết kế - {formCreateProject.designerName} </div>

                    </div>
                </div>
            ),
        },
    ];

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = async () => {

        let check = current + 1
        if (check === 1) {
            const dataCheck = {
                userCode: formCreateProject.userCode
            }
            const dataRes = await instance.post("/check_design", dataCheck);
            const dataFind = dataRes.data.data.data;
            if (!formCreateProject.name) {
                return toast.error("Chưa có tên dự án")
            }
            if (formCreateProject.projectIdType.length < 1) {
                if (formCreateProject.projectTypeNew.length < 1) {
                    return toast.error("Thể loại dự án chưa có")
                }
            }

            if (formCreateProject.projectTypeNew.length < 1) {
                if (formCreateProject.projectIdType.length < 1) {
                    return toast.error("Thể loại dự án chưa có")
                }
            }
            if (!formCreateProject.designerDate || !formCreateProject.constructionDate) {
                return toast.error("Vui lòng chọn ngày")
            }
            if (formCreateProject.designerDate >= formCreateProject.constructionDate) {
                return toast.error("Ngày thi công phải trước ngày hoàn thành")
            }
            if (!dataFind?.fullName) {
                return toast.error("Không tồn tại kiến trúc sư")
            } else {
                const dataOle = {
                    ...formCreateProject,
                    "designerName": dataFind.fullName,
                    "designerId": dataFind._id
                };
                setFormCretaeProject(dataOle)
            }
            if (dataFind?.fullName < 1) {
                return toast.error("Không tồn tại kiến trúc sư")
            }
            setTitleStep("Tạo phòng")
        } else if (check === 2) {
            if (!formCreateProject.categoriesAdd) {
                return toast.error("Vui lòng thêm phòng/ khu vực")
            }
            if (listCategory[0].images.length == 0) {
                return toast.error("Vui lòng thêm ảnh")
            }
            setTitleStep("Thêm catalog và phản hồi từ khách hàng")
        } else if (check === 3) {
            if (!formCreateProject.catalog) {
                return toast.error("Vui lòng thêm catalog sản phẩm cho dự án")
            }
            if (!formCreateProject.description) {
                return toast.error("Vui lòng thêm phản hồi từ khách hàng")
            }
            setTitleStep("Xác nhận thêm dự án mới")
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        let check = current - 1;

        setCurrent(current - 1);
        if (check === 1) {
            setTitleStep("Phòng căn và khu vực")
        } else if (check === 2) {
            setTitleStep("Catalog và phản hồi")
        } else if (check === 0) {
            setTitleStep("Thêm dự án mới")
        }
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle = {
        textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className="px-56">
            <ToastContainer />
            <div className="flex text-4xl  mt-5 text-black font-bold items-center justify-center mb-10" style={{ textAlign: 'center' }}>
                {titleStep}
            </div>
            <Steps current={current} items={items} className="custom_step" style={{ fontSize: '150%', alignItems: 'center' }} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{ marginTop: 24, marginBottom: 30 }}
                className="custom-button-step"
            >
                {current < steps.length - 1 && (
                    <Button onClick={() => next()} className="buttonNext" style={{ color: '#fff' }}>
                        Tiếp
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        className="buttonNext"
                        onClick={uploadDataCreateProject}
                    >
                        Xác nhận
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Quay lại
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateProject;
