import Api from './api.service';

class AuthService extends Api {
    verifyEmail(data) {
        return this.resource.post(`auth/verify-email`, data)
    }
    forgotPassword(email) {
        return this.resource.post(`auth/forgot-password`, email)
    }
    resetPassword(data) {
        return this.resource.post(`auth/reset-password`, data)
    }
    updateProfile(profile, userId) {
        return this.resource.put(`auth/profile/${userId}`, profile)
    }
    updatePassword(passwords, userId) {
        return this.resource.put(`auth/password/${userId}`, passwords)
    }
    updateAvatar(file, userId) {
        return this.resource.post(`auth/avatar/${userId}`, file, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}

export default new AuthService('auth');