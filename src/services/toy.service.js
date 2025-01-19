
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
const LABELS = ['On Wheels', 'Box Game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    addMsg,
    removeMsg,
    getEmptyToy,
    getDefaultFilter,
    getLabelsStats,
    getStockStatus,
    getReviews,
    addReview,
    removeReview,
    getLabels,
    getLocations,
    getGoogleMapsAPI,
    uploadImg
}

function query(filterBy = {}) {
    // return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    // return axios.get(BASE_URL + toyId).then(res => res.data)
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return axios.delete(BASE_URL + toyId).then(res => res.data) // api/toy/c102/remove
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (!userService.getLoggedinUser()) return Promise.reject('User is not logged in')
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

async function getGoogleMapsAPI() {
    const googleMapsAPI = await httpService.get('about/')
    return googleMapsAPI.apiKey
}

async function addMsg(toyId, msg) {
    if (!userService.getLoggedinUser()) return Promise.reject('User is not logged in')
    const savedMsg = await httpService.post(BASE_URL + toyId + '/msg', { txt: msg })
    return savedMsg
}

async function removeMsg(toyId, msgId) {
    if (!userService.getLoggedinUser()) return Promise.reject('User is not logged in')
    const msgCount = await httpService.delete(BASE_URL + toyId + '/msg/' + msgId)
    return msgCount
}

async function getReviews(filterBy) {
    const reviews = await httpService.get('review/', filterBy)
    return reviews
}

async function addReview({ txt, aboutToyId }) {
    const addedReview = await httpService.post('review/', { txt, aboutToyId })
    return addedReview
}

async function removeReview(reviewId) {
    await httpService.delete(`review/${reviewId}`)
}

function getEmptyToy() {
    return {
        createdAt: Date.now(),
        name: '',
        price: 100,
        labels: [],
        inStock: true,
        imgUrl: '/img/default-pic.jpg',
        msgs: []
    }
}

function getDefaultFilter() {
    return { name: '', price: 10000, inStock: 'all', labels: [], selector: '' }
}

function getLabels() {
    return LABELS
}

async function getLabelsStats() {
    try {
        const toys = await query()
        const labelsMap = _getLabelsMap(toys)
        const totalInStockToys = toys.filter(toy => toy.inStock).length
        const data = Object.keys(labelsMap)
            .map(label =>
            ({
                title: label,
                value: Math.round((labelsMap[label] / totalInStockToys) * 100)
            }))
        return data

    } catch (err) {
        console.log('Cannot set data', err)
        throw err
    }
}

async function getStockStatus() {
    try {
        const toys = await query()
        const stockStatus = toys.reduce((acc, toy) => {
            if (toy.inStock) acc.available++
            else acc.notAvailable++
            return acc
        }, { available: 0, notAvailable: 0 })

        return stockStatus

    } catch (err) {
        console.log('Cannot set data', err)
        throw err
    }
}

async function uploadImg(imgData) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        return data.secure_url
    } catch (err) {
        console.log(err)
    }
}


function getLocations() {
    return [
        {
            name: 'Ramat Gan',
            loc: { lat: 32.068160, lng: 34.822548 },
            id: 'loc001'
        },
        {
            name: 'Bograshov, Tel Aviv',
            loc: { lat: 32.07484324375375, lng: 34.774144954225775 },
            id: 'loc002'
        },
        {
            name: 'Dizengoff, Tel Aviv',
            loc: { lat: 32.094571, lng: 34.776700 },
            id: 'loc003'
        },
        {
            name: `Giv'atayim`,
            loc: { lat: 32.07427776577913, lng: 34.80895441202367 },
            id: 'loc004'
        },
        {
            name: 'Herzeliya',
            loc: { lat: 32.17143850675182, lng: 34.80159361895732 },
            id: 'loc005'
        },
        {
            name: 'Holon',
            loc: { lat: 32.01764270237933, lng: 34.78037978989864 },
            id: 'loc006'
        },
    ]
}


function _getLabelsMap(toys) {
    const toyLabels = toys.filter(toy => toy.inStock).map(toy => toy.labels)
    const labelsMap = toyLabels.flat().reduce((map, label) => {
        if (!map[label]) map[label] = 0
        map[label]++
        return map
    }, {})
    return labelsMap
}


