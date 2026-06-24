import Order from "../models/order.js";

export async function createOrder(req, res) {

    //order id : BBB0000001

    // if(req.user == null || req.user == undefined) {     // Check if user is authenticated
        
    //     return res.status(401).json({

    //         message: "You are not authenticated"

    //     });
    // }

    try {

        const user = req.user; // Get the authenticated user from the request

        if(user == null || user == undefined) {     // Check if user is authenticated
            return res.status(401).json({
                message: "You are not authenticated"
            });
        }

        const orderlist =  await Order.find().sort({date: -1}).limit(1);

        let newOrderId = "BBB0000001";

        if(orderlist.length != 0) {

            let lastOrderIdString = orderlist[0].orderId; // "BBB0000001"
            let lastOrderNumberInSring = lastOrderIdString.replace("BBB", ""); // "0000001"
            let lastOrderIdNumber = parseInt(lastOrderIdNumberInSring); // 1
            let newOrderIdNumber = lastOrderIdNumber + 1; // 2
            
            //padstart the new order id number with 0 to make it 6 digits
            let newOrderIdNumberInString = newOrderIdNumber.toString().padStart(6, "0"); // "0000002"

            newOrderId = "BBB" + newOrderIdNumberInString; // "BBB0000002"
        }

        let customerName = req.body.customerName;
        let phone = req.body.phone;
        
        if(customerName == null || customerName == undefined) {
            customerName = user.firstName + " " + user.lastName;
        }

        if(phone == null || phone == undefined) {
            phone = "N/A";
        }

        const itemsRequest = req.body.items; // Array of items from the request body
        const items = itemsRequest.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image
        }));

        const newOrder = new Order({
            orderID: newOrderId,
            items: items,
            customerName: customerName,
            email:user.email,
            phone: phone,
            address: req.body.address,
            total: req.body.total,
            date: new Date()
        });

        await newOrder.save();

        return res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
    }
    catch(error) {

        console.error("Error creating order:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }


}