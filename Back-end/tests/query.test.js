const { getAdmin, insertaAdmin } = require('../controllers/administrator/queries');
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
        let code = await faker.internet.ip().toString().slice(0,4);

        let rows = await insertaAdmin(username, password, name, lastName, email, phone1, phone2, code);

        expect(rows.rows.length).toBe(0);

    })
})


