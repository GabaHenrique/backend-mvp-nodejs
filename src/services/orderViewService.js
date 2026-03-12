const orderViewModel = require('../models/orderViewModel');

exports.getAllOrders = async () => {
    return await orderViewModel.findAll();
};

exports.getOrderById = async (orderId) => {
    const order = await orderViewModel.findByOrderId(orderId);

    if (!order || order.length === 0) {
        throw new Error('Pedido não encontrado');
    }

    // Agrupar produtos do mesmo pedido
    const grouped = {
        order_id: order[0].order_id,
        total: order[0].total,
        status: order[0].status,
        created_at: order[0].created_at,
        items: order.map(item => ({
            product_id: item.product_id,
            name: item.product_name,
            quantity: item.quantity,
            price: item.item_price
        }))
    };

    return grouped;
};