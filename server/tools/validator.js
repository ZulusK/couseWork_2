user = (field, value) => {
    switch (field) {
        case 'password':
            return /^[a-z0-9]+$/i.test(value) && value.length >= 4;
        case 'email':
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) && value.length > 1
        default:
            return true;
    }
}

module.exports = (name, field, value) => {
    switch (name) {
        case 'user':
            return user(field, value);
            break;
        default:
            return true;
    }
}