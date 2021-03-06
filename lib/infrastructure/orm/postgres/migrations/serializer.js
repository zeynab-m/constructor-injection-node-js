const permission = (permission) => {
  return {
    id:permission.id,
    action:permission.action,
    deletedAt:permission.deletedAt,
    createdAt:permission.createdAt,
    updatedAt:permission.updatedAt,
  };
};
const pic = (pic) => {
  return {
    id:pic.id,
    name:pic.name,
    thumbnail:pic.thumbnail,
    original:pic.original,
    deletedAt:pic.deletedAt,
    createdAt:pic.createdAt,
    updatedAt:pic.updatedAt,
  };
};
const point = (point) => {
  return {
    id: point.id,
    name:point.name,
    about:point.about,
    isActive:point.isActive,
    location:point.location,
    contact:point.contact,
    pics:point.pics,
    visitedAt:point.visitedAt,
    deletedAt:point.deletedAt,
    createdAt:point.createdAt,
    updatedAt:point.updatedAt,
  };
};
const role = (role) => {
  return {
    id: role.id,
    title:role.title,
    permissions:role.permissions,
    deletedAt:role.deletedAt,
    createdAt:role.createdAt,
    updatedAt:role.updatedAt,

  };
};
const user = (user) => {
  return {
    id: user.id,
    firstName:user.firstName,
    lastName:user.lastName,
    userName:user.userName,
    password:user.password,
    roles:user.roles,
    deletedAt:user.deletedAt,
    createdAt:user.createdAt,
    updatedAt:user.updatedAt,
  };
};
const zone = (zone) => {

  return {

    id: zone.id,
    name:zone.name,
    geographicalHierarchy:zone.geographicalHierarchy,
    isActive:zone.isActive,
    location: {type:zone.location.type,coordinates:zone.location.coordinates[0]},
    center:zone.center,
    deletedAt:zone.deletedAt,
    createdAt:zone.createdAt,
    updatedAt:zone.updatedAt,

  };
};

const serializer = (data,serializeSchema) => {
  let schema = schemaDetector(serializeSchema)
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(schema)
  }
  return schema(data)
}
function schemaDetector(serializeSchema){

  switch (serializeSchema){
    case 'zone':
      return zone
      break;
    case'user':
      return user
      break;
    case'role':
      return role
      break;
    case'point':
      return point
      break;
    case'pic':
      return pic
      break;
    case'permission':
      return permission
      break;
  }

}
module.exports = serializer
