
const api = (
    path, 
    method = 'GET', 
    body = null, 
    credentials = null
    ) => {
    const url = `http://localhost:5000/${path}`;
    console.log(url)

    const options = {
        method,
        headers: {},
       // cache: 'no-store'
    }

    if(body){
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
        options.credentials = 'include' ;
    }

    if(credentials){
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    console.log(url, options)
    return fetch(url, options);
}

export default api;