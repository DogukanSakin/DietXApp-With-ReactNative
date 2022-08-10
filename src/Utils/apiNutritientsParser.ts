export default function(key:any){
    switch(key){
        case 203 : return 'Protein';
        case 204 : return 'Fat';
        case 205 : return 'Carbohydrate';
        case 207 : return 'ASH';
        case 208 : return 'Energy';
        case 209 : return 'Starch';
        case 210 : return 'Sucrose';
        case 211 : return 'Glucose';
        case 212 : return 'Fructose';
        case 213 : return 'Lactose';
        case 214 : return 'Maltose';
        case 221 : return 'Alcohol';
        case 255 : return 'Water';
        case 257 : return 'Adjusted Protein';
        case 262 : return 'Caffeine';
        case 263 : return 'Theobromine';
        case 268 : return 'Energy';
        case 269 : return 'Sugars';
        default : return 'Unknown';
    }

}