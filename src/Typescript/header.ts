import { PiBookOpenTextLight } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { FaTimeline } from "react-icons/fa6";
import { FaPhotoFilm } from "react-icons/fa6";
import { LuListTree } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";


export const header = [
    {
        id: 1,
        title: 'My Story',
        href: 'mystory',
        icon: PiBookOpenTextLight
    },
    {
        id: 2,
        title: 'Favourite',
        href: 'favourite',
        icon: CiStar
    },
    {
        id: 3,
        title: 'TimeLine',
        href: 'timeline',
        icon: FaTimeline
    },
    {
        id: 4,
        title: 'Gallery',
        href: 'gallery',
        icon: FaPhotoFilm
    },
    {
        id: 5,
        title: 'Family Tree',
        href: 'familytree',
        icon: LuListTree
    },
    {
        id: 6,
        title: 'Videos',
        href: 'videos',
        icon: IoVideocamOutline
    },
    {
        id: 7,
        title: 'Memories',
        href: 'memories',
        icon: BiMessageDetail
    },
];
