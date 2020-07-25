'use strict'
const Database = use('Database')
const User = use('App/Models/User')

class UserController {
     async store ({ request, response }) {
         try{
            const data = request.only(['username', 'email', 'password'])
            const addresses = request.input('addresses')

            const trx = await Database.beginTransaction()

            const user = await User.create(data, trx)

            await user.addresses().createMany(addresses, trx)

            await trx.commit()

            return user
         }catch ( err ){
            return response
            .status(err.status)
            .send({ erro: { message: "Algo não deu certo, confira todos os seus dados."}})
         }
     }
}

module.exports = UserController
