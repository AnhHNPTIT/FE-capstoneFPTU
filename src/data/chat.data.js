import Avatar from "../images/avatar-customer.png"
import MsgImage from "../images/list-project-screen-banner.png"
const ChatList = [
    {
        id: 0,
        img: Avatar,
        name: "Đào Đức",
        msg: "abcxyz",
        time: "9:36",
        unread: 0,
        pinned: true,
        online: true,
        history: [
            {
                type: "msg",
                message: "Hi 👋🏻, How are ya ?",
                incoming: true,
                outgoing: false,
            },
            {
                type: "msg",
                message: "Hi 👋 Panda, not bad, u ?",
                incoming: false,
                outgoing: true,
            },
        ]
    },
    {
        id: 1,
        img: Avatar,
        name: "Lưu Vinh",
        msg: "Hello",
        time: "12:23",
        unread: 2,
        pinned: true,
        online: false,
        history: [
            {
                type: "msg",
                message: "Can you send me an abstarct image?",
                incoming: false,
                outgoing: true,
            },
            {
                type: "msg",
                message: "Ya sure, sending you a pic",
                incoming: true,
                outgoing: false,
            },
        ]
    },
    {
        id: 2,
        img: Avatar,
        name: "Trần Khải",
        msg: "Hi dnfandjksa",
        time: "10:35",
        unread: 3,
        pinned: false,
        online: true,
        history: [
            {
                type: "msg",
                subtype: "img",
                message: "Here You Go",
                img: MsgImage,
                incoming: true,
                outgoing: false,
            },
        ]
    },
    {
        id: 3,
        img: Avatar,
        name: "Trần Thành",
        msg: "Bandle ámldmmkfsa",
        time: "04:00",
        unread: 0,
        pinned: false,
        online: true,
        history: [
            {
                type: "msg",
                message: "Can you please send this in file format?",
                incoming: false,
                outgoing: true,
            },

            {
                type: "msg",
                subtype: "doc",
                message: "Yes sure, here you go.",
                incoming: true,
                outgoing: false,
            },
        ]
    },
    {
        id: 4,
        img: Avatar,
        name: "Đức Hải",
        msg: "Canstalseo",
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
        history: [
            {
                type: "msg",
                subtype: "link",
                preview: MsgImage,
                message: "Yep, I can also do that",
                incoming: true,
                outgoing: false,
            },
        ]
    },
    {
        id: 5,
        img: Avatar,
        name: "Hoàng Anh",
        msg: "BucaBuca kdlfjklds",
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
        history: [
            {
                type: "msg",
                subtype: "reply",
                reply: "This is a reply",
                message: "Yep, I can also do that",
                incoming: false,
                outgoing: true,
            },
        ]
    },
    {
        id: 6,
        img: Avatar,
        name: "Trần Anh",
        msg: "Dango f231jksa",
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
        history: []
    },
    {
        id: 7,
        img: Avatar,
        name: "Nguyễn Thành",
        msg: "Bicabu skdnankjfas",
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
        history: []
    },
    {
        id: 8,
        img: Avatar,
        name: "Nguyễn Thành",
        msg: "Bicabu skdnankjfas",
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
        history: []
    },
]

export {
    ChatList,
};