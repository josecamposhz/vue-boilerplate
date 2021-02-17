export default class User {
    constructor(user = {}) {
        this.id = user.id || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.email = user.email || '';
        this.avatar = `${process.env.VUE_APP_API_URL}/static/avatar/${user.avatar}` || `${process.env.VUE_APP_API_URL}/static/avatar/default.jpg`;
        this.role = user.role || '';
        this.created = user.created || '';
        this.updated = user.updated || '';
    }
}