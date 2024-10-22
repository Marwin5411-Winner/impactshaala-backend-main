function checkEmail(email,res) {
    // Email regex pattern
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
     // Check if the email is in a valid format
     if (!emailRegex.test(email)) {
         return false;
     }
 
     // Check if "@" is the only special character
     if ((email.match(/@/g) || []).length !== 1) {
         return false;
     }
     return true;
 }


const checkNumberFields = (number)=>{
    // phone Number regex pattern
    const phoneNumberRegex = /^\d{10}$/;

    // Check if the phone Number is in a valid format
    if (!phoneNumberRegex.test(number)) {
        return false;
    }else{
        return true;
    }
}

const checkPinCode = (pin,res)=>{
    // phone Number regex pattern
    const pinCode = /^\d{6}$/;

    // Check if the phone Number is in a valid format
    if (!pinCode.test(pin)) {
        return res.status(400).json({ message: "Invalid pinCode format" });
    }

}

export {checkEmail,checkNumberFields,checkPinCode}