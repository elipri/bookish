const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashService = {};

hashService.hash = async(password) => {
    const hash =  await bcrypt.hash(password, saltRounds); //bcrypt needs two args: pw & saltrounds
    //console.log(hash);
    return hash;
}

hashService.compare = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match;
}

module.exports = hashService;