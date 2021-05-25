const regex = {
        password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        //password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})$/,
        mobile: /^([123456789][0-9]{8})$/,
        otp: /^[0-9]{5}$/,
        email: /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
        cin: /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/,
        abn: "[0-9]{11}",
        alpha: /^[a-zA-Z\s.]*$/,
        alphaSpecial: /^[ A-Za-z&]*$/,
        numeric: /^\d+$/,
        // max_budget: "[0-9]+(\.[0-9][0-9]?)?",
        alphaNumeric: /^[a-zA-Z0-9]*$/,
        fullname: /^[a-zA-Z ]{3,50}$/,
};

export default regex;
