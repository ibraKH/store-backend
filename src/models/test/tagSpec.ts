import { ProductStore } from "../product";
import { TagStore } from "../tag";
import { OrderStore } from "../order";
import { UserStore } from "../user";
import resetRecord from "../resetDB";

const store = new TagStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();

// Start test here :
describe("tags Model", () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => { 
        await resetRecord();
        await productStore.create({id: 101,name: 'leather jacket',price: 49, category: "jackets"});
        await userStore.create({id: 201,fname: "ibrahim",lname: "khalid",password: "randomPass"});
        await orderStore.create({id: 301,user_id: 201, order_status: "active"});
    });

    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });

    it('create method should return a success message', async () => {
        const result = await store.create({id: 401, product_id: 101, quantity: 4, order_id: 301});
        expect(result).toEqual("Created new tag successfully !!");
    });

    // Test create method with duplicated id
    it('create method with duplicate id should return a failed message', async () => {
        const result = await store.create({id: 401, product_id: 101, quantity: 4, order_id: 301});
        expect(result).toEqual("Duplicate id");
    });

    it('index method should return tags', async () => {
        const result = await store.index();
        expect(result).toEqual([{ id: 401, product_id: 101, quantity: 4, order_id: 301 }]);
    });
})