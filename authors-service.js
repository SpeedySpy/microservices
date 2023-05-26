const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let authors = [
    { id:1, name:"Biraveen1"},
    { id:2, name:"Biraveen2"},
    { id:3, name:"Biraveen3"},
    { id:4, name:"Biraveen4"},
    { id:5, name:"Biraveen5"},   
];

app.get('/authors', async (req,res)=>{
    res.json(authors)
});

app.get('/authors/:id', (req,res)=>{
const id = parseInt(req.params.id);
const author = authors.find(author =>author.id === id);

if (author){
    res.json(authors)
}else{
    res.status(404).json({error:'Author non trouvé'})
}
})


app.listen(4000, ()=> {
    console.log("Microservice de gestion des auteurs")

} )