
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize, User, Payment } = require('./models');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({
        ok:true,
        msj: "Accediendo a la APi"
    })
});


// endpoint new userr
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});

// endpoint iniciar sesion
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Ruta protegida para obtener todos los usuarios (solo administradores)
app.get('/api/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});


const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('parcialbackend', 'root', 'tonkee2', {
    host: 'localhost',
    dialect: 'mariadb'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion completa con la base de datos");
    } catch (error) {
        console.log("error", error)
    }
})();

// const producto = sequelize.define('producto', {
//     id_producto: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     nombre: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     precio: {
//         type: DataTypes.DECIMAL,
//         allowNull: false,
//     },
//     cantidad: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     categoria: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
    
// }, {
//     tableName: 'productos',
//     timestamps: false
// });

app.listen(port, () =>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})