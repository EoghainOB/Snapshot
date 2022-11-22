import React from 'react'

const Profile = ({user}) => {
  console.log('user:',user)
  return (  
    <p>Hello, {user.givenName}!</p>
  )
}

export default Profile;