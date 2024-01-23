
export const getAuthenticationData = () => {
    // let loginData = {
    //   "token": ???,
    //   "email": ???,
    //   "id": ???,
    //   "name": ???
    //   "role": ???
    // }

    // @ts-ignore
    return JSON.parse(localStorage.getItem("loginData"));
}