//Setting up express for exports Routers is needed and being imported from express with key word require...
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/filed-validator");

const { isDate } = require("../helpers/isDate");

// importing Validate JWT

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
//const router = express.Router importing router from Routes
const router = Router();

router.use(validateJWT);

router.get("/", getEventos);

// Todas tienen que pasar por la validacion del JWT
// Obtener eventos

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

//Delete event
router.put("/:id", eliminarEvento);

module.exports = router;
