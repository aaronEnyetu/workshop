const SUPABASE_URL = 'https://wuqcwgxturbjhkdtdjwn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cWN3Z3h0dXJiamhrZHRkanduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI3MjQ0MjMsImV4cCI6MTk2ODMwMDQyM30.qVkreSGtYAMaEk7THSwEY_1E0AB9q0iNMjuFXHaIa8Q';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
export async function getWorkshops() {
    const response = await client.from('workshops').select('*, participants(*)');
    if (response.error) {
        console.error(response.error.message);

    } else {
        return response.data;
    } 
    return checkError(response);
}

export async function createParticipant(participant) {
    //create participant using the participant argument
    const response = await client.from('participants').insert({ ...participant, user_id: client.auth.session().user.id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
    return checkError(response);
}

export async function deleteParticipant(id) {
    //delete a single participant using the id argument

    const response = await client.from('participants').delete().eq('id', id);

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}