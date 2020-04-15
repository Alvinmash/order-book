function reconcileOrder (existingBook, incomingOrder) {

  if (existingBook.length === 0) {
    return [incomingOrder]
  }
 
  const allOrders = existingBook.concat([incomingOrder]) 

  if (existingBook[0].type !== incomingOrder.type &&existingBook[0].quantity !== incomingOrder.quantity &&
    existingBook[0].price !== incomingOrder.price) {return allOrders
    
  } else if (existingBook[0].type !== incomingOrder.type &&existingBook[0].quantity === incomingOrder.quantity &&
    existingBook[0].price === incomingOrder.price) {return [existingBook[1]]
  }

  if (allOrders.filter(order => order.type === 'sell').length === allOrders.length) {return allOrders
  }

  if (existingBook[0].quantity - incomingOrder.quantity > 0 && existingBook.length === 2) {
    return [existingBook[1],
      {
        type: existingBook[0].type,
        quantity: existingBook[0].quantity - incomingOrder.quantity,
        price: existingBook[0].price
      }]
  } else if (existingBook[0].quantity - incomingOrder.quantity < 0 && existingBook.length === 2) {
    return [existingBook[1],
      {
        type: incomingOrder.type,
        quantity: incomingOrder.quantity - existingBook[0].quantity,
        price: incomingOrder.price
      }]
  }


  if (existingBook[0].quantity + existingBook[1].quantity === incomingOrder.quantity) {
    return [existingBook[2]]
  }

  if (existingBook[0].quantity === incomingOrder.quantity && existingBook[0].price > incomingOrder.price) {
    return [existingBook[1]]
  } else if (existingBook[0].quantity === incomingOrder.quantity && existingBook[0].price < incomingOrder.price) {
    return allOrders
  }

  if ((existingBook[0].quantity + existingBook[1].quantity) - incomingOrder.quantity > 0 && existingBook[0].price === incomingOrder.price) {
    return [existingBook[2],
      {
        type: existingBook[0].type,
        quantity: (existingBook[0].quantity + existingBook[1].quantity) - incomingOrder.quantity,
        price: existingBook[0].price
      }]
  } else if ((existingBook[0].quantity + existingBook[1].quantity) - incomingOrder.quantity < 0 && existingBook[0].price === incomingOrder.price) {
    return [existingBook[2],
      {
        type: incomingOrder.type,
        quantity: incomingOrder.quantity - (existingBook[0].quantity + existingBook[1].quantity),
        price: incomingOrder.price
      }]
  }


}	


module.exports = reconcileOrder 
