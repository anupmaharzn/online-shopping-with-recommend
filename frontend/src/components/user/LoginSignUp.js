// eslint-disable-next-line
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
// eslint-disable-next-line
import Loader from '../../components/layout/Loader/loader';
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { login, register, clearErrors } from '../../redux/actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import './loginsignup.scss'

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            history('/account');
        }
    }, [dispatch, error, alert, history, isAuthenticated])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        }
        if (tab === "register") {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');

            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToLeft')
        }
    };
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        console.log("login form submitted");
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();

        myform.set('name', name);
        myform.set("email", email);
        myform.set('password', password);
        myform.set('avatar', avatar);
        dispatch(register(myform));
        console.log(" signup form submitted")
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    return (
        <React.Fragment>
            {loading ? <Loader /> : <React.Fragment>
                <div className='loginSignUpContainer'>
                    <div className='loginsignupbox'>
                        <div className='tabcontainer'>
                            <div className='login_signup_toggle'>
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button className="borderbtn" ref={switcherTab}></button>
                        </div>
                        <form className='loginform' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forget">Forget Password?</Link>
                            <input type="submit" value="Login" className="btn btn__cart" />
                        </form>
                        <form className="signinform" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                            <div className='signUpName'>
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpEmail'>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Register"
                                className='btn btn__cart'
                            //disabled={loading ? true : false}
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>}
        </React.Fragment>
    )
}

export default LoginSignUp