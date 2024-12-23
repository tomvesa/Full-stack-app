// api call function 

const api = (
    path, 
    method = 'GET', 
    body = null, 
    credentials = null
    ) => {
    const url = `http://localhost:5000/api/${path}`;
    //console.log(url)
    // setup fetch options
    const options = {
        method,
        headers: {},
        credentials: 'include' ,
    }
    // set option body and headers
    if(body){
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';

    }
    // set encoded credentials to check for the user within database
    if(credentials){
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    //console.log("Fetch data and options", url, options)
    return fetch(url, options);
}

export default api;