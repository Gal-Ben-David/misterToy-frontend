
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
    getLabels
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

function getEmptyToy() {
    return {
        createdAt: Date.now(),
        name: '',
        price: 100,
        labels: [],
        inStock: true,
        imgUrl: 'src/assets/img/default-pic.jpg'
    }
}

function getDefaultFilter() {
    return { name: '', price: 10000, inStock: 'all', labels: [], selector: '' }
}

function getLabels() {
    return LABELS
}

function getLabelsStats() {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            const labelsMap = _getLabelsMap(toys)
            const totalInStockToys = toys.filter(toy => toy.inStock).length
            const data = Object.keys(labelsMap)
                .map(label =>
                ({
                    title: label,
                    value: Math.round((labelsMap[label] / totalInStockToys) * 100)
                }))
            console.log('data:', data)
            return data
        })
}

function getStockStatus() {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            const stockStatus = toys.reduce((acc, toy) => {
                if (toy.inStock) acc.available++
                else acc.notAvailable++
                return acc
            }, { available: 0, notAvailable: 0 })
            return stockStatus
        })
}

function _getLabelsMap(toys) {
    const toyLabels = toys.filter(toy => toy.inStock).map(toy => toy.labels)
    const labelsMap = toyLabels.flat().reduce((map, label) => {
        if (!map[label]) map[label] = 0
        map[label]++
        return map
    }, {})
    console.log('labelsMap', labelsMap)
    return labelsMap
}

