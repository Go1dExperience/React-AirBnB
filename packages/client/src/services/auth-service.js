import * as jwt from "jsonwebtoken";
import * as moment from "moment";

class AuthService {
    getToken() {
        return localStorage.getItem("auth_token");
    }

    getExpiration(token) {
        const decoded = jwt.decode(token);
        return moment.unix(decoded.exp);
    }

    isValid(token) {
        return moment().isBefore(this.getExpiration(token));
    }
    addToken(token) {
        localStorage.setItem("auth_token", token);
    }
    removeToken() {
        localStorage.removeItem("auth_token");
    }

    getUsername() {
        return jwt.decode(this.getToken()).username;
    }

    isAuthenticated() {
        const token = this.getToken();
        return token && this.isValid(token) ? true : false;
    }
}

export default new AuthService();
