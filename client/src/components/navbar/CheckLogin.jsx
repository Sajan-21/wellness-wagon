import { useNavigate, useParams } from 'react-router-dom';

function CheckLogin() {
  const navigate = useNavigate();
  const params = useParams();

  return (page) => {

    if (!params.auth_id || !params.user_type) {
      alert("Login/Sign Up to continue");
      navigate('/login');
    }else{
        const auth_id = params.auth_id;
        const user_type = params.user_type;

        if (page === 'dashboard') {
            switch (user_type) {
              case 'Admin':
                navigate(`/admin-dashboard/${auth_id}/${user_type}`);
                break;
              case 'Seller':
                navigate(`/seller-dashboard/${auth_id}/${user_type}`);
                break;
              case 'Buyer':
                navigate(`/buyer-dashboard/${auth_id}/${user_type}`);
                break;
              default:
                alert("Something is wrong with your user role. Try again or contact the help center.");
            }
        } else if (page === 'cart') {
            navigate(`/cart/${auth_id}`);
        } else if (page === 'wish_list') {
            navigate(`/wish-list/${auth_id}`);
        }
    }
  };
}

export default CheckLogin;
