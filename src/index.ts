import assert from 'assert'
import { Db, MongoClient, ObjectId } from 'mongodb'
import { url } from './password'

const options = {
  useNewUrlParser: true
}

async function main () {
  const client = await MongoClient.connect(url, options)
  console.log('connection ok')

  const db = client.db('families')

  const result = await insertDocument(db)
  console.log(JSON.stringify(result))
  client.close()
}

async function insertDocument (db: Db) {
  return db.collection('families').insertOne({
    address: { country: 'USA', state: 'WA', city: 'Seattle' },
    children: [{ firstName: 'John', gender: 'male', grade: 7 }],
    id: 'AndersenFamily',
    lastName: 'Andersen',
    parents: [{ firstName: 'Thomas' }, { firstName: 'Mary Kay' }],
    pets: [{ givenName: 'Fluffy' }]
  })
}

main()
