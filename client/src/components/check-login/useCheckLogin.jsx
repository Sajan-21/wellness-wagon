import { useParams } from "react-router-dom";

function useCheckLogin() {
  const params = useParams();
  const isAuthorized = !!params.auth_id;
  console.log("isAuthorized:", isAuthorized);
  return isAuthorized;
}

export default useCheckLogin;