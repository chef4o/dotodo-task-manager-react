const baseUrl = 'http://localhost:3030/jsonstore/users';

export const getAll = async() => {
    try {
        const response = await fetch(baseUrl);
        const result = response.json();        

        return Object.values(result);
    } catch (error) {
        console.log(error);
    }
}