import request from 'superagent';
const API_URL = 'https://lab-12-be-dylan.herokuapp.com';

export async function signIn(email, password) {
    let result = {
        badCreds: false,
        error: false,
        token: undefined
    }
    let response = null;
    try {
        response = await request
            .post(`${API_URL}/auth/signin`)
            .send({ email, password });
        console.log(response.body);
        result.token = response.body.token;
    } catch (e) {
        const errorMessage = e.response.body.error
        if(errorMessage === "email or password incorrect" || errorMessage === "email and password required") {
            result.badCreds = true;
        } else {
            result.error = true;
        }
    }
    return result;
}

export async function signUp(email, password) {
    let result = {
        badCreds: false,
        error: false,
        token: undefined
    }
    let response = null;
    try {
        response = await request
            .post(`${API_URL}/auth/signup`)
            .send({ email, password });
        console.log(response.body);
        result.token = response.body.token;
    } catch (e) {
        const errorMessage = e.response.body.error
        if(errorMessage === "email or password incorrect" || errorMessage === "email and password required") {
            result.badCreds = true;
        } else {
            console.log(e.response.body);
            result.error = true;
        }
    }
    return result;
}

export async function getTodos(token) {
    try {
        let response = await request
            .get(`${API_URL}/api/todos`)
            .set('Authorization', token)
        return response.body;
    } catch (e) {
        console.log(e);
    }
}

export async function addTodo(todo, token) {
    let response = await request
        .post(`${API_URL}/api/todos`)
        .set('Authorization', token)
        .send({ todo });
    return response.body;
}