import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service-local.js"

import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend, BarElement, LinearScale } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Chart } from 'react-chartjs-2'

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, BarElement, LinearScale)

export function Dashboard() {

    const [labelsStats, setLabelsStats] = useState([])
    const [stockStats, setStockStats] = useState({})
    const [dataLabelsStats, setDataLabelsStats] = useState(null)
    const [dataStockStats, setDataStockStats] = useState(null)

    useEffect(() => {
        toyService.getLabelsStats()
            .then(res => {
                setLabelsStats(res)
            })

        toyService.getStockStatus()
            .then(res => {
                setStockStats(res)
            })
    }, [])

    useEffect(() => {
        if (labelsStats.length > 0) {
            setDataLabelsStats({
                labels: labelsStats.map(labelS => labelS.title),
                datasets: [
                    {
                        type: 'doughnut',
                        label: '%',
                        data: labelsStats.map(labelS => labelS.value),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.5)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(255, 159, 64, 1)',
                        ]
                    },
                ],
            })
        }
    }, [labelsStats])

    useEffect(() => {
        setDataStockStats({
            labels: ['In Stock', 'Not in stock'],
            datasets: [
                {
                    type: 'bar',
                    label: '# items',
                    data: [stockStats.available, stockStats.notAvailable],
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ]
                },
            ],
        })
    }, [dataLabelsStats])

    return (
        <section className="dashboard">
            <h2>Dashboard 📊</h2>
            <div className="charts">
                <div className="bar-stats">
                    <h4>Number of items in stock versus out of stock</h4>
                    {dataStockStats && <Chart data={dataStockStats} />}
                </div>

                <div className="doughnut-stats">
                    <h4>Inventory by label</h4>
                    {dataLabelsStats && <Pie data={dataLabelsStats} />}
                </div>
            </div>
        </section>
    )
}
