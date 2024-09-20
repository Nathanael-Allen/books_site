function validUsername(username){    
    const regex = new RegExp('[^a-zA-Z0-9_]')
    let match = regex.test(username)
    if(match){
        return false
    }
    else{
        return true
    }
}



export {
    validUsername
}