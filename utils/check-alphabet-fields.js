function checkAlphabetFields(alpha){
    const alpharegex = /^[a-z A-Z]+$/
    let result = alpharegex.test(alpha);

    if(result){
        return true;
    }else{
        return false;
    }
}

export default checkAlphabetFields;