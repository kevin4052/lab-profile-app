import axios from 'axios'

export default class AuthServices {
    constructor() {
        let service = axios.create({
            baseURL: `http://localhost:4000/api/auth`,
            withCredentials: true
        });

        this.service = service;
    }

    signup = ({username, password, campus, course}) => {
        // console.log({username, password, campus, course})
        return this.service
            .post('/signup', { username, password, campus, course })
            .then(response => response.data);
    }

    login = ({username, password}) => {
        return this.service
            .post('/login', { username, password })
            .then(response => response.data);
    }

    logout = () => {
        return this.service.delete(`/logout`).then((response) => response.data);
    }

    currentUser = () => {
        return this.service
            .get('/loggedIn')
            .then(response => response.data)
    }
}
