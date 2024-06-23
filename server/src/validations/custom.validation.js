const objectId=(value,helpers)=>{
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
      }
      return value;
}


const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message(`password must be 8 digits long`);
    }

    if (!value.match(/[1-9a-zA-Z]/)) {
        return helpers.message(`paswword must contain 1 digit and 1 `)
    }

    return value
}


module.exports={objectId,password};