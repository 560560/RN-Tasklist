import * as axios from "axios"
let instance = axios.create({
    baseUrl: "http://agro-api.site:4000/",
})

export const navbarApi = {
    getAppName() {
        
        return instance.get("appName").then(response => {
            console.log(response)
            response.data.appName
        })
    }
}