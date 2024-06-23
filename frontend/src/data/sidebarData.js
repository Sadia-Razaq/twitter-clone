import { IoHomeOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";

export const sidebarData = [
    {
        id:1,
        title:'Home',
        icon:<IoHomeOutline/>,
       
    },
    {
        id:2,
        title:'Explore',
        icon:<IoHomeOutline/>
    },
    {
        id:3,
        title:'Notifications',
        icon:<IoHomeOutline/>
    },
    {
        id:4,
        title:'Messages',
        icon:<IoHomeOutline/>
    },
    {
        id:5,
        title:'BookMarks',
        icon:<IoHomeOutline/>
    },
    {
        id:6,
        title:'Profile',
        icon:<PiUserCircle/>,
        url:"/user-profile"
    },
]