
export function getCookie(){
    return document.cookie.split("; ")
    .find(row => row.startsWith("token="))
    .split("=")[1] 
}

