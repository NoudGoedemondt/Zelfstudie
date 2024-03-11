import { List, set, Range, Map } from "immutable";

type User = { id:string, name:string, surname:string, age:number }
let users: Map<User["id"], User> = Map()
const addUser = (newUser:User): void => {
    users = users.set(newUser.id, newUser)
}

addUser({ id:"6", name:"Noud", surname:"Goedemondt", age:24 })
addUser({ id:"7", name:"Deez", surname:"Nuts", age:21 })

console.log(users.get("6"))