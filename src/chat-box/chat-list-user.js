import React, { useState, useEffect } from "react";
import {
    Box,
    Stack,
    Typography,
    InputBase,
    Avatar,
    Badge,
    Switch,
    useTheme
} from "@mui/material";
import {
    MagnifyingGlass,
} from "phosphor-react";
import { styled, alpha } from "@mui/material/styles"
import SimpleBarReact from "simplebar-react";
import { ChatList } from "../data/chat.data.js"
import useSettings from "../hooks/useSettings.js";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
    // maxHeight: '100%',
    '& .simplebar-scrollbar': {
        '&:before': {
            backgroundColor: alpha(theme.palette.grey[600], 0.48),
        },
        '&.simplebar-visible:before': {
            opacity: 1,
        },
    },
    '& .simplebar-track.simplebar-vertical': {
        width: 10,
    },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
        height: 6,
    },
    '& .simplebar-mask': {
        zIndex: 'inherit',
    },
    "& .simplebar-placeholder": {
        height: '0 !important',
    }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ChatElement = ({ id, name, img, msg, time, unread, online, onChatClick }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive); // Toggle trạng thái isActive khi click
        onChatClick(id);
    };

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: isActive ? '#EFEFEF' : '#FFF',
                cursor: 'pointer'
            }}
            p={2}
            onClick={handleClick}
        >
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Stack direction={"row"} spacing={2}>
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar src={img} />
                    )}

                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption">{msg}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={'center'}>
                    <Typography sx={{ fontWeight: 600 }} variant='caption'>
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={unread} />
                </Stack>
            </Stack>
        </Box>
    );
};

const SearchUserChat = styled("div")(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.paper, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%'
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%'
    },
}));
const Chats = ({ onChatClick }) => {
    const { onToggleMode } = useSettings();

    return (
        <Stack direction={'row'}>
            <Box sx={{
                position: 'relative',
                width: 400,
                backgroundColor: '#F8FAFF',
                boxShadow: '0 0 2px rgba(0,0,0,0.25)'
            }}>
                <Stack p={5} spacing={2} sx={{ height: "100vh" }}>
                    <Stack
                        direction='row'
                        alignItem='center'
                        justifyContent='space-between'
                    >
                        <Typography variant="h5">
                            Đoạn chat
                        </Typography>
                        <MaterialUISwitch onChange={() => {
                            onToggleMode();
                        }} defaultChecked />
                    </Stack>
                    <Stack sx={{ width: '100%' }}>
                        <SearchUserChat>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
                        </SearchUserChat>
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1, overflow: "hidden scroll", height: "100%" }}>
                        {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                Pined
                            </Typography>
                            {ChatList.filter((el) => el.pinned).map((el, key) => {
                                return <ChatElement key={key} {...el} onChatClick={onChatClick} />
                            })}
                        </Stack>
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767", marginTop: "2px" }} >
                                All chat
                            </Typography>
                            {ChatList.filter((el) => !el.pinned).map((el, key) => {
                                return <ChatElement key={key} {...el} onChatClick={onChatClick} />
                            })}
                        </Stack>
                        {/* </SimpleBarStyle> */}
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
};
export default Chats;