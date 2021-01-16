const { Router } =require('express');
const admin = require("firebase-admin");

const db = admin.firestore()
const route = Router();
//Crear colección en la BD
route.post('/api/products', async (req, res) => { 
	try {
        await db.collection('productos')
            .doc('/' + req.body.id + '/')
            .create(req.body);
	return res.status(204).json();
	} catch (error) {
		console.log(error);
		return res.status(500).send(error)
	}
})
//Obtener objero desde la Bd ById
route.get('/api/products/:idProduct', async (req, res) => {
	try {
		const doc = await db.collection('productos').doc(req.params.idProduct)
		const item = await doc.get();
		const response = item.data()
		return res.status(200).json(response)
	} catch (error) {
		console.log(error);
		return res.status(500).send(error)
	}
 })
//Obtener la colección completa de la BD
route.get('/api/products', async (req, res) => {
	try {
		const query = db.collection('productos');
		const querySnapShoot = await query.get();
		const response=querySnapShoot.docs.map(doc => ({
			id: doc.id,
            name: doc.data().name,
			description: doc.data().description,
			codigo:doc.data().codigo,
			cost_price:doc.data().cost_price,
			img_url:doc.data().img_url,
			profit_percentage:doc.data().profit_percentage,
			quantity:doc.data().quantity,
			sale_price:doc.data().sale_price,
	}))
	return res.status(200).json(response)
	} catch (error) {
		return res.status(500).send(error)
	}
})
//Eliminar datos By id
route.delete("/api/products/:idProduct", async (req, res) => {
  try {
    const doc = db.collection("productos").doc(req.params.idProduct);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});
//Actualizar datos By id
route.put("/api/products/:idProduct", async (req, res) => {
  try {
    const document = db.collection("productos").doc(req.params.idProduct);
    await document.update({
		name: req.body.name,
		description: req.body.description,
		codigo: req.body.codigo,
		cost_price: req.body.cost_price,
		img_url: req.body.img_url,
		profit_percentage: req.body.profit_percentage,
		quantity: req.body.quantity,
		sale_price: req.body.sale_price,
		
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});
module.exports = route;

