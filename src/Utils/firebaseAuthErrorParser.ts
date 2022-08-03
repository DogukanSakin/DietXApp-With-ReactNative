export default function(errorCode:any){
    switch (errorCode) {
        case "auth/invalid-email": return "You entered an invalid e-mail."; break;
        case "auth/email-already-exists": return "An account with this email already exists."; break;
        case "auth/weak-password": return "Your password is too weak."; break;
        case "auth/user-not-found": return "No registered user found with this email."; break;
        case "auth/wrong-password": return "The entered password is incorrect."; break;
        case "auth/email-already-in-use": return "The email address is already in use by another account."; break;
        default: return errorCode; break;
    }

}