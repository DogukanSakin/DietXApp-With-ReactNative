export default function(contentData:any){
    return Object.keys(contentData).map(key=>{
        return {
            id:key,
            ...contentData[key]
        }
    });
}