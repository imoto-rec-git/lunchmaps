import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export const useMapFavoriteDisplay = ({
  setUserFavShopList,
  setUserFavShopLoaction,
}) => {
  const fetchData = async (user: User) => {
    // fireStore読み込み
    const userFavListData = async () => {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data().favoriteList) {
        const placeIdData = []
        const latLngData = []

        for (let i = 0; i < docSnap.data().favoriteList.length; i++) {
          placeIdData.push(docSnap.data().favoriteList[i])
          const res = await fetch(
            `/api/details_latlng?place_id=${docSnap.data().favoriteList[i]}`
          )
          const data = await res.json()
          latLngData.push([
            data.result.geometry.location.lat,
            data.result.geometry.location.lng,
          ])
        }
        setUserFavShopList(placeIdData)
        setUserFavShopLoaction(latLngData)
      } else {
        console.log('No such document!')
      }
    }
    userFavListData()
  }
  return { fetchData }
}
