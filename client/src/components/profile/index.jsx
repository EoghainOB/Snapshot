import React from 'react'

const Profile = ({user}) => {
  console.log('user:',user.imgUrl)
  return (  
    <div className='profile-container'>
    <img width='50px' src={user.imageUrl} alt='Profile'/>
    <p>Hello, {user.givenName}!</p>
    <ul>
      <li>Name: {user.name}</li>
      <li>Email: {user.email}</li>
    </ul>

    </div>
  )
}

export default Profile;