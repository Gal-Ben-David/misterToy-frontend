import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return (
        <main className="main-toys full">
            <section className="introduction full">
                <div className="introduction-content">
                    <div className="description">
                        <h1>The Magic of Timeless Toys ✨</h1>
                        <p>Discover our lovingly crafted collection of wooden toys and huggable teddies!</p>
                        <Link to="/about"><button className="btn btn-dark btn-stores-locations">Find Our Stores</button></Link>
                    </div>
                    <div className="introduction-img">
                        <img src="src/assets/img/teddy.png" />
                    </div>
                </div>
            </section>

            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <Link className="btn btn-add-toy" style={{ backgroundColor: 'whitesmoke' }} to="/toy/edit"> Add Toy</Link>

            {!isLoading
                ? <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                // onEditCar={onEditCar}
                />
                : <div className="loader"></div>
            }
            <hr />
        </main>
    )

}