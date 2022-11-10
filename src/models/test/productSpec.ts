import { ProductStore } from "../product";
import { OrderStore } from "../order";
import { UserStore } from "../user";
import { TagStore } from "../tag";
import resetRecord from "../resetDB";

const store = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();
const tagStore = new TagStore();

// Creating random data for orders table , We need to create orders to get the top 5 products
const orders = async () => {

    await userStore.create({id:201,fname:"ibrahim",lname:"khalid",password:"randompass"});
    await userStore.create({id:204,fname:"yara",lname:"faisal",password:"randompass"});

    await store.create({id:102,name:'workout blue jacket',price:49,category:"jackets"});
    await store.create({id:103,name:'rain jacket',price:99,category:"jackets"});
    await store.create({id:104,name:'workout jacket',price:200,category:"jackets"});
    await store.create({id:105,name:'white suit',price:299,category:"suits"});
    await store.create({id:106,name:'black suit',price:499,category:"suits"});
    await store.create({id:107,name:'blue suit',price:299,category:"suits"});
    await store.create({id:108,name:'blue jackets',price:199,category:"jackets"});

    await orderStore.create({id:301,user_id:201,order_status:"active"});
    await orderStore.create({id:302,user_id:201,order_status:"complete"});
    await orderStore.create({id:303,user_id:204,order_status:"active"});
    await orderStore.create({id:304,user_id:204,order_status:"active"});

    await tagStore.create({id:1 , product_id: 103, quantity: 12, order_id: 301})
    await tagStore.create({id:2 , product_id: 106, quantity: 8, order_id: 304})
    await tagStore.create({id:3 , product_id: 107, quantity: 2, order_id: 301})
    await tagStore.create({id:4 , product_id: 104, quantity: 1, order_id: 302})
    await tagStore.create({id:5 , product_id: 104, quantity: 9, order_id: 302})
    await tagStore.create({id:6 , product_id: 105, quantity: 3, order_id: 303})
    await tagStore.create({id:7 , product_id: 102, quantity: 7, order_id: 303})
    await tagStore.create({id:8 , product_id: 107, quantity: 1, order_id: 303})
    await tagStore.create({id:9 , product_id: 108, quantity: 7, order_id: 304})
}

// Start test here :
describe("Product Model", () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => { 
        await resetRecord();
    });

    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });

    // Test create method
    // Note : in HTTP is should provide user token to create new product
    // But since we are testing the result here , we dont need to provide user token
    it('create method should return a success message', async () => {
        const result = await store.create({
            id: 101,
            name: 'leather jacket',
            price: 49, 
            category: "jackets"
        });
        expect(result).toEqual("Created new product successfully !!");
        
    });

    // Test create method with different values 
    it('create method with different values', async () => {
        const result = await store.create({
            id: 102,
            name: 'denim jeans',
            price: 99, 
            category: "jeans"
        });
        expect(result).toEqual("Created new product successfully !!");
    });

    // Test create method with duplicated id
    it('create method with duplicate id should return a failed message', async () => {
        const result = await store.create({
            id: 101,
            name: 'leather jacket',
            price: 49, 
            category: "jackets"
        });
        expect(result).toEqual("Duplicate id");
    });

    // Test the return values from index method
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 101,
            name: 'leather jacket',
            price: 49, 
            category: "jackets"
        },{
            id: 102,
            name: 'denim jeans',
            price: 99, 
            category: "jeans"
        }]);
    });

    // Test the return value from show method , show method only showing the product by the product id
    it('show method should return a specific product', async () => {
        const result = await store.show(101);
        expect(result).toEqual([{
            id: 101,
            name: 'leather jacket',
            price: 49, 
            category: "jackets"
        }]);
    });

    // Test the return values from top 5 products ,
    it('Should show the top 5 products', async () => {
        // Calling the function to start storing new orders which then used to find the top 5 products
        await orders();
        const result = await store.topFive();
        // based on the orders data in the function orders above , we should get the same values as shown below
        // The order of the array is important here since we showing from the top to the least according to quantity
        expect(result).toEqual([
            {product_id: 103, quantity: '12'},
            {product_id: 104, quantity: '10'},
            {product_id: 106, quantity: '8'},
            {product_id: 102, quantity: '7'},
            {product_id: 108, quantity: '7'}
        ]);
    });
})