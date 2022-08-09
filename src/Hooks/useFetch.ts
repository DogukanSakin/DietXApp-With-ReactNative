import axios from "axios";
export default async function (url:any){
        try {
            const data = await axios.get(url , {
                headers : {
                    'x-app-id': "d65fbf45",
                    'x-app-key': "0f322b397b3bd9fa4b8f462318e840c9",
                    'x-remote-user-id': "0"
                    }
            })
            return data;
        
        } catch (err:any) {
           console.log(err);  
        }
}
  

