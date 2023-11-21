import * as Yup from 'yup'

export const registerSchema = Yup.object({
    username:Yup.string().min(3).max(20).required("Please enter a valid Username"),
    email:Yup.string().email().required("Please enter a valid Email"),
    password:Yup.string().min(6).required("Please enter a valid Password"),
    confirmPassword:Yup.string().required("Please enter the password").oneOf([Yup.ref('password'),null],"Password do not match")
})

export const loginSchema = Yup.object({
    username:Yup.string().required("Please enter a valid username"),
    password:Yup.string().min(6).required("password is a required field")
})