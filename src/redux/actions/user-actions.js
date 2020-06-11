export const UPDATE_USER = 'users:updateUser' // the colon scopes the type so it avoids collisions with other reduccers

const updateUser = newUser => ({
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    })

export {updateUser}