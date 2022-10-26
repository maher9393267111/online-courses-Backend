const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 6000;
const { Sequelize, Model, DataTypes } = require('sequelize')

app.use(cors());
app.use(express.json({ extended: true }));
const categories = require('./data/categories.json');
const courses = require('./data/courses.json');




const option = {
    host: "mysql-93288-0.cloudclusters.net",
    //"sql11.freesqldatabase.com",
    dialect: "mysql",
    port: 10016,
  //   pool: {
  //     max: 30,
  //     min: 0,
  //   },
  };
  
  const databaseName = "myFIRST";
  const databaseUsername = "admin";
  const databasePassword = "xC8D2L3M";
  
  const sequelize = new Sequelize(
    databaseName,
    databaseUsername,
    databasePassword,
    option
  );
  try {
   // await 
    sequelize.authenticate();
    console.log("connection successful");
  } catch (error) {
    console.log(error , 'ERROR TO CONNECT TO DATABASE');
  }





  class Blogs extends Model {}

  Blogs.init({
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      author: {
          type: DataTypes.STRING,
      },
      url: {
          type: DataTypes.STRING,
          allowNull: true
      },
      title: {
          type: DataTypes.STRING,
          allowNull: true
      },
      descrep: {
          type: DataTypes.STRING,
          allowNull: true
      },
      likes: {
          type: DataTypes.INTEGER,
          default: 0
      }
  }, {
      sequelize
  })
  
  Blogs.sync({alter: true })  // update columns in sameTime
  





  app.get('/api/blogs', async(req, res) => {
    try {
        const blogs = await Blogs.findAll()
        console.log(JSON.stringify(blogs, null, 2))
        res.status(200).json(blogs )
    } catch(err) {
        console.log(err)
        res.status(400).json({ msg: err })
    }
})








app.get('/', (req, res) => {
    res.send('Courses API is Running');
});

app.get('/courses', (req, res) => {
    res.send(courses);
});

app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    const selectedCourses = courses.find((c) => c.id === id);
    res.send(selectedCourses);
});
app.get('/courses-categories', (req, res) => {
    res.send(categories);
});

app.get('/courses-categories/:id', (req, res) => {
    const id = req.params.id;
    const category_courses = courses.filter((c) => c.category_id === id);
    res.send(category_courses);
});

app.listen(port, () => {
    console.log('Server running on port', port);
});
