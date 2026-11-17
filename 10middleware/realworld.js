const checkAuth = (req, res, next) => {

    // Imagine we verified the JWT token here
    const user = {
        id: 101,
        name: "Akshat",
        role: "admin"
    };

    // Attach user information to request
    req.user = user;

    next();

};

app.get('/dashboard', checkAuth, (req, res) => {

    res.json({
        message: "Welcome to dashboard",
        user: req.user
    });

});