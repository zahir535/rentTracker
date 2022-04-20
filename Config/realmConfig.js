
// //realm
// //import { realm } from './../Config/realmConfig';
// import Realm from "realm";

// // The primaryKey is the _id of type int (Another common type used for primary keys is ObjectId).
// // The name field is required. The
// // The status is optional, denoted by the question mark immediately after the data type.
// const TenantSchema = {
//     name: "Tenant",
//     properties: {
//         _id: "int",
//         name: "string",
//         status: "string?",
//         toPay: "int",
//         payAdv: "int",
//     },
//     primaryKey: "_id",
// };
// const realm = await Realm.open({
//     path: "myrealm",
//     schema: [TenantSchema],
// });


// //create new tenant
// const createTenant = () => {
//     // Add a couple of Tasks in a single, atomic transaction
//     let task1;
//     let name = "tenant 1";

//     realm.write(() => {
//         task1 = realm.create("Task", {
//             _id: 1,
//             name: name,
//             status: "Open",
//             toPay: 0,
//             payAdv: 0,
//         });
//         console.log(`created one tasks: ${task1.name}`);
//     });
// }