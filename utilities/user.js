const users = []

// add all users to the room
function userJoin(id, username, room) {
  const existingUser = users.find(user => user.username === username)

  // if (existingUser) {
  //    return { error: "User already exist , please choose a different name" }
  //  }

  const user = { id, username, room }

  users.push(user)

  return user
}

// get only one user

function currentUser(id) {
  return users.find(user => user.id === id)
}

// remove users
function userleft(id) {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

function getUsersInRoom(room) {
  return users.filter(user => user.room === room)
}

module.exports = {
  userJoin,
  currentUser,
  userleft,
  getUsersInRoom
}
