import { ProductStore } from "../product";
import { OrderStore } from "../order";
import { UserStore } from "../user";
import resetRecord from "../resetDB";


const store = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe("Order Model", () => {
    // Clearing the table records to upcoming actions
    beforeAll(async () => { 
        await resetRecord();
    });
    
    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });

    // Note : in HTTP is should provide user token to create new order
    // But since we are testing the result here , we dont need to provide user token
    it("Get current order by user", async () => {
        // create user and product
        await productStore.create({id:101,name:'rain jacket',price:99,category:"jackets"});
        await userStore.create({id:101,fname:"ibrahim",lname:"khalid",password:"randompass"});
        await store.create({id:1, product_id:101,quantity:7,user_id:101,order_status:"active"});

        const result = await store.index(101);
        expect(result).toEqual([{
            id: 1, 
            product_id: 101,
            quantity: 7,
            user_id: 101,
            order_status: "active"
        }]);
    })

    it("Get completed orders by user", async () => {
        // new completed order
        await store.create({id:2, product_id:101,quantity:7,user_id:101,order_status:"complete"});
        const result = await store.completed(101);
        expect(result).toEqual([{
            id: 2, 
            product_id: 101,
            quantity: 7,
            user_id: 101,
            order_status: "complete"
        }]);
    })
})