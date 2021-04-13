import React from 'react'

const Profile = () => {
    const user=localStorage.getItem('username')
    console.log(user)
    return (
        <div>
            <div className="profile">
                <h3>{user}</h3>
            </div>
        </div>
    )
}

export default Profile
