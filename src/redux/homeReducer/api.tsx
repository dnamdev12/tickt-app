import URLS from '../../network/api'

export const fetchData = async () => {
    try {
        const response = await fetch(URLS.firstCall)
        const data = await response.json()
        return data
    } catch (e) {
        console.log('something went wrong', e)
    }
}