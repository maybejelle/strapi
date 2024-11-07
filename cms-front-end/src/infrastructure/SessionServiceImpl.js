import Cookies from 'js-cookie';

export class SessionServiceImpl {
    setTokenAndUserId(token, userId) {
        Cookies.set('jwt', token);
        Cookies.set('userId', userId);
    }

    getToken() {
        return Cookies.get('jwt');
    }

    getUserId() {
        return Cookies.get('userId');
    }
}