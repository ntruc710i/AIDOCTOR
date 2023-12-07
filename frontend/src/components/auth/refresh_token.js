import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const isTokenExpired = (token) => {
  try {
    const payload = jwtDecode(token);
    const exp = payload.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp > exp;
  } catch (error) {
    return true;
  }
};

export const refreshToken = async () => {
   // Đảm bảo rằng bạn đã sử dụng useNavigate trong một component

  try {
    const storedToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');


    if (storedToken && isTokenExpired(storedToken)) {
      // Gửi yêu cầu lấy Access Token mới với Refresh Token
      const response = await axios.post('http://127.0.0.1:8000/refresh-token', {}, {
        headers: {
          Authorization: `Bearer ${refreshToken}`, // refreshToken là Refresh Token bạn đã lưu
        },
      });

      const newAccessToken = response.data.access_token;
      localStorage.setItem('access_token', newAccessToken);
      // Thực hiện các thao tác khác sau khi cập nhật Access Token
      console.log("Token Refreshed");
    } else {
      console.log("Token Unexpired");
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};
