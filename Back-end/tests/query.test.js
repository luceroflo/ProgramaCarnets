const { getAdmin, insertaAdmin } = require('../controllers/administrator/queries');
const { getUser, insertaUser } = require('../controllers/user/queries');

const faker = require('faker');

describe('Test report transaction queries', () => {

    it('Deberia traer administradores', async () => {
        
        let rows = await getAdmin('e');
        expect(rows.rows.length).toBeGreaterThan(0);
    });

    it('Deberia insertar un administrador', async () => {
        let name = await faker.name.firstName().toString().slice(0,20);
        let lastName = await faker.name.lastName().toString().slice(0,30);
        let password = await faker.internet.password().toString().slice(0,20);
        let email = await faker.internet.email().toString().slice(0,20);
        let phone1 = await faker.phone.phoneNumber().toString().slice(0,11);
        let phone2 = await faker.phone.phoneNumber().toString().slice(0,11);
        let username = await faker.internet.userName().toString().slice(0,20);
        let cedula = Math.floor(Math.random() * 100000000);
        let rows = await insertaAdmin(username, password, name, lastName, email, phone1, phone2, cedula);

        expect(rows.rows.length).toBe(0);

    })

    it('Deberia insertar un usuario', async () => {

        let name = await faker.name.firstName().toString().slice(0,20);
        let lastName = await faker.name.lastName().toString().slice(0,30);
        let email = await faker.internet.email().toString().slice(0,20);
        let phone1 = await faker.phone.phoneNumber().toString().slice(0,11);
        let cedula = Math.floor(Math.random() * 100000000);
        let rows = await insertaUser(name, lastName, cedula, phone1, email, name, 41);

        expect(rows.rows.length).toBe(0);
    })
})


