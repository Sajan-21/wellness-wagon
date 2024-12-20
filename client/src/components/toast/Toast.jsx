import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ message }) {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  return <ToastContainer />;
}

export default Toast;
