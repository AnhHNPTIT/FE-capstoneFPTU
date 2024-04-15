import { Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import BannerLogin from '../images/banner_login.png';

const Register = () => {
    const pushLink = useNavigate();

    const linkScreenDesigner = () => {
        pushLink("/register-designer");
    };

    const linkScreenCustomer = () => {
        pushLink("/register-customer");
    };

    return (
        <div className='flex items-center justify-center h-screen banner-bg-all'>
            <div className='flex max-w-custom-width'>
                <Image
                    width={500}
                    height={679}
                    src={BannerLogin}
                    className='bg-white'
                    preview={false} />
                <div className='with-banner-login flex items-center justify-center'>
                    <div>
                        <div className='text-xs font-bold flex justify-center mb-12'> Welcome </div>
                        <div className='text-3xl font-bold flex justify-center mb-12'> Đăng ký với: </div>
                        <div className='border-button-designer mb-8' onClick={linkScreenDesigner}>Kiến trúc sư</div>
                        <div className='border-button-customer mb-12' onClick={linkScreenCustomer}>Khách hàng</div>
                        <div className='banner-login-color flex justify-center'>
                            Bạn đã có tài khoản? <Link to="/login" className='banner-login-here'>Đăng nhập tại đây</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
