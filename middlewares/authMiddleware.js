const authLoggingMiddleware = (req, res, next) => {
    if (req.path.includes('google') || req.path.includes('auth') || req.path.includes('debug')) {
        console.log(`\n🔍 [${new Date().toISOString()}] ${req.method} ${req.path}`);
        console.log('   Session ID:', req.sessionID);
        console.log('   Has User:', !!req.user);
        console.log('   User ID:', req.user ? req.user.id : 'NONE');
        console.log('   Cookies:', req.headers.cookie ? 'Present' : 'None');
    }
    next();
};

module.exports = {
    authLoggingMiddleware
};