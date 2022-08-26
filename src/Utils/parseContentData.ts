export default function(contentData:any,parseMessageData?:boolean){
    //For sort the message data by date
    if(parseMessageData==true){
        return Object.keys(contentData).map(key=>{
            return{
                id:key,
                ...contentData[key],
            }
        }).sort(
            function(a, b) {
                return (a.sendTime < b.sendTime) ? -1 : ((a.sendTime > b.sendTime) ? 1 : 0);
            }
        );
    }
    else{
        return Object.keys(contentData).map(key=>{
            return {
                id:key,
                ...contentData[key]
            }
        });
    }
   
    
}