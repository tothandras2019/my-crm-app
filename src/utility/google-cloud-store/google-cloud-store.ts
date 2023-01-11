// Import the functions you need from the SDKs you need
import FIREBASECONFIG from './keys-data.json'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, collection, getDocs, QuerySnapshot, DocumentData, addDoc, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { ContractType } from '../../DATASTORE/data-types/main.data.types/contract-data-types'
import { initContract } from './../../DATASTORE/data/initialContract'
import { WarehouseingServiceType } from '../../DATASTORE/data-types/main.data.types/product-data-types'
import { WarehouseCapacity } from '../../DATASTORE/data/initialWarehouseCapacity'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//#region Initialize Firebase
const app = initializeApp(FIREBASECONFIG)
// const analytics = getAnalytics(app)

//-------------------------
const db = getFirestore(app)
//#endregion
//#region MANIPULATE CUSTOMER DATA ON FIRESTORE
export const addCustomerToFirestore = async (newCustomer: CustomerDataType) => await setDoc(doc(db, 'Customers', newCustomer.id), newCustomer)
export const updateCustomerFirestore = async (update_customer: CustomerDataType) =>
  await updateDoc(doc(db, 'Customers', update_customer.id), { ...update_customer })
export const deleteCustomerFirestore = async (del_customer: string) => await deleteDoc(doc(db, 'Customers', del_customer))

//#endregion
//#region REREIVE DATABASE

/**
 * @param collectionObject collection name
 */
export const getCustomerCollection = async (collectionObject: string) =>
  GenerateCustomerObject((await getDocs(collection(db, collectionObject))) as QuerySnapshot<DocumentData>)

export const getContractCollection = async (collectionObject: string) =>
  GenerateContractsObject((await getDocs(collection(db, collectionObject))) as QuerySnapshot<DocumentData>)

export const getWarehouseCollection = async (collectionObject: string) =>
  GenerateWarehouseObject((await getDocs(collection(db, collectionObject))) as QuerySnapshot<DocumentData>)

const GenerateCustomerObject = (querySnapshot: QuerySnapshot<DocumentData>): CustomerDataType[] => {
  let customersDataArray: CustomerDataType[] = []
  querySnapshot.forEach((querySnapshot) => {
    const { companyName, address, access, social, status } = querySnapshot.data()
    const id = querySnapshot.id

    const dataExtracted = {
      companyName: companyName,
      address: address,
      access: access,
      social: social,
      status: status,
    }

    const customerData = { ...dataExtracted, id: id }
    customersDataArray.push(customerData)
  })

  return customersDataArray
}

const GenerateContractsObject = (querySnapshot: QuerySnapshot<DocumentData>): ContractType[] => {
  const contractsDataArray: ContractType[] = []
  querySnapshot.forEach((querySnapshot) => {
    const { date, customer, orders } = querySnapshot.data()
    const id = querySnapshot.id
    const contract = {
      id: id,
      date: date,
      customer: customer,
      orders: orders,
    }
    contractsDataArray.push(contract)
  })
  return contractsDataArray
}
const GenerateWarehouseObject = (querySnapshot: QuerySnapshot<DocumentData>): WarehouseingServiceType[] => {
  const warehouseArrayObject: WarehouseingServiceType[] = []
  querySnapshot.forEach((querySnapshot) => {
    const { total_capacity, unit_dimension } = querySnapshot.data()
    const id = querySnapshot.id

    const warehouseDataObject: WarehouseingServiceType = {
      id: id,
      total_capacity: total_capacity,
      unit_dimension: unit_dimension,
    }
    warehouseArrayObject.push(warehouseDataObject)
  })

  return warehouseArrayObject
}

//#endregion

//----------------------------------------------------------------
//#region SET INITIALIAL FIRESORE CONTRACT
export const addInitialColletion = async (collectionName: string, collectionObj: ContractType | WarehouseingServiceType | typeof initCustomer) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), collectionObj)
  } catch (error) {
    console.error('[Error on upload initial doc]', error)
  }
}

const initCustomer = {
  companyName: 'Best Ever Ltd',
  address: [
    {
      primary: true,
      country: 'hungary',
      code: 'hu',
      city: 'budapest',
      building: 10,
      street: '7 Vezér street',
      zip: 1231,
    },
  ],
  access: [
    { primary: true, email: 'Chep@chep.com', telephone: '+36 32 000 001' },
    { primary: false, email: 'Chep@chep.com', telephone: '+36 32 323 234' },
  ],
  social: [
    { media: 'facebook', link: 'https://www.facebook.com' },
    { media: 'twitter', link: 'https://www.twitter.com' },
  ],
  status: { lifecycleState: '', leadState: '' },
}

// addInitialColletion(initContract)
// addInitialColletion(WarehouseCapacity)
// addInitialColletion(initCustomer)
//#endregion
