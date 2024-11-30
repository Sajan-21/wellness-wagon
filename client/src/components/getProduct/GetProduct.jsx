import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${params.product_id}`);
        console.log("response from getProduct : ", response);
        setProduct(response.data.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err);
      }
    };

    fetchProduct();
  }, [params.product_id]);

  return { product, error };
};

export default GetProduct;
