async function userProfile(member,_roles,warnings,strikes,muted,timeOfMute,muteDuration,muteReason,banned,appealable,timeOfBan,banReason){
    //get users from local storage
    users = JSON.parse(localStorage.getItem('users'));
    //updates user data
    let newUser = {
        userID: member.user.id,
        tag: member.user.tag,
        _roles: _roles,
    }
    //push new user to
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    //find user by user id
    findObjectByKey(users,'userID',member.user.id)._roles.forEach(x => {
        member.guild.members.cache.get(member.user.id).roles.add(x);
        console.log(x)
    });
}
//findObjectByKey
function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

//createProfile Function
module.exports.userProfile = userProfile;