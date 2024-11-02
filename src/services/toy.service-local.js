
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
const LABELS = ['On Wheels', 'Box Game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabelsStats,
    getStockStatus,
    getLabels
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.labels.length !== 0) {
                toys = toys.filter(toy => filterBy.labels.some(label => toy.labels.includes(label)))
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

function getEmptyToy(createdAt = Date.now(), name = '', price = 100, labels = [], inStock = true, imgUrl = 'src/assets/img/default-pic.JPG') {
    return { createdAt, name, price, labels, inStock, imgUrl }
}

function getDefaultFilter() {
    return { name: '', price: '', inStock: 'all', labels: [], selector: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            _createToy(1112223,
                'Giraffe',
                123,
                ['Doll', 'Baby'],
                true,
                'src/assets/img/toys/giraffe.JPG'
            ),
            _createToy(1112226,
                'Rabbit',
                90,
                ['Doll', 'Baby'],
                true,
                'src/assets/img/toys/rabbit.JPG'
            ),
            _createToy(1112225,
                'Rainbow Rings',
                155,
                ['Box Game'],
                true,
                'src/assets/img/toys/rings.JPG'
            ),
            _createToy(1112224,
                'Skateboard',
                200,
                ['On Wheels'],
                false,
                'src/assets/img/toys/Skateboard.JPG'
            ),
            _createToy(1112228,
                'Wooden Goat Rocker',
                200,
                ['Doll'],
                true,
                'src/assets/img/toys/wooden-goat-rocker.JPG'
            ),
            _createToy(1112234,
                'Guitar',
                110,
                ['Art'],
                true,
                'src/assets/img/toys/guitar.JPG'
            ),

            _createToy(1112291,
                'Chess - blue',
                60,
                ['Box Game'],
                true,
                'src/assets/img/toys/chess-blue.JPG'
            ),
            _createToy(1112292,
                'Piano',
                220,
                ['Art'],
                true,
                'src/assets/img/toys/piano.JPG'
            ),
            _createToy(1112295,
                'Mancala',
                96,
                ['Box Game'],
                true,
                'src/assets/img/toys/mancala.JPG'
            ),
            _createToy(1112297,
                'Bear Blue',
                58,
                ['Doll', 'Baby'],
                true,
                'src/assets/img/toys/bear-blue.JPG'
            ),
            _createToy(1112296,
                'Shape Sorter',
                96,
                ['Box Game'],
                true,
                'src/assets/img/toys/shape-sorter.JPG'
            ),
            _createToy(1112280,
                'Tic Tac Toe',
                96,
                ['Box Game'],
                true,
                'src/assets/img/toys/tic-tac-toe.JPG'
            ),
            _createToy(1112283,
                'Coffee Machine',
                120,
                ['Art'],
                false,
                'src/assets/img/toys/coffee-machine.JPG'
            ),
            _createToy(1112285,
                'Chess - peach',
                120,
                ['Art'],
                false,
                'src/assets/img/toys/chess-peach.JPG'
            ),
            _createToy(1112285,
                'Drums',
                255,
                ['Art'],
                true,
                'src/assets/img/toys/drums.JPG'
            ),
            _createToy(1112245,
                'Scooter',
                230,
                ['On Wheels'],
                true,
                'src/assets/img/toys/scooter.JPG'
            ),
            _createToy(1112290,
                'Musical-Instruments',
                100,
                ['Art'],
                true,
                'src/assets/img/toys/musical-instruments.JPG'
            ),
            _createToy(1112297,
                'Rabbit Green',
                85,
                ['Doll', 'Baby'],
                true,
                'src/assets/img/toys/rabbit-green.JPG'
            ),
            _createToy(1112230,
                'Rabbit Blue Dress',
                95,
                ['Doll', 'Baby'],
                true,
                'src/assets/img/toys/rabbit-blue.JPG'
            ),
            _createToy(1112233,
                'Mixer',
                108,
                ['Baby'],
                false,
                'src/assets/img/toys/mixer.JPG'
            ),
            _createToy(1112236,
                'Shaker',
                110,
                ['Art'],
                true,
                'src/assets/img/toys/shaker.JPG'
            ),
            _createToy(1112240,
                'Cake',
                55,
                ['Art'],
                true,
                'src/assets/img/toys/cake.JPG'
            ),
            _createToy(1112236,
                'Bicycle',
                300,
                ['On Wheels'],
                true,
                'src/assets/img/toys/bicycle.JPG'
            ),
            _createToy(1112290,
                'deer',
                85,
                ['Art'],
                true,
                'src/assets/img/toys/deer.JPG'
            ),

        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(createdAt, name, price, labels, inStock, imgUrl) {
    const toy = getEmptyToy(createdAt, name, price, labels, inStock, imgUrl)
    toy._id = utilService.makeId()
    return toy
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

function getLabels() {
    return LABELS
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

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


