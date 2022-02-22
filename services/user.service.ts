export default function authHeader(){
    const userInfo = localStorage.getItem('user');
    let user = null;
    if(userInfo){
        user = JSON.parse(userInfo);
        if(user && user.accessToken){
            return { 'x-access-token': user.accessToken };
        }
        return {};
    }
}