import React from "react";
import { Stack, Divider, Typography, Box, Link, IconButton } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import { File } from "phosphor-react"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const Timeline = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Divider width='40%' />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>{el.text}</Typography>
            <Divider width='40%' />

        </Stack>
    )
};

const TextMsg = ({ el }) => {
    console.log("el == ", el);
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 2,
                    width: "max-content",
                }}>
                <Typography
                    variant="body2"
                    color={
                        el.incoming ?
                            theme.palette.text : "#FFF"
                    }>
                    {el.message}
                </Typography>
            </Box>
        </Stack>
    )
};

const MediaMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 2,
                    width: "max-content",
                }}>
                <Stack spacing={1}>
                    <img
                        src={el.img}
                        alt={el.message}
                        style={{ maxHeight: 210, borderRadius: '20px' }} />
                    <Typography
                        variant="body2"
                        color={el.incoming ?
                            theme.palette.text : "#FFF"}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
};

const DocMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 2,
                    width: "max-content",
                }}>
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction={'row'}
                        spacing={3}
                        alignItems={'center'}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1
                        }}>
                        <File size={40} />
                        <Typography>Abstract.png</Typography>
                        <IconButton>
                            <FileDownloadIcon />
                        </IconButton>
                    </Stack>
                    <Typography
                        variant="body2"
                        sx={{
                            color: el.incoming ?
                                theme.palette.text : "#FFF"
                        }}
                    >
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
};
const LinkMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 2,
                    width: "max-content",
                }}>
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        spacing={3}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1
                        }}>
                        <img
                            src={el.preview}
                            alt={el.message}
                            style={{
                                maxHeight: 210, borderRadius: "10px"
                            }} />
                        <Stack spacing={2}>
                            <Typography
                                variant="subtitle2">
                                Creating Chat App
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ color: theme.palette.primary.main }}
                                component={Link} to="//https://www.youtube.com">www.youtube.com
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color={el.incoming ? theme.palette.text : "#FFF"}>Oops</Typography>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
};
const ReplyMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming ?
                        theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 2,
                    width: "max-content",
                }}>
                <Stack spacing={2}>
                    <Stack p={2}
                        direction={'column'}
                        spacing={3}
                        alignItems={'center'}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2,
                            border: 'solid 5px' + (el.incoming ?
                                theme.palette.primary.main : theme.palette.background.paper),
                        }} >
                        <Typography variant="body2" color={theme.palette.text}>
                            {el.message}
                        </Typography>
                    </Stack>
                    <Typography variant="body2"
                        color={el.incoming ? theme.palette.text : "#FFF"}>
                        {el.reply}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
};
export {
    Timeline,
    TextMsg,
    MediaMsg,
    DocMsg,
    LinkMsg,
    ReplyMsg
};