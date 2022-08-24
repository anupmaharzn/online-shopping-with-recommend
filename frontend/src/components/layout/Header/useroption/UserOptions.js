import React, { useState } from 'react';
import './useroptions.scss';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitTopAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../redux/actions/userAction';
const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const history = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitTopAppIcon />, name: 'Logout', func: logoutUser },
    ];
    if (user.role === 'admin') {
        options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard });
    }

    function dashboard() {
        history("/dashboard");

    };
    function orders() {
        history("/orders");
    };
    function account() {
        history("/account");
    };
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    };
    return <React.Fragment>
        <div className='useroption'>

            <SpeedDial
                className='speedDial'
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                icon={<img
                    className='speedDial__icon'
                    src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                    alt="Profile"
                />}
            >
                {options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
                ))}
            </SpeedDial>

        </div>


    </React.Fragment>
}

export default UserOptions