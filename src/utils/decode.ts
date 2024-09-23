import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  role: string;
  exp?: number;
  iat?: number;
}

const decodeToken = (token: string | null): CustomJwtPayload | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

export default decodeToken;
