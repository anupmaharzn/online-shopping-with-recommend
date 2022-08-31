import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingInfo } from '../../../redux/actions/cartAction';
import HomeIcon from '@material-ui/icons/Home'
import PinDropIcon from '@material-ui/icons/PinDrop'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PublicIcon from '@material-ui/icons/Public'
import PhoneIcon from '@material-ui/icons/Phone'
import TransferWithAStationIcon from '@material-ui/icons/TransferWithinAStation'
import { Country, State } from "country-state-city"
import { useAlert } from 'react-alert';
import './shipping.scss';
import MetaData from '../../layout/Metadata';
import CheckoutSteps from './CheckoutSteps/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const [pinCode, setPincode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, country, state, pinCode, phoneNo }),
        );
        history('/order/confirm');
    };
    useEffect(() => {
        //protected route vako vayira 
        if (isAuthenticated === false) {
            history('/login');
        }
    }, [history, isAuthenticated]);

    return (
        <React.Fragment>
            <MetaData title="SHIPPING" />
            <CheckoutSteps activeStep={0} />
            <div className='shippingContainer'>
                <div className="shippingBox">
                    <h2 className='shippingHeading'>Shipping Details</h2>
                    <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>

                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                <option value="NP">Nepal</option>
                                {/* {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))
                                } */}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithAStationIcon />
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}
                        <input
                            type="submit"
                            value="Continue"
                            className="btn btn__cart"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Shipping