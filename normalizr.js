
import { Schema, arrayOf,  normalize } from 'normalizr'

const b = normalize([{'name': 'p1', 'age': 20}, {'name': 'p2', 'age': 20}], arrayOf(new Schema('users', {"idAttribute": "name"})))

for(var key in b) {

    console.log(key, b[key])
}

console.log(b.entities.users.p1)
