// Import the functions you need from the SDKs you need
import FIREBASECONFIG from './keys-data.json'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, collection, getDocs, QuerySnapshot, DocumentData, addDoc } from 'firebase/firestore'
import { ContractType } from '../../DATASTORE/data-types/main.data.types/contract-data-types'
import { initContract } from './../../DATASTORE/data/initialContract'
import { WarehouseingServiceType } from '../../DATASTORE/data-types/main.data.types/product-data-types'
import { WarehouseCapacity } from '../../DATASTORE/data/initialWarehouseCapacity'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(FIREBASECONFIG)
// const analytics = getAnalytics(app)

//-------------------------
const db = getFirestore(app)

export const getAllCollections = async () => {
  // const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'Contracts'))
  // querySnapshot.forEach((snapshot) => console.log(snapshot.id, snapshot.data()))
}

//----------------------------------------------------------------
//#region SET INITIALIAL FIRESORE CONTRACT
export const addInitialColletion = async (collectionName: string, collectionObj: ContractType | WarehouseingServiceType | typeof initCustomer) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), collectionObj)
    console.log(docRef.id)
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
