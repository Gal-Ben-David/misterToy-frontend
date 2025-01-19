
export function ToyDetailsTable({ toy }) {
    return (
        <table className="toy-details-table">
            <tbody>
                <tr>
                    <td>Toy name</td>
                    <td>{toy.name}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>${toy.price}</td>
                </tr>
                <tr>
                    <td>Inventory</td>
                    <td>{toy.inStock ? 'Available' : 'Out of stock'}</td>
                </tr>
                <tr>
                    <td>Categories</td>
                    <td >
                        <ul className="toy-labels-details">
                            {toy.labels.map((label, i) =>
                                <li key={i} className="toy-label">
                                    {label}
                                </li>
                            )}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}