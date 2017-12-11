user = (field, value) => {
    switch (field) {
        case 'password':
            return /^[a-z0-9]+$/i.test(value) && value.length >= 1;
        case 'username':
            return /^[a-z0-9_]+$/i.test(value) && value.length > 1;
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