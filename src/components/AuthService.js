import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        //this.domain = domain || 'http://localhost:5000/api'
		this.domain = domain || 'https://dilogflowauth.herokuapp.com/api'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }
	
	dialogFlowLogin (email, password) {
		
		var userData = [
		  {"email":"vijay.bandarupalli@gmail.com", "password":"valuelabs123", "name": "vijay"},
		  {"email":"vijay.bandarupalli@valuelabs.com", "password":"valuelabs123", "name": "vijay"},
		  {"email":"srinivas.namashivaya@gmail.com", "password":"valuelabs123", "name": "srinivas"},
		  {"email":"srinivas.namashivaya@valuelabs.com", "password":"valuelabs123", "name": "srinivas"},
		  {"email":"devika.veeravalli@valuelabs.com", "password":"valuelabs123", "name": "devika"},
		  {"email":"devika.valuelabs@gmail.com", "password":"valuelabs123", "name": "devika"},
		];
		var loginSuccess = false;
		var loginUserName = '';
		for(var i in userData) {
			if (userData[i].email == email && userData[i].password == password) {
				loginSuccess = true;
				loginUserName = userData[i].name;
				break;
			}
		}
		if (loginSuccess == true) {
			alert('success');
			
			return ({
			  "name" : loginUserName
			});
		} else {
			alert('Invalid user');
		}
	}
	
    login(email, password) {
		
        // Get a token
        //return this.fetch(`${this.domain}/login`, {
		var apiResponse = this.fetch(`${this.domain}/dialogflow-login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            this.setToken(res.token)
            return Promise.resolve(res);
        });

		return ({ 'result': apiResponse});
    }


    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}