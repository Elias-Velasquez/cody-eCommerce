import axios from "axios";   //importamos axios porque vamos a fechear


const userActions = {

    signUpUsers: (userData) => { //funcion

        return async (dispatch, getState) => { //propiedades de despacho y estado
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })
                console.log(res)

                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message, // SNACKBAR
                        success: res.data.success
                    }
                })
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },


    signInUser: (logedUser) => {

        return async (dispatch, getState) => {

            const res = await axios.put('http://localhost:4000/api/auth/signin', { logedUser }) //aca tenia get y es .post
            console.log(res)
            if (res.data.success) {
                localStorage.setItem('token', res.data.response.token)
                dispatch({
                    type: 'USER',
                    payload: res.data.response.userData,
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                })


            } else {
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })

            } return res

        }
    },

    signOutUser: (userOut) => {

        return async (dispatch, getState) => {
            const res = axios.post('', { userOut })
            localStorage.removeItem('token')
            dispatch({
                type: 'USER',
                payload: null,
            })
        }
    },

    modifyUser: (id , modifiedUser) => {
        const userId = id
        console.log(userId)
        return async (dispatch,getState) => {
            const res = await axios.put(`http://localhost:4000/api/auth/profile/${id}`, modifiedUser)
            console.log(res)
            return res
        }
    },

    getUserById: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/auth/${id}`)
            dispatch({ type: "GET_USER_BY_ID", payload: res.data.response.user })
            return res

        }
    },

    VerificateToken: (token) => {

        return async (dispatch, getState) => {
            await axios.get('http://localhost:4000/api/auth/signInToken',
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'USER', payload: user.data.response });
                        dispatch({
                            type: 'MESSAGE',
                            payload: {
                                view: true,
                                message: user.data.message,
                                success: user.data.success
                            }
                        });
                    } else { localStorage.removeItem('token') }
                }
                ).catch(error => {
                    if (error.response.status === 401)
                        dispatch({
                            type: 'MESSAGE',
                            payload: {
                                view: true,
                                message: "Please, sign In Again",
                                success: false
                            }
                        })
                    localStorage.removeItem('token')
                })
        }
    }

}


export default userActions