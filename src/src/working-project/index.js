import { Divider, Grid, ImageList, ImageListItem, MenuItem, Select, TextField } from '@mui/material';
import Fade from '@mui/material/Fade';
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";

const WorkingProject = () => {
    const userId = JSON.parse(localStorage.getItem('datawebfpt'))?.designerId || '';
    const [userInfo, setUserInfo] = useState(null);
    const [avatar, setAvatar] = useState("");
    const avatarRef = useRef(null);
    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(0)
    const [skills, setSkills] = useState(Array(6).fill(''));
    const [experiences, setExperiences] = useState(Array(4).fill(''));
    const [description, setDescription] = useState('');
    const [listProjectType, setListProjectType] = useState([]);

    const [listCategory, setListCategory] = useState([]);

    const listSKill = [
        'Kỹ năng thiết kế và sáng tạo',
        'Kỹ năng sử dụng phần mềm thiết kế',
        'Kỹ năng công nghệ và đổi mới',
        'Kỹ năng giao tiếp và trình bày',
        'Kỹ năng quản lý dự án',
        'Kỹ năng giải quyết vấn đề',
    ];

    const listExperience = [
        'Kinh nghiệm hiểu biết về vật liệu',
        'Kinh nghiệm về xu hướng thiết kế',
        'Kinh nghiệm triển khai các dự án thực tế',
        'Kinh nghiệm thực hiện và phân tích nghiên cứu thị trường',
    ]

    useEffect(() => {
        async function fetchData() {
            try {
                const baseImageUrl = "http://localhost:8000/img/";
                const designerRes = await instance.post(`/update-designer/${userId}`);
                const listImageProject = designerRes.data.message[0]?.listImageProject || [];

                let newCategory;
                if (listImageProject.length === 0) {
                    newCategory = [{ images: [] }];
                } else {
                    newCategory = listImageProject.map(imageUrl => ({
                        images: [baseImageUrl + imageUrl]
                    }));
                }
                console.log("newCategory == ", newCategory);
                setListCategory(newCategory);
                const user = designerRes.data.message[0];
                setEditData(prevData => ({
                    ...prevData,
                    imageDesigner: user?.imageDesigner || '',
                    listImageProject: user?.listImageProject || [],
                    skill: user?.skill || Array(6).fill(''),
                    experiences: user?.experience || Array(4).fill(''),
                    description: user?.dataDesigner[0]?.description || '',
                    designfile: user?.designfile || ''
                }));
                setUserInfo(user)
                const dataRes = await instance.get("/get_project_type");
                setListProjectType(dataRes.data.data.listProjectType)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    const handleCVChange = (event) => {
        const filesList = event.target.files;
        const filesArray = Array.from(filesList).slice(0, 3);

        for (let i = 0; i < filesArray.length; i++) {
            console.log(`file${i + 1}`, filesArray[i]);
        }

        // Cập nhật listCategory với danh sách các files mới
        const newListCategory = [...listCategory];
        newListCategory.push({
            images: [],
        })
        newListCategory[isActive].images = filesArray;
        setListCategory(newListCategory);
    };

    const [editData, setEditData] = useState({
        imageDesigner: userInfo?.imageDesigner || '',
        listImageProject: userInfo?.listImageProject || [],
        skill: userInfo?.skill || Array(6).fill(''),
        experiences: userInfo?.experience || Array(4).fill(''),
        description: userInfo?.dataDesigner[0]?.description || '',
        designfile: userInfo?.designfile || ''
    });

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setEditData(prevData => ({ ...prevData, description: event.target.value }));
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        avatarRef.current.value = "";

        if (file) {
            setAvatar(file)
            setEditData(prevData => ({ ...prevData, imageDesigner: file }));
        }
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        setSkills(newSkills);
        setEditData(prevData => ({ ...prevData, skill: newSkills }));
    };

    const handleExperienceChange = (index, value) => {
        const newExperiences = [...experiences];
        newExperiences[index] = value;
        setExperiences(newExperiences);
        setEditData(prevData => ({ ...prevData, experiences: newExperiences }));
    };

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const makeBrief = async () => {
        if (!editData.designfile) {
            return toast.error('Lĩnh vực không được để trống')
        }
        let dataImage = []
        for (let i = 0; i < listCategory.length; i++) {
            let imagesList = listCategory[i].images;
            let formDataFile = new FormData();
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
        }
        const formDataFileOne = new FormData();
        formDataFileOne.append('file', editData.imageDesigner);
        const resOneFile = await instance.post("/upload-file", formDataFileOne, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        await instance.post('/update-designer', {
            imageDesigner: resOneFile.data.filename,
            listImageProject: dataImage,
            skill: editData.skill,
            experience: editData.experiences,
            description: editData.description,
            designfile: editData.designfile
        });
        toast.success("Tao thanh cong")
        // return navigate('/home-page')
    }

    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            <div className="table-account " style={{ padding: '60px' }}>
                <h1 className="text-center" style={{ fontWeight: 'bold' }}>Tạo hồ sơ làm việc</h1>
                <div className="flex justify-between" style={{ gap: '40px' }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "15px"
                    }}>
                        <Image
                            style={{ borderRadius: '50%' }}
                            height={250}
                            width={250}
                            src={avatar ? URL.createObjectURL(avatar) : (editData.imageDesigner ? `http://localhost:8000/img/${editData.imageDesigner}` : null)}
                            preview={true}
                        />
                        <div>{userInfo?.dataDesigner[0].fullName}</div>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            ref={avatarRef}
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                        />
                        <button className="button-upload-images" onClick={() => avatarRef.current.click()}>Đổi avatar</button>
                    </div>
                    <div style={{ margin: '20px', width: '100%' }}>
                        <div className="flex justify-around items-center">
                            <h1 className="text-center mb-3" style={{ textDecoration: 'underline' }}>Các dự án tiêu biểu</h1>
                            <div className="flex items-center" style={{ gap: '10px' }}>
                                <h1 onClick={handleButtonClick}>Tải lên</h1>
                                <button className="button-upload-images" onClick={handleButtonClick}>Chọn ảnh</button>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleCVChange}
                                    multiple
                                />
                            </div>
                        </div>
                        <ImageList sx={{ width: '100%', height: 450 }} cols={2} rowHeight={400} className="custom-image-list">
                            {listCategory.map((category, categoryIndex) => (
                                category.images.length > 0 &&
                                category.images.map((image, imageIndex) => {
                                    const imageUrl = typeof image === 'string' && image.startsWith('http') ? image : URL.createObjectURL(image);
                                    return (
                                        <ImageListItem key={`${categoryIndex}-${imageIndex}`}>
                                            <img
                                                src={imageUrl}
                                                style={{ height: 400, padding: 5 }}
                                                loading="lazy"
                                                alt={`Image ${imageIndex}`}
                                            />
                                        </ImageListItem>
                                    );
                                })
                            ))}
                        </ImageList>
                    </div>
                </div>
                <div className="flex" style={{ width: '100%' }}>
                    <div style={{ width: '40%', padding: '50px' }}>
                        <div className="font-bold mb-3 flex items-center" style={{ fontSize: '20px', gap: 20 }}>
                            Mã nhà thiết kế
                            <TextField
                                size="small"
                                style={{ width: 222.45 }}
                                id="outlined-start-adornment"
                                name="accountcode"
                                value={userInfo?.dataDesigner[0].userCode}
                                sx={{ m: 1, width: "222.45px", }}
                            />
                        </div>
                        <div className="font-bold mb-3 flex items-center" style={{ fontSize: '20px', gap: 20 }}>
                            Lĩnh vực
                            <FormControl fullWidth>
                                <Select
                                    style={{ width: 280 }}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={editData.designfile}
                                    onChange={(e) => setEditData(prevData => ({ ...prevData, designfile: e.target.value }))}
                                    name="designfile"
                                >
                                    {
                                        listProjectType.length > 0 && listProjectType.map((type, index) => (
                                            <MenuItem key={index} value={type._id}>{type.nameProjectType}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="font-bold mb-3" style={{ fontSize: '20px' }}>Giới thiệu bản thân</div>
                        <TextareaAutosize
                            name="description"
                            aria-label="minimum height"
                            minRows={10}
                            style={{ width: '100%' }}
                            placeholder="Hãy viết ngắn gọn về bản thân"
                            value={editData.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <Divider type="vertical" style={{ height: "auto", backgroundColor: 'black', width: '1px' }} />
                    <div style={{ padding: '50px' }}>
                        <div className="font-bold text-center" style={{ marginBottom: '20px', fontSize: '20px' }}>Kỹ năng</div>
                        <Grid container spacing={2}>
                            {editData.skill.length > 0 ? (
                                editData.skill.map((skill, index) => (
                                    <Grid item xs={6} key={index}>
                                        <TextField
                                            fullWidth
                                            label={`${listSKill[index]}`}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: {
                                                    borderBottom: '1px solid #000',
                                                },
                                            }}
                                            value={skill}
                                            onChange={(e) => handleSkillChange(index, e.target.value)}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                skills.map((skill, index) => (
                                    <Grid item xs={6} key={index}>
                                        <TextField
                                            fullWidth
                                            label={`${listSKill[index]}`}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: {
                                                    borderBottom: '1px solid #000',
                                                },
                                            }}
                                            value={skill}
                                            onChange={(e) => handleSkillChange(index, e.target.value)}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                        <div className="font-bold text-center" style={{ margin: '20px 0', fontSize: '20px' }}>Kinh nghiệm</div>
                        <Grid container spacing={2}>
                            {editData.experiences.length > 0 ? (
                                editData.experiences.map((experience, index) => (
                                    <Grid item xs={6} key={index}>
                                        <TextField
                                            fullWidth
                                            label={`${listExperience[index]}`}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: {
                                                    borderBottom: '1px solid #000',
                                                },
                                            }}
                                            value={experience}
                                            onChange={(e) => handleExperienceChange(index, e.target.value)}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                experiences.map((experience, index) => (
                                    <Grid item xs={6} key={index}>
                                        <TextField
                                            fullWidth
                                            label={`${listExperience[index]}`}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: {
                                                    borderBottom: '1px solid #000',
                                                },
                                            }}
                                            value={experience}
                                            onChange={(e) => handleExperienceChange(index, e.target.value)}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                        <div className="flex mt-3" style={{ float: 'right' }}>
                            <button className="bg_book_schedule mr-5" onClick={makeBrief}>Tạo hồ sơ</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="border-2 pt-2 pb-2"></div>
            <FooterComponent />
        </div >
    );
};

export default WorkingProject;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
    );
});
