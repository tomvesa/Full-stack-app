
const api = (
    path, 
    method = 'GET', 
    body = null, 
    credentials = null
    ) => {
    const url = `http://localhost:5000/api/${path}`;
    console.log(url)

    const options = {
        method,
        headers: {},
        credentials: 'include' ,
       // cache: 'no-store'
    }

    if(body){
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';

    }

    if(credentials){
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    console.log("Fetch data and options", url, options)
    return fetch(url, options);
}

export default api;