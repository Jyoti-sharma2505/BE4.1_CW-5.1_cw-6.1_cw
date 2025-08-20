const { prototype } = require("events");
const {initilizatiom}=require("./db/db.connect");
const Movie = require("./model/movie.model")
initilizatiom();
const express = require("express");
const { error } = require("console");
const app=express();
app.use(express.json());

// const newMovie = {
//     title: "New Movie",
//     releaseYear: 2025,
//     genre: [ "Drama"],
//     director: "Aditya Roy Chopra",
//     actors: ["Actor1", "Actore2"],
//     language: "Hindi",
//     country: "India",
//     rating: 5.1,
//     plot: "A young man and woman fall in love on a Australia trip.",
//     awards: "IFA Filmfare Awards",
//     posterUrl: "https://example.com/new-poster1.jpg",
//     trailerUrl: "https://example.com/mew-trailer1.mp4"
// }
// async function createMovie(newMovie){
//   try{
//     const movie=new Movie(newMovie);
//     const saveMovie =await movie.save()
//     return saveMovie;
//   }catch(error){
//     throw error
// }
// }
async function readMovie(){
  try{
  const movie=await Movie.find();
  return movie
  }catch(error){
    throw error;
  }
}
app.get("/movies",async (req,res)=>{
    try{
  const savemovie = await readMovie();
  if(savemovie.length!=0){
    res.json(savemovie);
  }else{
    res.status(404).json({error:"Not found"})
  }
    }catch(error){
        res.status(500).json({error:"Movies not found"});
    }
})

//cw Work find the update value
async function updateTheRating(movieId,updaterating){
  try{
  const update=await Movie.findByIdAndUpdate(movieId,updaterating,{new:true});
  console.log(update);
  }catch(error){
    throw error;
  }
}
// updateTheRating("689d7e12afedc9d9c29422f5",{rating:8.5})
async function updateByTitle(movieTitle,updateYear){
    try{
    const update = await Movie.findOneAndUpdate({title:movieTitle},updateYear,{new:true});
    console.log(update)
    }catch(error){
        throw error;
    }
}
// updateByTitle("PK",{releaseYear:2015});
//BE2.4_CW 
async function deleteById(movieId){
    try{
     const deleteId =await Movie.findByIdAndDelete(movieId ,{new:true});
     console.log(deleteId)
    }catch(error){
        console.log("Nor catch find",error);
    }
}
// deleteById("689f17dccfed2020562c97c7");
//2:
async function deleteByTitle(movieTitle){
    try{
        const deleteName = await Movie.findOneAndDelete({title:movieTitle});
        console.log(deleteName)
    }catch(error){
        console.log("Error for delete",error)
    }
}
// deleteByTitle("Dilwale Dulhania Le Jayenge")


//Find the one data in whole array the use findOne.

async function readMovieTitle(movieTitle){
    try{
        const title=await Movie.findOne({title:movieTitle});
        return title;

    }catch(error){
        throw error
    }
}
// readMovieDirector("Bahubali: The Beginning")
app.get("/movies/:title",async(req,res)=>{
    try{
        const movieTitle=await readMovieTitle(req.params.title);
        if(movieTitle){
            res.json(movieTitle);
        }

    }catch(error){
        res.status(500).json({error:"failed movie title"})
    }
})
async function readMovieDirector(directorName){
    try{
  const readDirector =await Movie.find({director:directorName})
  return readDirector;
    }catch(error){
        throw error;
    }
};
app.get("/movies/director/:director",async(req,res)=>{
    try{
  const movieDirector = await readMovieDirector(req.params.director);
  if(movieDirector.length!=0){
  res.json(movieDirector);
  }else{
    res.status(404).json({error:"Not found"})
  }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})

async function readMovieGenre(genreName){
    try{
  const movieGenre = await Movie.find({genre:genreName});
  console.log(movieGenre)
  return movieGenre;
    }catch(error){
        throw error;
    }
}
app.get("/movies/genres/:genreName",async(req,res)=>{
    try{
  const readGenre=await readMovieGenre(req.params.genreName);
  if(readGenre.length != 0){
    res.json(readGenre)
  }else{
    res.status(404).json({error:"Not found"})
  }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log("Server running in port",PORT)
})