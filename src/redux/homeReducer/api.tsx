import Urls from '../../network/Urls'

export const fetchData = async () => {
    try {
        const response = await fetch(Urls.signup)
        const data = await response.json()
        return data
    } catch (e) {
        console.log('something went wrong', e)
    }
}