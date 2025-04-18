// // src/seeders/initialRoles.ts
// import Role from "../models/Role.model";

// export const seedInitialRoles = async () => {
//     try {
//         await Role.findOrCreate({
//             where: { name: 'Admin' },
//             defaults: { isProtected: true }
//         });

//         await Role.findOrCreate({
//             where: { name: 'User' },
//             defaults: { isProtected: true }
//         });

//         console.log('Initial roles created successfully');
//     } catch (error) {
//         console.error('Error creating initial roles:', error);
//     }
// };