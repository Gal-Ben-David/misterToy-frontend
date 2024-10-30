
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
const LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.labels.length !== 0) {
                toys = toys.filter(toy => toy.labels.map(label => label.toLowerCase()).includes(filterBy.labels.toLowerCase()))
            }
            if (filterBy.inStock !== 'all') {
                toys = toys.filter(toy => filterBy.inStock === 'available' ? toy.inStock : !toy.inStock)
            }
            if (filterBy.selector === 'name') {
                toys.sort((toy1, toy2) => toy1.name.toLowerCase().localeCompare(toy2.name.toLowerCase()))
            }
            if (filterBy.selector === 'price') {
                toys.sort((toy1, toy2) => (toy1.price - toy2.price))
            }
            if (filterBy.selector === 'createdAt') {
                toys.sort((toy1, toy2) => (toy1.createdAt - toy2.createdAt))
            }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy(createdAt = Date.now(), name = '', price = 100, labels = [], inStock = true) {
    return { createdAt, name, price, labels, inStock }
}

function getDefaultFilter() {
    return { name: '', price: '', inStock: 'all', labels: [], selector: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            _createToy(1112223,
                'Talking Doll',
                123,
                ['Doll', 'Battery Powered', 'Baby'],
                true
            ),
            _createToy(1112224,
                'Skateboard',
                200,
                ['On Wheels'],
                false
            ),
            _createToy(1112225,
                'Monopoly',
                155,
                ['Box Game'],
                true
            ),
            _createToy(1112226,
                'Toy Robot Dog',
                90,
                ['Battery Powered'],
                true
            )
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(createdAt, name, price, labels, inStock) {
    const toy = getEmptyToy(createdAt, name, price, labels, inStock)
    toy._id = utilService.makeId()
    return toy
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


