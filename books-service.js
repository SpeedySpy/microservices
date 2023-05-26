 const express = require('express');
 const axios = require('axios');
 const bodyParser = require('body-parser');

 const app = express();
 

 app.use(bodyParser.json());

 let books =[
    { id:1, title : "livre 1", authorId: 1 , categoryId : 1},
    { id:2, title : "livre 2", authorId: 2 , categoryId : 2},
    { id:3, title : "livre 3", authorId: 3 , categoryId : 3},
    { id:4, title : "livre 4", authorId: 4 , categoryId : 4},
    { id:5, title : "livre 5", authorId: 5 , categoryId : 5},
 ];

app.get('/books', async (req,res)=>{
    res.json(books)
});

app.get('/books/:id', async(req,res)=>{
   const id = parseInt(req.params.id);
   const book = books.find(book => book.id === id)

    
    if(book){    
        try{
            const authorResponse = await axios.get('http://localhost:4000/authors/${book.authorId}');
            // const categoryResponse = await axios.get('http://localhost:4000/categories/${book.categoryId}')

            const author = authorResponse.data;
            // const category = categoryResponse.data;

            const bookDetails ={
                id : book.id,
                title: book.title,
                author: author.name,
                // category: category.name
            };
            res.json(bookDetails);


        }catch(error){
            res.status(500).json({error: "Il y a une erreur lors de la récupération"})
        }
    }else{
        res.status(404).json({error: 'Livre non trouvé'})
    }
})


 app.listen(3000, ()=>{
    console.log("the application is working")

 })